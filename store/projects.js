export const state = () => ({
  project: {},
  savedProjects: [],
  isValidProject: false,
  projectIsLoaded: false,
  isLoading: false
});

export const mutations = {
  setProject (state, project) {
    console.log('setProject');
    state.project = project;
  },
  setSavedProjects (state, savedProjects) {
    state.savedProjects = savedProjects;
  },
  setProjectProperty (state, { property, value }) {
    const mutatedProject = {};
    Object.assign(mutatedProject, state.project);
    mutatedProject[property] = value;
    state.project = mutatedProject;
  },
  setIsValidProject (state, isValidProject) {
    state.isValidProject = isValidProject;
  },
  setProjectIsLoaded (state, projectIsLoaded) {
    state.projectIsLoaded = projectIsLoaded;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  async getProject ({ commit }, payload) {
    commit('setIsLoading', true);
    try {
      const { data } = await this.$axios.get(`/projects/${payload.projectId}/`, { params: payload.queryParams });
      const project = {};
      Object.assign(project, data);
      project.unitPrice = project.unit_price;
      // project.type = 'Custom design';
      commit('setProject', project);
      commit('setIsValidProject', true);
    } catch (err) {
      console.log(err);
      commit('setIsValidProject', false);
    }
    commit('setProjectIsLoaded', true);
    commit('setIsLoading', false);
  },
  async getSavedProjects ({ commit }) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/projects/`);
    console.log(data);
    commit('setSavedProjects', data);
    commit('setIsLoading', false);
  },
  async createProject ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/projects/`, payload);
    console.log(data);
    commit('setProject', data);
    commit('setIsLoading', false);
  },
  async updateProject ({ commit }, payload) {
    commit('setIsLoading', true);
    await this.$axios.patch(`/designs/${payload.project.design.id}/`, payload.project.design);
    const { data } = await this.$axios.patch(`/projects/${payload.projectId}/`, payload.project);
    console.log(data);
    commit('setProject', data);
    commit('setIsLoading', false);
  }
};
