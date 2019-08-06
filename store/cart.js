export const state = () => ({
  cart: []
});

export const mutations = {
  addToCart (state, design) {
    state.cart.push(design);
  }
};

export const actions = {
  addToCart ({ commit }, design) {
    commit('addToCart', design);
  }
};
