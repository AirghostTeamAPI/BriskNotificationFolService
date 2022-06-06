import axios from "axios";
import { saveNotifiedUsers } from "./fol";

export async function sendPushNotifications(folTitle: string, equipments: [string]) {
  try {
    const foundUsers = await axios.post("http://localhost:5001/api/user/equipments", { equipments })

    saveNotifiedUsers(folTitle, foundUsers.data);
    const pushTokens = foundUsers.data.map(user => user.pushToken)

    const message = {
      to: pushTokens,
      sound: 'default',
      title: 'Nova fol',
      body: `Nova fol sobre seu veiculo`,
    };

    await axios.post('https://exp.host/--/api/v2/push/send', {
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
    /*if (error instanceof AxiosError) {
      console.log(error.response);
    }
    else console.log(error)*/
  }
}