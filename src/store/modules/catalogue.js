const state = {
  products: [],
  search: "",
  isLoading: false,
};

const getters = {
  getProducts: (state) => {
    return state.products;
  },
  getSearchInput: (state) => {
    return state.search;
  },
  getIsLoading: (state) => {
    return state.isLoading;
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
  setIsLoading: (state, isLoading) => {
    state.isLoading = isLoading;
  },
};

export default {
  state,
  mutations,
  getters,
};
