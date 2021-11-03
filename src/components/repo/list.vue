<template>
  <v-container>
    <v-card :loading="loading" class="mx-auto mt-10" max-width="600" tile>
      <v-card-title>Repo List</v-card-title>

      <v-list-item
        two-line
        selectable
        ripple
        v-for="repo in repos"
        :key="repo.id"
        @click="goToDetails(repo.name)"
        class="list-item"
      >
        <v-list-item-content>
          <v-list-item-title class="list-title">{{
            repo.name
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ repo.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-pagination
      class="mt-5"
      v-model="page"
      :length="pagination.lastPage"
      :total-visible="7"
    ></v-pagination>
  </v-container>
</template>

<script>
export default {
  name: "RepoList",

  data: () => ({
    page: 1,
  }),
  computed: {
    repos: function () {
      return this.$store.state.repos;
    },
    pagination: function () {
      return this.$store.state.pagination;
    },
    loading: function () {
      return this.$store.state.loading;
    },
  },
  methods: {
    goToDetails(name) {
      this.$router.push({
        name: "Details",
        params: { repoName: name },
      });
    },
  },
  watch: {
    page: function (newPage) {
      this.$store.commit("setPagination", { page: newPage });
      this.$store.dispatch("getRepos");
    },
  },
  beforeMount() {
    this.$store.dispatch("getRepos");
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/styles.scss";
</style>
