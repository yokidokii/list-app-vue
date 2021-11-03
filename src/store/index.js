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
    details: {},
    pagination: {
      //defaults
      page: 1,
      lastPage: constants.DEFAULT_LAST_PAGE,
    },
    loading: false,
  },
  mutations: {
    setRepos(state, repos) {
      state.repos = repos;
    },
    setDetails(state, details) {
      state.details = details;
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

      //should not commit change for lastPage if it is already set/changed
      if (state.pagination.lastPage === constants.DEFAULT_LAST_PAGE) {
        commit("setPagination", {
          lastPage: +parseLinkHeader(res.headers.link).last.page,
        });
      }

      commit("setLoading", false);
    },
    async getRepoDetails({ commit }, repoName) {
      //@TODO: add api handler to handle cancellable requests
      let res = await axios(`${config.baseURL}/repos/vuejs/${repoName}`);
      commit("setDetails", res.data);
    },
  },
  getters: {
    getRepos(state) {
      return state.repos;
    },
    getRepoDetails(state) {
      return state.details;
    },
  },
  modules: {},
});
