<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-if="isAuthenticated"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>List App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> List App </v-list-item-title>
          <v-list-item-subtitle> Vue 2/Vue Router/Vuex </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item @click="logout" link>
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import auth from "./mixins/auth";

export default {
  data: () => ({
    drawer: null,
    right: null,
  }),
  mixins: [auth],
  methods: {
    logout() {
      this.$cookie.delete("token");
      window.location.href = "/";
    },
  },
};
</script>
