const state = {
  products: [],
  search: "",
};

const getters = {
  getProducts: (state) => {
    return state.products;
  },
  getSearchInput: (state) => {
    return state.search;
  },
};

const mutations = {
  setProducts: (state, products) => {
    state.products = [];
    state.products = [...products];
  },
  setSearchInput: (state, search) => {
    state.search = search;
  },
};

export default {
  state,
  mutations,
  getters,
};
