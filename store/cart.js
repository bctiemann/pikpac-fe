export const state = () => ({
  cart: [],
  shippingOption: null,
  taxRate: 0,
  defaultShippingAddress: {},
  defaultBillingAddress: {},
  defaultCard: {},
  shippingOptions: [],
  chargeResult: null,
  orderSummary: {},
  isLoading: false
});

export const mutations = {
  emptyCart (state) {
    state.cart = [];
    state.taxRate = 0;
    state.shippingOption = null;
  },
  setOrderSummary (state, orderSummary) {
    state.orderSummary = orderSummary;
  },
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
  setTaxRate (state, taxRate) {
    state.taxRate = taxRate;
  },
  setShippingOption (state, shippingOption) {
    state.shippingOption = shippingOption;
  },
  setChargeResult (state, data) {
    state.chargeResult = data;
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
  },
  cartTotalPrice (state) {
    let total = 0;
    for (const i in state.cart) {
      total += state.cart[i].quantity * Math.round(parseFloat(state.cart[i].unitPrice) * 100) / 100;
    };
    return total;
  },
  tax (state, getters) {
    return Math.round((getters.cartTotalPrice + getters.shipping) * state.taxRate * 100) / 100;
  },
  shipping (state, getters) {
    return state.shippingOption ? parseFloat(state.shippingOption.price) : 0;
  },
  orderTotal (state, getters) {
    return getters.cartTotalPrice + getters.shipping + getters.tax;
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
    commit('setChargeResult', data);
  }
};
