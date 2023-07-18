import {create} from 'zustand';
import axios from "axios";

const useBeerRecipeStore = create((set) => ({
    recipes: [],
    recipe: {},
    recipesToFilter: [],
    currentPage: 1,
    getRecipesPage: async (pageNumber) => {
        try {
            const response = await axios.get(`https://api.punkapi.com/v2/beers?page=${pageNumber}`);
            set({recipes: await response.data});
            set({recipesToFilter: await response.data});
        } catch (error) {
            console.error(error);
        }
    },
    getRecipeById: async (id) => {
        try {
            const response = await axios.get(`https://api.punkapi.com/v2/beers/${id}`);
            set({recipe: await response.data[0]});
        } catch (error) {
            console.error(error);
        }
    },
    setRecipesToFilter: (newRecipesToFilter) => set(() => ({recipesToFilter: newRecipesToFilter})),
    deleteRecipes: (filteredRecipes) => set(() => ({recipes: filteredRecipes})),
    incrementCurrentPage: () => set((state) => ({currentPage: state.currentPage + 1})),
}));

export default useBeerRecipeStore;
