import firebase from "firebase";

export default {
  async getHistory() {
    try {
      const db = firebase.firestore();
      let orderHistory = [];
      let querySnapshot = await db.collection("orderHistory").get();
      querySnapshot.forEach((order) => {
        orderHistory.push(order.data());
      });
      return { valid: true, res: orderHistory };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
};
