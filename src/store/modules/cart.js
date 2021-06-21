const state = {
  items: [],
};

const getters = {
  getCartItem: (state) => {
    return state.items;
  },
  getCartStatus: (state) => {
    return state.items.length;
  },
};

const mutations = {
  addToCart: (state, item) => {
    item.no = state.items.length;
    state.items = [...state.items, ...item];
  },
  removeItemFromCart: (state, item) => {
    state.items = state.items.filter((i) => {
      return i.id == item.id;
    });
  },
  clearCart: (state) => {
    state.items = [];
  },
};

export default {
  state,
  mutations,
  getters,
};
