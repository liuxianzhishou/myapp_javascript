import Vue from 'vue'
import VueRouter from 'vue-router'

const Home =()=> import('../views/home/Home')
const Wooden =()=> import('../views/wooden/Wooden')
const Analysis =() => import('../views/analysis/Analysis')
const Profile =() => import('../views/profile/Profile')
const Detail =() => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/wooden',
    component: Wooden
  },
  {
    path: '/analysis',
    component: Analysis
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
