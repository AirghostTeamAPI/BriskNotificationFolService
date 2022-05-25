"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    equipment: {
        type: String,
        required: true
    },
    pushToken: {
        type: String
    }
});
const User = mongoose_1.model("Users", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map