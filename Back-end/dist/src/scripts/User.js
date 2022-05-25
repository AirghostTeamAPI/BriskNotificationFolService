"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importUserCsvFile = void 0;
const tslib_1 = require("tslib");
const convert_excel_to_json_1 = tslib_1.__importDefault(require("convert-excel-to-json"));
const User_1 = tslib_1.__importDefault(require("../models/User"));
function importUserCsvFile() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = convert_excel_to_json_1.default({
            sourceFile: '././files/USER.xlsx'
        });
        result.query.shift();
        result.query.forEach(element => {
            const newUser = new User_1.default({
                username: element.A,
                login: element.B,
                password: element.C,
                equipment: element.D
            });
            User_1.default.countDocuments({ username: element.A }, function (err, count) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (count === 0) {
                        User_1.default.create(newUser);
                    }
                    else {
                        User_1.default.updateOne({ username: element.A }, newUser);
                    }
                });
            });
        });
    });
}
exports.importUserCsvFile = importUserCsvFile;
;
//# sourceMappingURL=User.js.map