import type { FoodNutrient, IngredientInput } from "@/types/food";
import { emptyNutrients, type Nutrients } from "@/types/nutrition";

const nutrientKeys = Object.keys(emptyNutrients) as Array<keyof Nutrients>;

export function multiplyNutrients(per100g: Nutrients, grams: number): Nutrients {
  return nutrientKeys.reduce((acc, key) => {
    acc[key] = (per100g[key] * grams) / 100;
    return acc;
  }, { ...emptyNutrients });
}

export function addNutrients(items: Nutrients[]): Nutrients {
  return items.reduce((total, item) => {
    nutrientKeys.forEach((key) => {
      total[key] += item[key];
    });
    return total;
  }, { ...emptyNutrients });
}

export function findFoodByInput(input: IngredientInput, foods: FoodNutrient[]): FoodNutrient | undefined {
  if (input.matchedFoodId) {
    return foods.find((food) => food.id === input.matchedFoodId);
  }

  const normalized = normalizeFoodName(input.foodName);
  return foods.find((food) => {
    const names = [food.nameJa, ...food.aliases].map(normalizeFoodName);
    return names.some((name) => name === normalized || normalized.includes(name) || name.includes(normalized));
  });
}

export function calculateIngredientNutrition(input: IngredientInput, foods: FoodNutrient[]) {
  const food = findFoodByInput(input, foods);
  return {
    input,
    food,
    nutrients: food ? multiplyNutrients(food.per100g, input.grams) : { ...emptyNutrients }
  };
}

export function calculateCaPRatio(nutrients: Nutrients): number | null {
  if (nutrients.phosphorusMg <= 0) {
    return null;
  }
  return nutrients.calciumMg / nutrients.phosphorusMg;
}

export function normalizeFoodName(value: string): string {
  return value.trim().toLocaleLowerCase("ja-JP").replace(/\s+/g, "");
}
