"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../config/database"));
const FOL_1 = require("./scripts/FOL");
const User_1 = require("./scripts/User");
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_http_bearer_1 = tslib_1.__importDefault(require("passport-http-bearer"));
const User_2 = tslib_1.__importDefault(require("./models/User"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const cors_1 = tslib_1.__importDefault(require("cors"));
require('dotenv').config();
const app = express_1.default();
database_1.default();
app.set("port", process.env.PORT || 5000);
app.set("jwt", process.env.jwtSecret || 5000);
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
passport_1.default.use(new passport_http_bearer_1.default(function (token, done) {
    const user = jsonwebtoken_1.default.verify(token, process.env.jwtSecret);
    User_2.default.findOne({ login: user.login }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        return done(null, user, { scope: 'all' });
    });
}));
const FOL_2 = tslib_1.__importDefault(require("./routes/api/FOL"));
const User_3 = tslib_1.__importDefault(require("./routes/api/User"));
app.use("/api", FOL_2.default);
app.use("/api", User_3.default);
const port = app.get("port");
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
FOL_1.importCsvFile();
User_1.importUserCsvFile();
setInterval(function () {
    console.log('Syncing Spreadsheets...');
    FOL_1.importCsvFile();
    User_1.importUserCsvFile();
}, 60 * 1000); // 60 * 1000 milsec
exports.default = server;
//# sourceMappingURL=server.js.map