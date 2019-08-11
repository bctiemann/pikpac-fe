export const state = () => ({
  cart: [],
  isLoading: false
});

export const mutations = {
  addToCart (state, project) {
    state.cart.push(project);
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  addToCart ({ commit }, project) {
    commit('addToCart', project);
  },
  async chargeCard ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/charge/`, payload);
    console.log(data);
    commit('setProject', data);
    commit('setIsLoading', false);
  }
};
