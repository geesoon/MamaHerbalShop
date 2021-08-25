const state = {
  snackbar: {
    message: "",
    show: false,
  },
};

const getters = {
  getSnackBar: (state) => {
    return state.snackbar;
  },
};

const mutations = {
  setSnackbar: (state, message) => {
    state.snackbar.message = message;
    state.snackbar.show = true;

    setTimeout(() => {
      state.snackbar.show = false;
      state.snackbar.message = "";
    }, 5000);
  },
};

export default {
  state,
  mutations,
  getters,
};
