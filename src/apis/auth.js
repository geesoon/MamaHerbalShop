import firebase from "firebase";

export default {
  async login(username, password) {
    try {
      let res = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
      return { valid: true, res: res };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
  async logout() {
    try {
      await firebase.auth().signOut();
      return { valid: true };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
};
