"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const express_1 = require("express");
const user_1 = require("../../services/user");
const user_2 = require("../../repository/user");
const router = express_1.Router();
router.post("/user/auth", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtToken = yield user_1.authenticateUser(req.body.login, req.body.password);
        if (req.body.pushToken) {
            user_2.findUserAndUpdateToken(req.body.login, req.body.pushToken);
        }
        return res.status(http_status_codes_1.default.OK).json({ jwtToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}));
exports.default = router;
//# sourceMappingURL=User.js.map