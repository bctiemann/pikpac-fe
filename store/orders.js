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
  async getOrders ({ commit }, payload) {
    console.log('getting');
    // console.log(includeCancelled);
    commit('setIsLoading', true);
    let queryStr = '';
    for (const key in payload.queryParams) {
      if (payload.queryParams[key].toString().indexOf(',') > -1) {
        const vals = payload.queryParams[key].split(',');
        for (const v in vals) {
          queryStr += '&' + key + '=' + vals[v];
        };
      } else {
        queryStr += '&' + key + '=' + payload.queryParams[key];
      }
    };
    console.log(queryStr);
    const { data } = await this.$axios.get(`/orders/?${queryStr}`);
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
