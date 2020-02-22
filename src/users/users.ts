import firebase from '../services/firebase-service';

export const createUser = async (req: any, res: any) => {
const {
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
      photoUrl
    } = req.body;

    const user = await firebase.auth().createUser({
      email,
      phoneNumber,
      password,
      displayName: `${firstName} ${lastName}`,
      photoURL: photoUrl
    });

    return res.send(user);
}