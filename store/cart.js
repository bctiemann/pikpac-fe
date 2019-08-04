export const state = () => ({
  cart: []
});

export const mutations = {
  addToCart (state, project) {
    state.cart.push(project);
  }
};

export const actions = {
  addToCart ({ commit }, project) {
    commit('addToCart', project);
  }
};
