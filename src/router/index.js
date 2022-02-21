import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home'
import login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/home",
      component: home,
      name: "home",
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) next("login");
//   else if (!requiresAuth && currentUser) next("home");
//   else next();
// });

export default router;
