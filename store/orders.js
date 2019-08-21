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
  async getOrders ({ commit }) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/orders/`);
    commit('setOrders', data);
    commit('setIsLoading', false);
  },
  async cancelOrder ({ commit, dispatch }, orderId) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/orders/${orderId}/cancel/`);
    console.log(data);
    dispatch('getOrders');
    commit('setIsLoading', false);
  }
};
