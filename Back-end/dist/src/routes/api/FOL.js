"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FOL_1 = tslib_1.__importDefault(require("../../models/FOL"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const express_1 = require("express");
const fol_1 = require("../../services/fol");
const passport_1 = tslib_1.__importDefault(require("passport"));
const router = express_1.Router();
router.get("/fols", passport_1.default.authenticate('bearer', { session: false }), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(http_status_codes_1.default.OK).json(yield FOL_1.default.find(Object.assign(Object.assign({}, (req.query.search && { keywords: { "$regex": req.query.search, "$options": "i" } })), (req.query.equipment && { equipment: req.query.equipment }))));
    }
    catch (err) {
        console.error(err.message);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}));
router.get("/fol/:folId/:folYear", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundFol = yield fol_1.findFolById(req.params.folId + '/' + req.params.folYear);
        return res.status(http_status_codes_1.default.OK).json(foundFol);
    }
    catch (err) {
        console.error(err.message);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}));
exports.default = router;
//# sourceMappingURL=FOL.js.map