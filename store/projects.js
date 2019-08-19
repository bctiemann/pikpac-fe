export const state = () => ({
  project: {},
  isLoading: false
});

export const mutations = {
  setProject (state, project) {
    console.log('setProject');
    state.project = project;
  },
  setProjectProperty (state, { property, value }) {
    const mutatedProject = state.project;
    mutatedProject[property] = value;
    state.project = mutatedProject;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  async getProject ({ commit }, projectId) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/projects/${projectId}/`);
    const project = {};
    Object.assign(project, data);
    project.unitPrice = project.unit_price;
    project.type = 'Custom design';
    commit('setProject', project);
    commit('setIsLoading', false);
  },
  async createProject ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/projects/`, payload);
    console.log(data);
    commit('setProject', data);
    commit('setIsLoading', false);
  }
};
