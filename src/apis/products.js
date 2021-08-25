import firebase from "firebase";

export default {
  async getProducts() {
    try {
      const db = firebase.firestore();
      let products = [];
      let querySnapshot = await db.collection("products").get();
      querySnapshot.forEach((doc) => {
        products.push({
          name: doc.data().name,
          unit: doc.data().unit,
          intakePrice: doc.data().intakePrice,
          sellingPrice: doc.data().sellingPrice,
          picUrl: doc.data().picUrl,
          id: doc.id,
        });
      });
      return { valid: true, res: products.reverse() };
    } catch (err) {
      return { valid: false, res: err.message };
    }
  },
  async getProductsByIds(items) {
    try {
      const db = firebase.firestore();
      let products = [];
      let querySnapshot = await db.collection("products").get();
      querySnapshot.forEach((doc) => {
        products.push({
          name: doc.data().name,
          unit: doc.data().unit,
          intakePrice: doc.data().intakePrice,
          sellingPrice: doc.data().sellingPrice,
          picUrl: doc.data().picUrl,
          id: doc.id,
        });
      });

      let cartProducts = [];
      items.forEach((item) => {
        let temp = products.filter((product) => {
          return product.id == item.id;
        });
        cartProducts = [...cartProducts, ...temp];

        cartProducts[cartProducts.length - 1].quantity = item.quantity;
      });

      cartProducts = cartProducts.sort((a, b) => {
        return a.no - b.no;
      });

      return { valid: true, res: cartProducts };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
  async getProductById(id) {
    try {
      const db = firebase.firestore();
      let querySnapshot = await db.collection("products").doc(id).get();
      let product = {
        name: querySnapshot.data().name,
        unit: querySnapshot.data().unit,
        intakePrice: querySnapshot.data().intakePrice,
        sellingPrice: querySnapshot.data().sellingPrice,
        picUrl: querySnapshot.data().picUrl,
        id: id,
      };
      return { valid: true, res: product };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
  async updateProduct({ name, unit, intakePrice, sellingPrice, id }) {
    try {
      const db = firebase.firestore();
      await db.collection("products").doc(id).update({
        name: name,
        unit: unit,
        intakePrice: intakePrice,
        sellingPrice: sellingPrice,
      });
      return { valid: true };
    } catch (err) {
      return { valid: false, res: err.message };
    }
  },
  async addProduct(product) {
    try {
      const db = firebase.firestore();
      let res = db.collection("products").add(product);
      return { valid: true, res: res };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
  async removeProductById(id) {
    try {
      const db = firebase.firestore();
      await db.collection("products").doc(id).delete();
    } catch (err) {
      return err;
    }
  },
  async checkOutOrder(order) {
    try {
      const db = firebase.firestore();
      let res = db.collection("orderHistory").add(order);
      return { valid: true, res: res };
    } catch (err) {
      return { valid: false, res: err };
    }
  },
};
