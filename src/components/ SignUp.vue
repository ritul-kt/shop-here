<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const username = ref('')
const password = ref('')
const router = useRouter()

const validatePassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const hasMinimumLength = password.length >= 8

  return hasUpperCase && hasLowerCase && hasSpecialCharacter && hasMinimumLength
}

const handleSubmit = () => {
  if (!validatePassword(password.value)) {
    alert(
      'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one special character.'
    )
    return
  }

  const existingData = JSON.parse(localStorage.getItem('formData') || '[]')

  const newEntry = {
    username: username.value,
    password: password.value
  }

  existingData.push(newEntry)

  localStorage.setItem('formData', JSON.stringify(existingData))

  username.value = ''
  password.value = ''
  alert('Registered successful!')
  router.push('/login')
}
</script>
<template>
  <h1>Signup</h1>
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
    <button type="submit" class="btn btn-primary">Sign Up</button>
    <p>Already have a account <a href="/login">Log in</a></p>
  </form>
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
  color: #495057;
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
