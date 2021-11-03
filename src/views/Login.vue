<template>
  <v-card width="400" class="mx-auto mt-10" elevation="2" shaped>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="form.username"
        :rules="rules"
        label="Username"
        prepend-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="rules"
        type="password"
        label="Password"
        prepend-icon="mdi-lock"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :disabled="isFormEmpty"
        color="deep-purple lighten-2"
        text
        @click="login"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import auth from "../mixins/auth";

export default {
  name: "Login",
  data: () => ({
    rules: [(value) => !!value || "Required."],
    form: {
      username: "",
      password: "",
    },
  }),
  mixins: [auth],
  computed: {
    isFormEmpty: function () {
      return Object.values(this.form).some((val) => val === null || val === "");
    },
  },
  methods: {
    login() {
      // this.$cookie.delete('token');
      this.$cookie.set(
        "token",
        (Math.random() + 1).toString(36).substring(2),
        1
      );
      window.location.href = "/list";
    },
  },
  beforeMount() {
    if (this.isAuthenticated) {
      this.$router.push("list");
    }
  },
};
</script>

<style lang="scss"></style>
