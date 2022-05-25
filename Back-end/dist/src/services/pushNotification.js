"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotifications = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const user_1 = require("../repository/user");
function sendPushNotifications(equipments) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const foundUsers = yield user_1.findUsersByEquipments(equipments);
            const pushTokens = foundUsers.map(user => user.pushToken);
            const message = {
                to: pushTokens,
                sound: 'default',
                title: 'Nova fol',
                body: `Nova fol sobre seu veiculo`,
            };
            yield axios_1.default.post('https://exp.host/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${process.env.PUSH_NOTIFICATION_TOKEN}`
                },
                body: JSON.stringify(message),
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sendPushNotifications = sendPushNotifications;
//# sourceMappingURL=pushNotification.js.map