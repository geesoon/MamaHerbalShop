import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/product",
    name: "catalogue",
    component: () => import("../views/Catalogue.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/product/view",
    name: "view_product",
    component: () => import("../views/Product/ViewProduct.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/product/view_picture",
    name: "product_picture",
    component: () => import("../views/Product/ViewProductPicture.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/product/edit",
    name: "edit_product",
    component: () => import("../views/Product/EditProduct.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/product/add",
    name: "add_product",
    component: () => import("../views/Product/AddProduct.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/History/History.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/history/detail",
    name: "order_detail",
    component: () => import("../views/History/HistoryOrderDetail.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () => import("../views/Statistics.vue"),
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

// Check firebase authentication before each route meta tag with authRequired.
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
