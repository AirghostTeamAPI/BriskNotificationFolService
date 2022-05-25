"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = tslib_1.__importDefault(require("../models/User"));
function authenticateUser(login, password) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const foundUser = yield User_1.default.findOne({ login });
        if (foundUser) {
            if (foundUser.password === password) {
                const token = jsonwebtoken_1.sign({
                    id: foundUser.id,
                    username: foundUser.username,
                    equipment: foundUser.equipment,
                    login: foundUser.login,
                }, process.env.JWTSECRET);
                return token;
            }
        }
    });
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=user.js.map