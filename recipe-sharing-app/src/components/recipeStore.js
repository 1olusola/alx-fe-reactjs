import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const useRecipeStore = create(
  subscribeWithSelector((set, get) => ({
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    favorites: [],
    recommendations: [],

    // ---- basic CRUD ----
    setRecipes: (recipes) => set({ recipes }),
    addRecipe: (newRecipe) =>
      set((state) => ({ recipes: [...state.recipes, newRecipe] })),
    updateRecipe: (updatedRecipe) =>
      set((state) => ({
        recipes: state.recipes.map((r) =>
          r.id === updatedRecipe.id ? updatedRecipe : r
        ),
      })),
    deleteRecipe: (id) =>
      set((state) => ({
        recipes: state.recipes.filter((r) => r.id !== id),
        favorites: state.favorites.filter((fId) => fId !== id),
      })),

    // ---- search / filter ----
    setSearchTerm: (term) => set({ searchTerm: term }),
    filterRecipes: () =>
      set((state) => ({
        filteredRecipes: state.recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      })),

    // ---- favorites ----
    addFavorite: (id) =>
      set((state) => ({ favorites: [...state.favorites, id] })),
    removeFavorite: (id) =>
      set((state) => ({
        favorites: state.favorites.filter((fId) => fId !== id),
      })),

    // ---- recommendations (mock) ----
    generateRecommendations: () =>
      set((state) => {
        const recommended = state.recipes.filter(
          (r) => state.favorites.includes(r.id) && Math.random() > 0.5
        )
        return { recommendations: recommended }
      }),
  }))
)

// auto-filter when searchTerm or recipes change
useRecipeStore.subscribe(
  (state) => [state.searchTerm, state.recipes],
  () => useRecipeStore.getState().filterRecipes()
)

export default useRecipeStore
