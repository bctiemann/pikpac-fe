export const state = () => ({
  project: {},
  isLoading: false
});

export const mutations = {
  setProject (state, project) {
    console.log(project);
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
  }
};
