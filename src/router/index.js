import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "about" */ '../views/UsersView.vue')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if(store.state.token) {
    if(to.name === 'login') {
      next('/users');
    } else {
      next();
    }
  } else {
    if(to.name === 'login') {
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;