import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "about" */ '../views/ProductsView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import(/* webpackChunkName: "about" */ '../views/OrdersView.vue')
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

router.beforeEach((to, _from, next) => {
  if(store.state.load === false) {
    store.dispatch('fetchLoading')
  }
  store.dispatch('fetchAccessToken');
  if(store.state.token) {
    if(to.name === 'login' || to.name === 'register') {
      next('/products');
    } else if (store.state.user.role !== 'admin') {
      if (to.name === 'users') {
        next('/products');
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    if(to.name === 'login' || to.name === 'register') {
      next();
    } else {
      next('/login');
    }
  }
})

export default router;