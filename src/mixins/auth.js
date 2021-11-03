export default {
  computed: {
    isAuthenticated: function () {
      if (this.$cookie.get("token")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
