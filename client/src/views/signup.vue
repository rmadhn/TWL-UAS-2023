<template>
  <div class="signup_container">
    <div class="signup_form_container">
      <div class="left">
        <h1>Welcome Back</h1>
        <router-link to="/">
          <button type="button" class="white_btn">Sign in</button>
        </router-link>
      </div>
      <div class="right">
        <form class="form_container" @submit="handleSubmit">
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="first name"
            v-model="data.firstName"
            required
            class="input"
          />
          <input
            type="text"
            placeholder="last name"
            v-model="data.lastName"
            required
            class="input"
          />
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
          <button type="submit" class="green_btn">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      data: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      try {
        const url = "https://server-backend-black.vercel.app/api/users";
        const response = await axios.post(url, this.data);
        this.$router.push("/");
        console.log(response.data.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          this.error = error.response.data.message;
        }
      }
    },
  },
};
</script>

<style scoped>
.signup_container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup_form_container {
  width: 900px;
  height: 500px;
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}

.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3bb19b;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.left h1 {
  margin-top: 0;
  color: white;
  font-size: 35px;
  align-self: center;
}

.right {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
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
