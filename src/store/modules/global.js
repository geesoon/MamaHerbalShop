const state = {
  isLoading: false,
  snackbar: {
    message: "",
    show: false,
  },
};

const getters = {
  getIsLoading: (state) => {
    return state.isLoading;
  },
  getSnackBar: (state) => {
    return state.snackbar;
  },
};

const mutations = {
  setIsLoading: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  setSnackBar: (state, message) => {
    state.snackbar.message = message;
    state.snackbar.show = true;

    setTimeout(() => {
      state.snackbar.show = false;
      state.snackbar.message = "";
    }, 2000);
  },
};

export default {
  state,
  mutations,
  getters,
};
