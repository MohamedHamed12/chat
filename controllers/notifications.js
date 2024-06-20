var admin = require("firebase-admin");

var serviceAccount = require("/home/mohamedh/chat-app/controllers/webmsh.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const sendNotification = (token, payload) => {
  admin.messaging().sendToDevice(token, payload)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};

// const token = 'client_device_token';
// const payload = {
//   notification: {
//     title: 'Hello!',
//     body: 'This is a test notification.',
//     sound: 'default'
//   },
//   data: {
//     additionalData: 'Some additional data'
//   }
// };

// sendNotification(token, payload);
