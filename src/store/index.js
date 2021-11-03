import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import parseLinkHeader from "parse-link-header";
import config from "../config";
import * as constants from "../constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    repos: [],
    pagination: {
      //defaults
      page: 1,
      lastPage: 2,
    },
    loading: false,
  },
  mutations: {
    setRepos(state, repos) {
      state.repos = repos;
    },
    setPagination(state, pagination) {
      Object.keys(pagination).map((key) => {
        state.pagination[key] = pagination[key];
      });
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async getRepos({ commit, state }) {
      commit("setLoading", true);

      //@TODO: add api handler to handle cancellable requests
      let res = await axios(
        `${config.baseURL}/orgs/vuejs/repos?per_page=${constants.PER_PAGE}&page=${state.pagination.page}`
      );

      commit("setRepos", res.data);
      commit("setPagination", {
        lastPage: +parseLinkHeader(res.headers.link).last.page,
      });
      commit("setLoading", false);
    },
  },
  getters: {
    getRepos(state) {
      return state.repos;
    },
  },
  modules: {},
});
