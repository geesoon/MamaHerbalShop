const state = {
  view: "",
};

const getters = {
  getView: (state) => {
    return state;
  },
};

const mutations = {
  setView(state, view) {
    state.view = view;
  },
};

export default {
  state,
  mutations,
  getters,
};
