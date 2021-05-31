import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyBUaOj8eUl5pKvyk0qHdGKc9zgcK3nZNYM",
  authDomain: "mamaherbal-b5d4a.firebaseapp.com",
  projectId: "mamaherbal-b5d4a",
  storageBucket: "mamaherbal-b5d4a.appspot.com",
  messagingSenderId: "505834694381",
  appId: "1:505834694381:web:2ad994c1e15f0efb144ee4",
  measurementId: "G-28ECELE3N1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
