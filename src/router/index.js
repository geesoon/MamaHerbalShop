import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Catalogue.vue"),
  },
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/editProduct",
    name: "editProduct",
    component: () => import("../views/EditProduct.vue"),
  },
  {
    path: "/addProduct",
    name: "addProduct",
    component: () => import("../views/AddProduct.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
