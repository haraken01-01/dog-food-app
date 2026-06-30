import type { ActivityLevel, BodyCondition, DogProfile, NeuteredStatus } from "@/types/dog";
import type { MainFoodInput } from "@/types/food";

export const activityFactors: Record<ActivityLevel, number> = {
  inactive: 90,
  low: 100,
  normal: 110,
  active: 125,
  veryActive: 140
};

export const bodyConditionFactors: Record<BodyCondition, number> = {
  thin: 1.15,
  slightlyThin: 1.1,
  ideal: 1,
  slightlyOverweight: 0.9,
  overweight: 0.8
};

export const neuteredFactors: Record<NeuteredStatus, number> = {
  neutered: 0.95,
  intact: 1
};

export function estimateDailyCalories(profile: DogProfile): number {
  if (!Number.isFinite(profile.weightKg) || profile.weightKg <= 0) {
    return 0;
  }

  return (
    Math.pow(profile.weightKg, 0.75) *
    activityFactors[profile.activityLevel] *
    bodyConditionFactors[profile.bodyCondition] *
    neuteredFactors[profile.neuteredStatus]
  );
}

export function calorieRange(estimatedCalories: number) {
  return {
    lower: estimatedCalories * 0.9,
    upper: estimatedCalories * 1.1
  };
}

export function calculateMainFoodCalories(mainFood: MainFoodInput) {
  const perMeal = (mainFood.kcalPer100g * mainFood.gramsPerMeal) / 100;
  return {
    id: mainFood.id,
    productName: mainFood.productName,
    foodType: mainFood.foodType,
    gramsPerDay: mainFood.gramsPerMeal * mainFood.mealsPerDay,
    perMeal,
    perDay: perMeal * mainFood.mealsPerDay
  };
}

export function calculateMainFoodsCalories(mainFoods: MainFoodInput[]) {
  const items = mainFoods.map(calculateMainFoodCalories);
  return {
    items,
    perDay: items.reduce((sum, item) => sum + item.perDay, 0),
    gramsPerDay: items.reduce((sum, item) => sum + item.gramsPerDay, 0)
  };
}

export function formatKcal(value: number): string {
  if (!Number.isFinite(value)) {
    return "- kcal";
  }

  return `${Math.round(value).toLocaleString("ja-JP")} kcal`;
}
