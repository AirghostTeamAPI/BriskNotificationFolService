"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFolById = void 0;
const tslib_1 = require("tslib");
const pdf_js_extract_1 = require("pdf.js-extract");
function findFolById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const pdfExtract = new pdf_js_extract_1.PDFExtract();
        const options = {};
        const doc = yield pdfExtract.extract('./files/FOL-MUS.pdf', options);
        for (let i = 0; i < doc.pages.length; i++) {
            if (doc.pages[i].content[0].str.includes(id)) {
                return doc.pages[i].pageInfo.num;
            }
        }
    });
}
exports.findFolById = findFolById;
//# sourceMappingURL=fol.js.map