import type { DogProfile } from "@/types/dog";
import type { FoodCategory, FoodNutrient, IngredientInput } from "@/types/food";
import type { Nutrients } from "@/types/nutrition";
import { calculateCaPRatio } from "./nutrition";

export type WarningSeverity = "info" | "warning" | "danger";

export type AppWarning = {
  id: string;
  severity: WarningSeverity;
  title: string;
  message: string;
};

type IngredientNutrition = {
  input: IngredientInput;
  food?: FoodNutrient;
  nutrients: Nutrients;
};

export function buildWarnings(params: {
  profile: DogProfile;
  estimatedCalories: number;
  toppingCalories: number;
  ingredientNutrition: IngredientNutrition[];
  dangerousMatches: Array<{ dangerousFood: { nameJa: string; message: string; action: string } }>;
}): AppWarning[] {
  const warnings: AppWarning[] = [];

  params.dangerousMatches.forEach((match, index) => {
    warnings.push({
      id: `dangerous-${index}-${match.dangerousFood.nameJa}`,
      severity: "danger",
      title: `危険食材が含まれています：${match.dangerousFood.nameJa}`,
      message: `${match.dangerousFood.message} ${match.dangerousFood.action}`
    });
  });

  if (params.profile.ageGroup === "puppy") {
    warnings.push({
      id: "puppy",
      severity: "danger",
      title: "1歳未満は対象外です",
      message: "成長期は必要な栄養バランスが大きく異なります。獣医師に相談してください。"
    });
  }

  if (params.profile.medicalStatus === "hasCondition") {
    warnings.push({
      id: "medical",
      severity: "danger",
      title: "持病・療法食中の可能性があります",
      message: "疾患や療法食では食材や栄養素の制限が必要な場合があります。獣医師に相談してください。"
    });
  }

  const toppingRatio = getToppingRatio(params.toppingCalories, params.estimatedCalories);
  if (toppingRatio >= 20) {
    warnings.push({
      id: "topping-strong",
      severity: "danger",
      title: "トッピングが20%以上です",
      message: "総合栄養食のバランスが崩れやすくなります。日常的に続ける場合は10%以内を目安にしてください。"
    });
  } else if (toppingRatio > 10) {
    warnings.push({
      id: "topping-warning",
      severity: "warning",
      title: "トッピングが10%を超えています",
      message: "トッピング量が多めです。総合栄養食を主食にし、少量から調整してください。"
    });
  }

  const byCategory = caloriesByCategory(params.ingredientNutrition);
  const totalIngredientKcal = Math.max(params.toppingCalories, 0);
  const meatFishEggKcal = sumCategories(byCategory, ["meat", "fish", "egg"]);
  const caPRatio = calculateCaPRatio(sumNutrients(params.ingredientNutrition.map((item) => item.nutrients)));

  if (totalIngredientKcal > 0 && meatFishEggKcal / totalIngredientKcal >= 0.7 && (caPRatio === null || caPRatio < 0.8)) {
    warnings.push({
      id: "meat-centered",
      severity: "warning",
      title: "肉・魚・卵が中心の組み合わせです",
      message: "リンに対してカルシウムが少なくなりやすく、完全食として続けるには栄養バランスが不足する可能性があります。"
    });
  }

  const ricePotatoGrainKcal = sumCategories(byCategory, ["rice", "potato", "grain"]);
  if (totalIngredientKcal > 0 && ricePotatoGrainKcal / totalIngredientKcal >= 0.6) {
    warnings.push({
      id: "starch-centered",
      severity: "warning",
      title: "芋類・ごはん類が多めです",
      message: "カロリーや糖質が増えやすいため、太り気味の犬では量に注意してください。"
    });
  }

  const oilKcal = sumCategories(byCategory, ["oil"]);
  if (totalIngredientKcal > 0 && oilKcal / totalIngredientKcal >= 0.2) {
    warnings.push({
      id: "oil",
      severity: "warning",
      title: "油は少量でも高カロリーです",
      message: "与えすぎるとカロリー過多や下痢につながることがあります。"
    });
  }

  const totalWeight = params.ingredientNutrition.reduce((sum, item) => sum + item.input.grams, 0);
  const vegetableWeight = params.ingredientNutrition
    .filter((item) => item.food?.category === "vegetable")
    .reduce((sum, item) => sum + item.input.grams, 0);
  if (totalWeight > 0 && vegetableWeight / totalWeight >= 0.7) {
    warnings.push({
      id: "vegetable-heavy",
      severity: "info",
      title: "野菜が多めです",
      message: "多すぎると主食量が減ったり、便が緩くなる場合があります。細かく刻み、加熱して少量から試してください。"
    });
  }

  return warnings;
}

export function getToppingRatio(toppingCalories: number, estimatedCalories: number): number {
  if (estimatedCalories <= 0) {
    return 0;
  }
  return (toppingCalories / estimatedCalories) * 100;
}

function caloriesByCategory(items: IngredientNutrition[]): Partial<Record<FoodCategory, number>> {
  return items.reduce<Partial<Record<FoodCategory, number>>>((result, item) => {
    if (!item.food) {
      return result;
    }
    result[item.food.category] = (result[item.food.category] ?? 0) + item.nutrients.kcal;
    return result;
  }, {});
}

function sumCategories(byCategory: Partial<Record<FoodCategory, number>>, categories: FoodCategory[]) {
  return categories.reduce((sum, category) => sum + (byCategory[category] ?? 0), 0);
}

function sumNutrients(items: Nutrients[]): Nutrients {
  return items.reduce(
    (total, item) => ({
      kcal: total.kcal + item.kcal,
      proteinG: total.proteinG + item.proteinG,
      fatG: total.fatG + item.fatG,
      carbG: total.carbG + item.carbG,
      fiberG: total.fiberG + item.fiberG,
      calciumMg: total.calciumMg + item.calciumMg,
      phosphorusMg: total.phosphorusMg + item.phosphorusMg,
      sodiumMg: total.sodiumMg + item.sodiumMg,
      potassiumMg: total.potassiumMg + item.potassiumMg,
      zincMg: total.zincMg + item.zincMg,
      copperMg: total.copperMg + item.copperMg,
      iodineUg: total.iodineUg + item.iodineUg,
      vitaminDUg: total.vitaminDUg + item.vitaminDUg,
      vitaminEMg: total.vitaminEMg + item.vitaminEMg,
      epaMg: total.epaMg + item.epaMg,
      dhaMg: total.dhaMg + item.dhaMg
    }),
    {
      kcal: 0,
      proteinG: 0,
      fatG: 0,
      carbG: 0,
      fiberG: 0,
      calciumMg: 0,
      phosphorusMg: 0,
      sodiumMg: 0,
      potassiumMg: 0,
      zincMg: 0,
      copperMg: 0,
      iodineUg: 0,
      vitaminDUg: 0,
      vitaminEMg: 0,
      epaMg: 0,
      dhaMg: 0
    }
  );
}
