export const state = () => ({
  project: {},
  isLoading: false
});

export const getters = {
  zeroPadPrice: state => (value) => {
    if (!value) {
      return 0;
    }
    return value.toLocaleString('en', { minimumIntegerDigits: 1, minimumFractionDigits: 2, useGrouping: false });
  }
};

export const mutations = {
  setProject (state, project) {
    console.log(project);
    project.unitPrice = project.unitPrice || project.unit_price;
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
