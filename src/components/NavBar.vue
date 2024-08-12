<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const isLoggedIn = ref(false)
const router = useRouter()

const checkLoginStatus = () => {
  const user = localStorage.getItem('user')
  isLoggedIn.value = user !== null
}

const logout = () => {
  localStorage.removeItem('user')
  isLoggedIn.value = false
  router.push('/')
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Shop-here</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link" aria-current="page" href="/login">Login </a>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link" href="/signup">Sign up</a>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link cart-icon" href="/cart">
              <i class="bi bi-cart"></i>
            </a>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link cart-icon" href="/wishlist">
              <i class="bi bi-heart"></i>
            </a>
          </li>
          <li class="nav-link" v-if="isLoggedIn" @click="logout">Log out</li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.cart-icon i {
  font-size: 1.3rem;
  color: rgb(27, 82, 45);
  margin: 20px 10px 0px;
  transition: color 0.3s ease;
}

.cart-icon i:hover {
  color: rgb(2, 26, 10);
}

.nav-link {
  display: inline;
}
.navbar-brand {
  margin-left: 20px;
  font-family: 'Roboto';
  color: rgb(27, 82, 45);
  font-weight: bolder;
}
.container-fluid {
  background-color: rgb(180, 219, 180);
  padding: 0;
}
.navbar {
  padding: 0;
  justify-content: center;
  align-items: center;
}
</style>
