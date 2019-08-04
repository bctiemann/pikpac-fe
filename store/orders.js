export const state = () => ({
  orders: [],
  isLoading: false
});

export const mutations = {
  setOrders (state, orders) {
    state.orders = orders;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  async getOrders ({ commit }) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/orders/`);
    commit('setOrders', data);
    commit('setIsLoading', false);
  }
};
