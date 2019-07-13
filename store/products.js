export const state = () => ({
  categories: [],
  selectedCategory: null,
  products: [],
  productsDict: {},
  isLoading: false
});

export const getters = {
};

export const mutations = {
  setCategories (state, categories) {
    state.categories = categories;
  },
  setSelectedCategory (state, category) {
    state.selectedCategory = category;
  },
  setProducts (state, products) {
    state.products = products;
    for (const p in products) {
      state.productsDict[products[p].id] = products[p];
    };
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  },
  updateSelectedPlayer (state, getters, payload) {
    // var program = payload.photobooth;
    for (const key in payload) {
      if (getters.selectedPlayer.hasOwnProperty(key)) {
        getters.selectedPlayer[key] = payload[key];
      }
    }
  }
};

export const actions = {
  async getCategories ({ commit }) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/categories/`);
    commit('setCategories', data);
    commit('setIsLoading', false);
  },
  async getCategory ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/categories/${payload.category}/`);
    commit('setSelectedCategory', data);
    commit('setIsLoading', false);
  },
  async getProducts ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/products/?category=${payload.category}`);
    commit('setProducts', data);
    commit('setIsLoading', false);
  },
  selectProgram ({ commit, state }, id) {
    commit('setSelectedProgram', state.programs.find(p => p.id === id));
  },
  async updatePlayer ({ commit, state }, payload) {
    await this.$axios.patch(`/players/${payload.editedItem.id}/`, payload.editedItem);
    commit('setPlayer', payload);
  },
  async createPlayer ({ commit, state }, payload) {
    const newPlayer = payload.editedItem;
    newPlayer.director = this.$auth.user.id;
    await this.$axios.post(`/players/`, newPlayer)
      .then((response) => {
        commit('appendPlayer', response.data);
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  },
  async deletePlayer ({ commit, state }, index) {
    await this.$axios.delete(`/players/${state.players[index].id}/`);
    commit('deletePlayer', index);
  }
};
