import firebase from "firebase";

export default {
  async getHistory() {
    try {
      const db = firebase.firestore();
      let orderHistory = [];
      let querySnapshot = await db.collection("orderHistory").get();
      querySnapshot.forEach((doc) => {
        orderHistory.push({
          id: doc.id,
          date: doc.data().date,
          soldTo: doc.data().soldTo,
          items: doc.data().items,
          totalCost: doc.data().totalCost,
          totalPrice: doc.data().totalPrice,
          totalProfit: doc.data().totalProfit,
        });
      });
      orderHistory.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      return { valid: true, res: orderHistory };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
  async getHistoryById(id) {
    try {
      const db = firebase.firestore();
      let querySnapshot = await db.collection("orderHistory").doc(id).get();
      let order = {
        id: id,
        date: querySnapshot.data().date,
        soldTo: querySnapshot.data().soldTo,
        items: querySnapshot.data().items,
        totalCost: querySnapshot.data().totalCost,
        totalPrice: querySnapshot.data().totalPrice,
        totalProfit: querySnapshot.data().totalProfit,
      };
      return { valid: true, res: order };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
};
