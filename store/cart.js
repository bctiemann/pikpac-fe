export const state = () => ({
  cart: [],
  defaultShippingAddress: {},
  defaultBillingAddress: {},
  defaultCard: {},
  shippingOptions: [],
  isLoading: false
});

export const mutations = {
  addToCart (state, project) {
    state.cart.push(project);
  },
  setShippingOptions (state, shippingOptions) {
    state.shippingOptions = shippingOptions;
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
  async getShippingOptions ({ commit }) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/shipping_options/`);
    commit('setShippingOptions', data);
    commit('setIsLoading', false);
  },

  async getTaxRate ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/tax_rate/${payload.postalCode}/`);
    commit('setIsLoading', false);
    return data;
  },
  async getToken ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/cards/get_token/?token=${payload.token.id}`);
    console.log(data);
    commit('setIsLoading', false);
    return data;
  },
  async createCard ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/cards/add/`, payload);
    console.log(data);
    commit('setIsLoading', false);
    return data;
  },
  async chargeCard ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.post(`/charge/`, payload);
    console.log(data);
    commit('setIsLoading', false);
    return data;
  }
};
