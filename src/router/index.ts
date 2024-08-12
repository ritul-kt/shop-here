import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '@/components/ SignUp.vue'
import LogIn from '@/components/LogIn.vue'
import ProductDetails from '@/components/ProductDetails.vue'
import CartItems from '@/components/CartItems.vue'
import WishList from '@/components/WishList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/products',
      name: 'product',
      component: ProductDetails
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartItems
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishList
    }
  ]
})

export default router
