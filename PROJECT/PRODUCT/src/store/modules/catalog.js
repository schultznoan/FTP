import { catalog } from '@api';

export default {
    namespaced: true,
    state: () => ({
        items: [],
        sort: [{
            name: 'DEFAULT',
            value: 'id',
        }],
        productApi: 'https://raw.githubusercontent.com/SergioElCringe/JS_step_1/main/TEST_FTP/static/products',
<<<<<<< HEAD:PROJECT/PRODUCT/src/store/modules/catalog.js
=======
        page: 1,
        pagesCount: 1,
>>>>>>> 2b1d14553068f4033c6fbfebdf72db20f790364b:Project/PRODUCT/src/store/modules/catalog.js
    }),

    getters: {
        filteredCatalog(state) {
            return state.items.filter(el => !!el.category);
        },

        descriptionProduct(state, id) {
            return state.items.find(item => item.id === id);
        },

        sortedCatalog(state) {
            const selectedSort = state.sort.val;
            return state.items.sort((prev, next) => {
                if (state.sort.name === 'name') {
                    if (prev[selectedSort] < next[selectedSort]) return -1;
                    if (prev[selectedSort] < next[selectedSort]) return 1;
                } else {
                    return prev[selectedSort] - next[selectedSort];
                };
            });
        },
    },

    mutations: {
        setCatalog(state, data) {
            state.items = data.products;
            state.page = data.page;
            state.pagesCount = data.pageCount;
        },

        setSort(state, val) {
            state.sort = val;
        },
    },

    actions: {
<<<<<<< HEAD:PROJECT/PRODUCT/src/store/modules/catalog.js
        async getCatalog({ commit }) {
            try {
                const data = await catalog.getCatalog();
=======
        async getCatalog({ commit }, val = {}) {
            try {
                const data = await catalog.increment(val);
>>>>>>> 2b1d14553068f4033c6fbfebdf72db20f790364b:Project/PRODUCT/src/store/modules/catalog.js
                commit('setCatalog', data);
            } catch (err) {
                console.warn(err);
            };
        },
    },
};