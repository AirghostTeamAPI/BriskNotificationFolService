import axios from "axios";

export async function sendPushNotifications(equipments) {
  try {
    const foundUsers = await axios.get("https://brisk-notification-user.herokuapp.com/api/user/equipments", equipments)
    const pushTokens = foundUsers.data.map(user => user.pushToken)

    const message = {
      to: pushTokens,
      sound: 'default',
      title: 'Nova fol',
      body: `Nova fol sobre seu veiculo`,
    };

    await axios.post('https://exp.host/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.PUSH_NOTIFICATION_TOKEN}`
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error)
  }
}