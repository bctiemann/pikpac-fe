export const state = () => ({
  categories: [],
  headings: [],
  // items: [],
  isLoading: false
});

export const mutations = {
  setCategories (state, categories) {
    state.categories = categories;
  },
  setHeadings (state, headings) {
    state.headings = headings;
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export const actions = {
  async getCategories ({ commit }) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/faq_categories/`);
    commit('setCategories', data);
    commit('setIsLoading', false);
  },
  async getHeadings ({ commit }, payload) {
    commit('setIsLoading', true);
    const { data } = await this.$axios.get(`/faq_headings/?category=${payload.category}`);
    commit('setHeadings', data);
    commit('setIsLoading', false);
  }
//  async getItems ({ commit }, payload) {
//    commit('setIsLoading', true);
//    const { data } = await this.$axios.get(`/faq_items/?heading=${payload.heading}`);
//    commit('setItems', data);
//    commit('setIsLoading', false);
//  }
};
