const state = {
  id: "",
  name: "",
  picture: "",
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
    state.picture = product.picture;
    state.intakePrice = product.intakePrice;
    state.sellingPrice = product.sellingPrice;
    state.id = product.id;
  },
};

export default {
  state,
  mutations,
  getters,
};
