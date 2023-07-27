<template>
  <div class="login_container">
    <div class="login_form_container">
      <div class="left">
        <form class="form_container" @submit="handleSubmit">
          <h1>Login to Your Account</h1>
          <input
            type="email"
            placeholder="email"
            v-model="data.email"
            required
            class="input"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="data.password"
            required
            class="input"
          />
          <div v-if="error" class="error_msg">{{ error }}</div>
          <button type="submit" class="green_btn">Sign In</button>
        </form>
      </div>
      <div class="right">
        <h1>New Here?</h1>
        <router-link to="/signup">
          <button type="button" class="white_btn">Sign Up</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Menggunakan useRouter untuk mengakses instance router
import axios from "axios";
import auth from "../router/auth"; // Import file auth.js yang telah dibuat sebelumnya

export default {
  name: "LoGin",
  setup() {
    const router = useRouter(); // Menggunakan useRouter untuk mengakses instance router
    const data = ref({
      email: "",
      password: "",
    });
    const error = ref("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = "https://server-backend-black.vercel.app/api/auth";
        const response = await axios.post(url, data.value);
        localStorage.setItem("token", response.data.data);
        auth.mutations.login(); // Panggil mutasi login dari auth.js
        router.push("/main"); // Menggunakan router.push untuk navigasi ke halaman beranda
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          error.value = error.response.data.message;
        }
      }
    };

    return {
      data,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.login_container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login_form_container {
  width: 900px;
  height: 500px;
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}

.left {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.form_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form_container h1 {
  font-size: 40px;
  margin-top: 0;
}

.input {
  outline: none;
  border: none;
  width: 370px;
  padding: 15px;
  border-radius: 10px;
  background-color: #edf5f3;
  margin: 5px 0;
  font-size: 14px;
}

.error_msg {
  width: 370px;
  padding: 15px;
  margin: 5px 0;
  font-size: 14px;
  background-color: #f34646;
  color: white;
  border-radius: 5px;
  text-align: center;
}

.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3bb19b;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.right h1 {
  margin-top: 0;
  color: white;
  font-size: 40px;
  align-self: center;
}

.white_btn,
.green_btn {
  border: none;
  outline: none;
  padding: 12px 0;
  background-color: white;
  border-radius: 20px;
  width: 180px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

.green_btn {
  background-color: #3bb19b;
  color: white;
  margin: 10px;
}
</style>
