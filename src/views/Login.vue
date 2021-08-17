<template>
  <div class="login-page">
    <section class="login-container">
      <div class="title"><h1>Mama's Herbal</h1></div>
      <div class="login-form">
        Email
        <input
          type="text"
          placeholder="username"
          class="login-input"
          v-model="username"
        />
        Password
        <input
          type="password"
          placeholder="password"
          class="login-input"
          v-model="password"
        />
        <button class="login-btn" @click="login()">
          <h4>{{ status }}</h4>
        </button>
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
      status: "Login",
    };
  },
  methods: {
    async login() {
      this.status = "Logging in...";
      this.$store.commit("setIsLoading", true);
      let res = await Auth.login(this.username, this.password);
      if (res.valid) {
        this.$router.replace({ name: "catalogue" });
      } else {
        this.$store.commit("setSnackBar", res.res);
      }
      this.$store.commit("setIsLoading", false);
      this.status = "Login";
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
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 100%;
}

.login-input {
  padding: 1rem;
  margin: 0.5rem 0rem;
  width: 100%;
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
  padding: 1rem;
  margin: 1rem 0rem;
  background: #41453e;
  color: white;
}

@media only screen and (min-width: 768px) {
  .login-container {
    width: 30%;
  }

  .login-page {
    background: none;
  }
}
</style>
