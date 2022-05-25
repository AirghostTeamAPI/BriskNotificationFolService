"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCsvFile = void 0;
const tslib_1 = require("tslib");
const convert_excel_to_json_1 = tslib_1.__importDefault(require("convert-excel-to-json"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const pushNotification_1 = require("../services/pushNotification");
const FOL_1 = tslib_1.__importDefault(require("../models/FOL"));
function importCsvFile() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = convert_excel_to_json_1.default({
            sourceFile: '././files/FOLS.xlsx'
        });
        result.query.shift();
        result.query.forEach(element => {
            if (element.H) {
                if (element.H.length > 0) {
                    element.H = Number(element.H);
                }
            }
            else {
                element.H = 0;
            }
            const newFOL = new FOL_1.default({
                title: element.A,
                equipment: element.B,
                applicability: element.C,
                issue_description: element.D,
                category: element.E,
                status: element.F,
                issue_date: (moment_1.default(element.G, "DD/MM/YYYY")).toDate(),
                revision_number: element.H,
                revision_date: element.I,
                remarks: element.J,
                keywords: element.K,
            });
            FOL_1.default.countDocuments({ title: element.A }, function (err, count) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (count === 0) {
                        FOL_1.default.create(newFOL);
                        pushNotification_1.sendPushNotifications(element.B);
                    }
                    else {
                        const foundFol = yield FOL_1.default.findOne({ title: element.A });
                        if (foundFol.revision_date < element.I) {
                            FOL_1.default.updateOne({ title: element.A }, newFOL);
                        }
                    }
                });
            });
        });
    });
}
exports.importCsvFile = importCsvFile;
;
//# sourceMappingURL=FOL.js.map