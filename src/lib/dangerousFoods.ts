import type { DangerousFood, IngredientInput } from "@/types/food";
import { normalizeFoodName } from "./nutrition";

export function findDangerousFoodMatches(inputs: IngredientInput[], dangerousFoods: DangerousFood[]) {
  return inputs.flatMap((input) => {
    const normalized = normalizeFoodName(input.foodName);
    const match = dangerousFoods.find((food) => {
      const names = [food.nameJa, ...food.aliases].map(normalizeFoodName);
      return names.some((name) => normalized === name || normalized.includes(name) || name.includes(normalized));
    });

    return match ? [{ input, dangerousFood: match }] : [];
  });
}
