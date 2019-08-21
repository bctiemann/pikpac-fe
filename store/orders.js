export const state = () => ({
  orders: [],
  isLoading: false
});

export const mutations = {
  setOrders (state, orders) {
    for (const i in orders) {
      orders[i].project.unitPrice = orders[i].project.unit_price;
    };
    state.orders = orders;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  async getOrders ({ commit }, includeCancelled = false) {
    console.log('getting');
    console.log(includeCancelled);
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/orders/${includeCancelled ? '?include_cancelled=true' : ''}`);
    commit('setOrders', data);
    commit('setIsLoading', false);
  },
  async cancelOrder ({ commit, dispatch }, { orderId, includeCancelled = false }) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/orders/${orderId}/cancel/`);
    console.log(data);
    console.log(includeCancelled);
    dispatch('getOrders', includeCancelled);
    commit('setIsLoading', false);
  }
};
