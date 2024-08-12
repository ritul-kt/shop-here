<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productList, type Product } from '../assets/product'
import { useRouter } from 'vue-router'
const router = useRouter()

const wishList = ref<Product[]>([])

const checkLogin = () => {
  const user = localStorage.getItem('user')
  return user !== null
}

const redirectToLogin = () => {
  router.push('/login')
}

const addToCart = (productId: number) => {
  if (!checkLogin()) {
    alert('Login First')
    redirectToLogin()
    return
  }
  let cart: (Product & { quantity: number })[] = JSON.parse(localStorage.getItem('cart') || '[]')

  const productIndex = cart.findIndex((item) => item.id === productId)
  console.log('pi', productIndex)
  if (productIndex !== -1) {
    cart[productIndex].quantity++
  } else {
    const product = productList.find((p) => p.id === productId)
    if (product) {
      cart.push({ ...product, quantity: 1 })
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  alert(`Product ${productId} updated in cart`)
  removeFromWishlist(productId)
}
const removeFromWishlist = (productId: number) => {
  if (!checkLogin()) {
    alert('Login First')
    redirectToLogin()
    return
  }
  const index = wishList.value.findIndex((item) => item.id === productId)
  if (index !== -1) {
    wishList.value.splice(index, 1)
    localStorage.setItem('wishlist', JSON.stringify(wishList.value))
  }
}

onMounted(() => {
  wishList.value = JSON.parse(localStorage.getItem('wishlist') || '[]')
})
</script>

<template>
  <div class="container mt-4">
    <h2 class="heading">Your Wishlist</h2>
    <div v-if="wishList.length === 0">
      <p>No item wishlisted.</p>
    </div>
    <div class="cart-item row mb-4" v-for="item in wishList" :key="item.id">
      <div class="col-md-3">
        <img :src="item.image" class="img-fluid" :alt="item.name" />
      </div>
      <div class="col-md-9">
        <h5 class="product-name">{{ item.name }}</h5>
        <p>{{ item.description }}</p>
        <p>{{ item.price }}</p>
        <button @click="addToCart(item.id)" class="btn me-2">Add to Cart</button>
        <button @click="removeFromWishlist(item.id)" class="delete-btn">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.img-fluid {
  max-height: 150px;
  object-fit: cover;
}
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
.delete-btn {
  background-color: white;
  color: red;
  border: 1px solid red;
}
.btn {
  background-color: rgb(104, 192, 133);
}
.product-name {
  color: rgb(27, 82, 45);
}
</style>
