// auth.js

import { reactive, readonly } from "vue";

const state = reactive({
  isAuthenticated: false,
});

const mutations = {
  login() {
    state.isAuthenticated = true;
  },
  logout() {
    state.isAuthenticated = false;
  },
};

export default {
  state: readonly(state),
  mutations,
};
