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
  removeFromCart (state, projectId) {
    const newCart = [];
    for (const i in state.cart) {
      if (state.cart[i].id !== projectId) {
        newCart.push(state.cart[i]);
      }
    }
    state.cart = newCart;
  },
  setShippingOptions (state, shippingOptions) {
    state.shippingOptions = shippingOptions;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const getters = {
  projectIdsInCart (state) {
    const ids = [];
    for (const i in state.cart) {
      ids.push(state.cart[i].id);
    }
    return ids;
  }
};

export const actions = {
  addToCart ({ commit }, project) {
    commit('addToCart', project);
  },
  removeFromCart ({ commit }, projectId) {
    commit('removeFromCart', projectId);
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
