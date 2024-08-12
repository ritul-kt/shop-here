<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = () => {
  const existingData = JSON.parse(localStorage.getItem('formData') || '[]')

  const isValid = existingData.some(
    (entry: { username: string; password: string }) =>
      entry.username === username.value && entry.password === password.value
  )

  if (isValid) {
    alert('Login successful!')
    const user = { username: username.value, password: password.value }
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    alert('Invalid username or password.')
  }

  username.value = ''
  password.value = ''

  router.push('/')
}
</script>
<template>
  <div class="container">
    <h1>Log In</h1>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="mb-3">
        <label for="username" class="form-label">User Name</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          aria-describedby="username"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary">Log In</button>
      <p>Don't have a account <a href="/signup">Sign up</a></p>
    </form>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2.5rem;
  font-weight: bolder;
  color: rgb(27, 82, 45);
  text-align: center;
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
}
.form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #cbf0d7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(51, 112, 67, 0.1);
}

.form-label {
  font-weight: bold;
  color: #07422a;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.btn-primary {
  width: 100%;
  background-color: rgb(104, 192, 133);
  border-color: rgb(104, 192, 133);
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: rgb(27, 82, 45);
}
</style>
