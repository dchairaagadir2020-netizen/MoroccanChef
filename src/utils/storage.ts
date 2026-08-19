import { Recipe } from '../types';

const SAVED_RECIPES_KEY = 'moroccan_chef_saved_recipes_v1';

export function getSavedRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(SAVED_RECIPES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved recipes from localStorage:', e);
    return [];
  }
}

export function saveRecipeToStorage(recipe: Recipe): boolean {
  try {
    const current = getSavedRecipes();
    const exists = current.some((r) => r.id === recipe.id || r.titleAr === recipe.titleAr);
    if (!exists) {
      current.unshift(recipe);
      localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(current));
    }
    return true;
  } catch (e) {
    console.error('Failed to save recipe to localStorage:', e);
    return false;
  }
}

export function removeRecipeFromStorage(recipeId: string): boolean {
  try {
    const current = getSavedRecipes();
    const updated = current.filter((r) => r.id !== recipeId);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Failed to remove recipe from localStorage:', e);
    return false;
  }
}

export function isRecipeSaved(recipeId: string): boolean {
  try {
    const current = getSavedRecipes();
    return current.some((r) => r.id === recipeId);
  } catch (e) {
    return false;
  }
}
