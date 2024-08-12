<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productList, type Product } from '../assets/product'
import { useRouter } from 'vue-router'

const router = useRouter()
const wishlist = ref<Product[]>([])
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
  if (productIndex !== -1) {
    cart[productIndex].quantity++
  } else {
    const product = productList.find((p) => p.id === productId)
    if (product) {
      cart.push({ ...product, quantity: 1 })
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  alert(`Added in cart`)
}

const isInWishlist = (productId: number): boolean => {
  return wishlist.value.some((product) => product.id === productId)
}

const addToWishlist = (productId: number): void => {
  if (!checkLogin()) {
    alert('Login First')
    redirectToLogin()
    return
  }
  console.log('wishlist', wishlist.value)
  const productIndex = wishlist.value.findIndex((p) => p.id === productId)
  console.log('productIndex', productIndex)
  if (productIndex !== -1) {
    wishlist.value.splice(productIndex, 1)
    alert(`Removed from wishlist`)
  } else {
    const product = productList.find((p) => p.id === productId)
    if (product) {
      wishlist.value.push(product)
      alert(`Added to wishlist`)
    }
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist.value))
}

onMounted(() => {
  const storedWishlist = localStorage.getItem('wishlist')
  if (storedWishlist) {
    try {
      wishlist.value = JSON.parse(storedWishlist) || []
    } catch (error) {
      wishlist.value = []
    }
  } else {
    wishlist.value = []
  }
})
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3 mb-4" v-for="product in productList" :key="product.id">
        <div class="card">
          <img :src="product.image" class="card-img-top" :alt="product.name" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">{{ product.price }}</p>
            <div class="option">
              <button @click="addToCart(product.id)" class="btn cart me-2">Add to Cart</button>
              <div class="wishlist-container">
                <button @click="addToWishlist(product.id)" class="btn wish">Add to Wishlist</button>
                <i
                  :class="[
                    'bi',
                    isInWishlist(product.id) ? 'bi-heart-fill filled-heart' : 'bi-heart'
                  ]"
                >
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: rgb(180, 219, 180);
}
.card-img-top {
  height: 150px;
  object-fit: cover;
}
.card-body {
  text-align: center;
  justify-content: center;
}
.wish {
  background-color: white;
  color: #e73b74;
  border: 1px solid red;
  transition: color 0.3s ease;
}

.wish:hover {
  color: white;
  background-color: #e73b74;
}

.wishlist-container {
  display: flex;
  align-items: center;
}

.wishlist-container .bi-heart {
  margin-left: 8px;
  color: gray;
}
.option {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  padding: 6px 12px;
  width: auto;
  height: auto;
  font-size: 14px;
  margin-right: 8px;
}
.cart {
  background-color: rgb(104, 192, 133);
}
.wishlist-container .bi-heart-fill.filled-heart {
  color: #e73b74;
}

.card-title {
  font-weight: bold;
  color: rgb(27, 82, 45);
}
.card-text {
  color: #333;
}
</style>
