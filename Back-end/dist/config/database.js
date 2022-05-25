"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("config"));
const mongoose_1 = require("mongoose");
const connectDB = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = config_1.default.get("mongoURI");
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        };
        yield mongoose_1.connect(mongoURI, options);
        console.log("MongoDB Connected...");
    }
    catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=database.js.map