import Vue from "vue";
import Vuex from "vuex";
import Catalogue from "./modules/catalogue";
import Cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Catalogue, Cart },
});
