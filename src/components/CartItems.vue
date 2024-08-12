<script setup lang="ts">
import type { Product } from '../assets/product'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

type CartProduct = Product & { quantity: number }

const cartItems = ref<CartProduct[]>([])

const router = useRouter()
const checkLogin = () => {
  const user = localStorage.getItem('user')
  return user !== null
}

const redirectToLogin = () => {
  router.push('/login')
}

const removeFromCart = (productId: number) => {
  if (!checkLogin()) {
    alert('Login First')
    redirectToLogin()
    return
  }
  const index = cartItems.value.findIndex((item) => item.id === productId)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
}

const increaseQuantity = (productId: number) => {
  if (!checkLogin()) {
    alert('Login First')
    redirectToLogin()
    return
  }
  const product = cartItems.value.find((item) => item.id === productId)
  if (product) {
    product.quantity++
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
}

const decreaseQuantity = (productId: number) => {
  if (!checkLogin()) {
    alert('Login First')
    redirectToLogin()
    return
  }
  const product = cartItems.value.find((item) => item.id === productId)
  if (product && product.quantity > 1) {
    product.quantity--
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
}

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
})

onMounted(() => {
  cartItems.value = JSON.parse(localStorage.getItem('cart') || '[]').map((item: Product) => ({
    ...item,
    quantity: item.quantity || 1
  })) as CartProduct[]
})
</script>

<template>
  <div class="container mt-4">
    <div class="heading">
      <h2>Your Cart</h2>
      <p>Cart Total:{{ total }}</p>
    </div>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div class="cart-item row mb-4" v-for="item in cartItems" :key="item.id">
      <div class="col-md-3">
        <img :src="item.image" class="img-fluid" :alt="item.name" />
      </div>
      <div class="col-md-9">
        <h5 class="product-name">{{ item.name }} ({{ item.quantity }})</h5>
        <p>{{ item.description }}</p>
        <p>{{ item.price }}</p>
        <div class="range">
          <button @click="removeFromCart(item.id)" class="delete-button">
            <i class="bi bi-trash3"></i>
          </button>
          <div class="meter">
            <button @click="increaseQuantity(item.id)" class="bag">
              <i class="bi bi-bag-plus"></i>
            </button>
            <button @click="decreaseQuantity(item.id)" class="bag">
              <i class="bi bi-bag-dash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(180, 219, 180);
  color: rgb(27, 82, 45);
  padding-left: 10px;
  padding-right: 20px;
  margin-bottom: 50px;
}
.cart-item {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.product-name {
  color: rgb(27, 82, 45);
}
.img-fluid {
  max-height: 150px;
  object-fit: cover;
}
.range {
  display: flex;
}
.delete-button {
  margin: auto 5px;
  background-color: white;
  color: red;
  border: 1px solid red;
}
.meter {
  display: flex;
  margin: auto 5px;
}
.bag {
  margin: auto 2px;
  background-color: white;
  color: rgb(27, 82, 45);
  border: 1px solid rgb(27, 82, 45);
}
</style>
