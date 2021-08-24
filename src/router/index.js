import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "product",
        name: "catalogue",
        component: () => import("../views/Catalogue.vue"),
      },
      {
        path: "/product/view",
        name: "viewProduct",
        component: () => import("../views/ViewProduct.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/product/edit",
        name: "editProduct",
        component: () => import("../views/EditProduct.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/product/add",
        name: "addProduct",
        component: () => import("../views/AddProduct.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "history",
        name: "history",
        component: () => import("../views/History.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("../views/Cart.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "statistics",
        name: "statistics",
        component: () => import("../views/Statistics.vue"),
        meta: {
          authRequired: true,
        },
      },
    ],
  },
  {
    path: "/",
    name: "login",
    component: Login,
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
