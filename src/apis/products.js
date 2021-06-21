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
          intakePrice: doc.data().intakePrice,
          sellingPrice: doc.data().sellingPrice,
          picture: doc.data().picture,
          id: doc.id,
        });
      });
      return products.reverse();
    } catch (err) {
      return err;
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
          intakePrice: doc.data().intakePrice,
          sellingPrice: doc.data().sellingPrice,
          picture: doc.data().picture,
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

      return cartProducts;
    } catch (err) {
      return err;
    }
  },
  async getProductById(id) {
    try {
      const db = firebase.firestore();
      let querySnapshot = await db.collection("products").doc(id).get();
      let product = {
        name: querySnapshot.data().name,
        intakePrice: querySnapshot.data().intakePrice,
        sellingPrice: querySnapshot.data().sellingPrice,
        picture: querySnapshot.data().picture,
        id: id,
      };
      return product;
    } catch (err) {
      return err;
    }
  },
  async updateProduct({ name, intakePrice, sellingPrice, id }) {
    try {
      console.log(name);
      const db = firebase.firestore();
      await db.collection("products").doc(id).update({
        name: name,
        intakePrice: intakePrice,
        sellingPrice: sellingPrice,
      });
    } catch (err) {
      return err;
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
};
