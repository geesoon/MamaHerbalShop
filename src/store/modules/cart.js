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
    let isAdded,
      removeProduct = false;
    state.items.forEach((product) => {
      if (product.id === item.id) {
        product.quantity += item.quantity - product.quantity;
        isAdded = true;
        if (product.quantity == 0) {
          removeProduct = true;
        }
      }
    });
    if (removeProduct) {
      state.items = state.items.filter((product) => {
        return product.quantity != 0;
      });
    }
    if (!isAdded) {
      let temp = [item];
      state.items = [...state.items, ...temp];
    }
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
