import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import EditProduct from "../views/EditProduct.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Catalogue.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/editProduct",
    name: "editProduct",
    component: EditProduct,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/addProduct",
    name: "addProduct",
    component: () => import("../views/AddProduct.vue"),
    meta: {
      authRequired: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      next({
        path: "/",
      });
    }
  } else {
    next();
  }
});

export default router;
