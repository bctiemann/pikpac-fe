export const state = () => ({
  cart: [],
  defaultShippingAddress: {},
  defaultBillingAddress: {},
  defaultCard: {},
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
  async createAddress ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/addresses/${payload.type}/`, payload.address);
    console.log(data);
    commit('setIsLoading', false);
  },
  async createCard ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/cards/add/`, payload);
    console.log(data);
    commit('setIsLoading', false);
  },
  async chargeCard ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/charge/`, payload);
    console.log(data);
    commit('setProject', data);
    commit('setIsLoading', false);
  }
};
