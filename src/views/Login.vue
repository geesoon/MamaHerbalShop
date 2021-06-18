<template>
  <div class="login-page">
    <div class="large-view-background"></div>
    <div class="login-background"></div>
    <section class="login-container">
      <div class="title"><h1>Mama's Herbal</h1></div>
      <div class="login-form">
        <input
          type="text"
          placeholder="username"
          class="login-input"
          v-model="username"
        />
        <input
          type="password"
          placeholder="password"
          class="login-input"
          v-model="password"
        />
        <button class="login-btn" @click="login()"><h4>Login</h4></button>
      </div>
    </section>
  </div>
</template>

<script>
import Auth from "@/apis/auth.js";

export default {
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let res = await Auth.login(this.username, this.password);
      if (res.valid) {
        this.$router.replace({ name: "catalogue" });
      } else {
        alert(res.res);
      }
    },
  },
};
</script>

<style>
.login-page {
  height: 100vh;
  width: 100vw;
  background: #f3f5f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.login-background {
  position: absolute;
  bottom: 0;
  background-image: url("../assets/teabag.jpg");
  background-size: cover;
  height: 80vh;
  width: 100vw;
  z-index: 1;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 2;
  position: relative;
  width: 100%;
}

.title {
  color: var(--primary);
  text-align: center;
}

.login-form {
  margin: 2rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.login-input {
  padding: 1rem;
  margin: 0.5rem 0rem;
  width: 80%;
  border: 2px solid var(--primary);
  color: var(--primary);
  font-size: 1.3rem;
}

.login-input::placeholder,
.login-input::-moz-placeholder,
.login-input::-ms-input-placeholder {
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
}

.login-btn {
  width: 80%;
  padding: 1rem;
  margin: 1rem 0rem;
  background: #41453e;
  color: white;
}

.large-view-background {
  display: none;
  background-image: url("../assets/chinese-medicine.jpg");
  background-size: fill;
  height: 100%;
  width: 50%;
}

@media only screen and (min-width: 768px) {
  /* For tablet: */
  .large-view-background {
    display: block;
  }

  .login-background {
    background-image: none;
  }

  .login-container {
    width: 50%;
  }

  .login-page {
    background: none;
  }
}
</style>
