export const state = () => ({
  design: {}
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
  }
};

export const actions = {
  setDesignProperty ({ commit }, payload) {
    commit('setDesignProperty', payload);
  }
};
