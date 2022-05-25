"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FOLSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    applicability: {
        type: String
    },
    issue_description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    issue_date: {
        type: Date,
        required: true,
    },
    revision_number: {
        type: Number,
    },
    revision_date: {
        type: Date,
    },
    remarks: {
        type: String,
    },
    keywords: {
        type: String,
        required: true,
    },
});
const FOL = mongoose_1.model("FOL", FOLSchema);
exports.default = FOL;
//# sourceMappingURL=FOL.js.map