<template>
  <v-container>
    <v-card class="mx-auto mt-10" max-width="600" tile>
      <v-card-title>
        <v-btn to="/list" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Repo Details
      </v-card-title>
      <v-card-text>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Stars</th>
                <th class="text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ details.name }}</td>
                <td>{{ Number(details.stargazers_count).toLocaleString() }}</td>
                <td>{{ details.description }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions class="mt-5">
        <v-btn
          :href="details.html_url"
          target="_blank"
          color="deep-purple lighten-2"
          text
        >
          Go to repository <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "RepoDetails",
  computed: {
    details: function () {
      return this.$store.state.details;
    },
  },
  beforeMount() {
    this.$store.dispatch("getRepoDetails", this.$route.params.repoName);
  },
};
</script>
