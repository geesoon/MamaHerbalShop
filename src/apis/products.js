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
        console.log(item.quantity, cartProducts.length);

        cartProducts[cartProducts.length - 1].quantity = item.quantity;
        console.log(cartProducts[cartProducts.length - 1].quantity);
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
