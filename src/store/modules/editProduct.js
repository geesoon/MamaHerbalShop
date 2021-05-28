const state = {
  name: "",
  productPic: "",
  intakePrice: "",
  sellingPrice: "",
};

const getters = {
  getEditProduct: (state) => {
    return state;
  },
};

const mutations = {
  setEditProduct(state, product) {
    state.name = product.name;
    state.productPic = product.productPic;
    state.intakePrice = product.intakePrice;
    state.sellingPrice = product.sellingPrice;
  },
};

export default {
  state,
  mutations,
  getters,
};
