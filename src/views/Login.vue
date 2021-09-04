<template>
  <div class="login-page">
    <v-container class="login-container">
      <v-row>
        <v-col align="center">
          <img
            src="../assets/logo/mama_logo.png"
            alt="logo"
            class="login-logo"
          />
          <v-form class="login-form">
            <v-text-field
              placeholder="username"
              v-model="username"
              label="Email"
              :rules="[rules.required]"
              clearable
            />
            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              @click:append="showPassword = !showPassword"
              v-model="password"
            ></v-text-field>
            <v-btn text class="login-btn" @click="login()" v-if="!isLogin">
              <h4>Log In</h4>
            </v-btn>
            <v-progress-circular
              indeterminate
              v-else
              color="primary"
            ></v-progress-circular>
          </v-form>
          <div class="errorMessage" v-if="errorMessage != ''">
            <small>
              {{ errorMessage }}
            </small>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Auth from "@/apis/auth.js";

export default {
  data: () => {
    return {
      username: "",
      password: "",
      isLogin: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      showPassword: false,
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";
      this.isLogin = true;
      this.isLoading = true;

      await Auth.login(this.username, this.password).then((res) => {
        if (res.valid) {
          this.$router.replace({ name: "catalogue" });
        } else {
          this.errorMessage = res.res;
          this.isLogin = false;
        }
        this.isLoading = false;
      });
    },
  },
};
</script>

<style>
.login-logo {
  max-width: 80%;
  height: auto;
}

.login-page {
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  background: #f3f5f7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

.title {
  color: var(--primary);
  text-align: center;
}

.login-form {
  margin: 2rem 0rem;
  text-align: center;
  width: 80%;
}

.login-input {
  padding: 1rem;
  margin: 0.5rem 0rem;
  width: 100%;
  color: var(--primary);
}

.login-input::placeholder,
.login-input::-moz-placeholder,
.login-input::-ms-input-placeholder {
  text-align: center;
  font-weight: bold;
}

.errorMessage {
  width: 100%;
  font-size: 0.5rem;
}

.login-btn {
  padding: 1rem;
  margin: 1rem 0rem;
}

@media only screen and (min-width: 768px) {
  .login-container {
    width: 90%;
  }

  .login-logo {
    max-width: 60%;
  }
}
</style>
