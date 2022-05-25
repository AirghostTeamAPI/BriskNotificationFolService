"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserAndUpdateToken = exports.findUsersByEquipments = void 0;
const tslib_1 = require("tslib");
const User_1 = tslib_1.__importDefault(require("../models/User"));
function findUsersByEquipments(equipments) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const foundUser = yield User_1.default.find({ equipment: { $in: equipments } });
        return foundUser;
    });
}
exports.findUsersByEquipments = findUsersByEquipments;
function findUserAndUpdateToken(login, pushToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const foundUser = yield User_1.default.findOne({ login });
        yield User_1.default.updateOne({ _id: foundUser.id }, { pushToken });
    });
}
exports.findUserAndUpdateToken = findUserAndUpdateToken;
//# sourceMappingURL=user.js.map