import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List.vue";
import Login from "../views/Login.vue";
import Details from "../views/Details.vue";
import vueCookie from "vue-cookie";

Vue.use(VueRouter);
Vue.use(vueCookie);

const isAuthenticated = Vue.cookie.get("token") ? true : false;

console.log(Vue.cookie.get("token"));

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/details/:repoName",
    name: "Details",
    component: Details,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router;
