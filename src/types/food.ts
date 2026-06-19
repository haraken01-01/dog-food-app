import type { Nutrients } from "./nutrition";

export type MainFoodType = "completeDry" | "completeWet" | "sideDish" | "homemadeMain" | "unknown";
export type FoodCategory = "meat" | "fish" | "egg" | "rice" | "potato" | "grain" | "vegetable" | "dairy" | "oil" | "other";
export type FoodState = "raw" | "boiled" | "grilled" | "steamed" | "other";
export type IngredientUsage = "topping" | "mainPart" | "snack";
export type RiskLevel = "forbidden" | "caution";

export type MainFoodInput = {
  foodType: MainFoodType;
  productName: string;
  kcalPer100g: number;
  gramsPerMeal: number;
  mealsPerDay: number;
};

export type FoodNutrient = {
  id: string;
  nameJa: string;
  aliases: string[];
  category: FoodCategory;
  state: FoodState;
  per100g: Nutrients;
  source: string;
  note?: string;
};

export type IngredientInput = {
  id: string;
  foodName: string;
  matchedFoodId: string;
  state: FoodState;
  grams: number;
  usage: IngredientUsage;
};

export type DangerousFood = {
  nameJa: string;
  aliases: string[];
  riskLevel: RiskLevel;
  message: string;
  symptoms: string[];
  action: string;
};
