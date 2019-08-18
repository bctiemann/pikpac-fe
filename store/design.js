export const state = () => ({
  design: {},
  designFile: null,
  isLoading: false
});

export const mutations = {
  setDesign (state, design) {
    console.log(design);
    state.design = design;
  },
  setDesignProperty (state, { property, value }) {
    const mutatedDesign = state.design;
    mutatedDesign[property] = value;
    state.design = mutatedDesign;
  },
  setDesignFile (state, payload) {
    state.designFile = payload;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  resetDesign ({ commit }) {
    commit('setDesign', {});
  },
  setDesignProperty ({ commit }, payload) {
    commit('setDesignProperty', payload);
  },
  async uploadDesignFile ({ commit }, payload) {
    console.log('uploading');
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/designs/`, payload);
    console.log(data);
    commit('setIsLoading', false);
  }
};
