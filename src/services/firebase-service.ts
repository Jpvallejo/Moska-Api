import firebase from "firebase-admin";
import * as serviceAccount from "../../serviceAccount.json";
firebase.initializeApp({
    credential: firebase.credential.cert({
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email
    }),
    databaseURL: 'https://moska-fbb04.firebaseio.com/'
})

export default firebase;