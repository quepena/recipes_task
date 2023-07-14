import axios from "axios";
import create from "zustand";

export const store = create((set) => ({
    recipes: [],
    loadRecipes: async () => {
        const { data } = await axios.get("https://api.punkapi.com/v2/beers?page=1");
        
        set(() => ({
            recipes: { data }
        }))
    },
    // Not implemented
    deleteRecipes: async (id) => {
        set((state) => ({
            recipes: state.recipes.map((recipe) => recipe.filter((el) => el.id == id)),
        }))
    },
}));