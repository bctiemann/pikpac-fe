export const state = () => ({
  project: {},
  isLoading: false
});

export const mutations = {
  setProject (state, project) {
    state.project = project;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  async getProject ({ commit }, projectId) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/projects/${projectId}/`);
    commit('setProject', data);
    commit('setIsLoading', false);
  },
  storeProject ({ commit }, payload) {
    commit('setProject', payload);
  },
  async createProject ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/projects/`, payload);
    console.log(data);
    commit('setProject', data);
    commit('setIsLoading', false);
  }
};
