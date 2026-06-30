"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BodyConditionGuide } from "@/components/BodyConditionGuide";
import { DogProfileForm } from "@/components/DogProfileForm";
import { IngredientInput } from "@/components/IngredientInput";
import { MainFoodForm } from "@/components/MainFoodForm";
import { ResultSummary } from "@/components/ResultSummary";
import { calculateMainFoodsCalories, calorieRange, estimateDailyCalories } from "@/lib/calorie";
import { findDangerousFoodMatches } from "@/lib/dangerousFoods";
import { addNutrients, calculateIngredientNutrition } from "@/lib/nutrition";
import { buildWarnings, type AppWarning } from "@/lib/warnings";
import dangerousFoodsJson from "@/data/dangerous_foods.json";
import foodsJson from "@/data/food_nutrients.json";
import type { DogProfile } from "@/types/dog";
import type { DangerousFood, FoodNutrient, IngredientInput as IngredientInputType, MainFoodInput } from "@/types/food";

const foods = foodsJson as FoodNutrient[];
const dangerousFoods = dangerousFoodsJson as DangerousFood[];

const initialProfile: DogProfile = {
  weightKg: 5,
  ageGroup: "adult",
  neuteredStatus: "neutered",
  mealsPerDay: 2,
  activityLevel: "normal",
  bodyCondition: "ideal",
  medicalStatus: "none"
};

const initialMainFood: MainFoodInput = {
  id: "initial-dry-food",
  foodType: "completeDry",
  productName: "",
  kcalPer100g: 350,
  gramsPerMeal: 25,
  mealsPerDay: 2
};

const initialIngredients: IngredientInputType[] = [
  {
    id: "initial-sasami",
    foodName: "鶏ささみ ゆで",
    matchedFoodId: "chicken_sasami_boiled",
    state: "boiled",
    grams: 10,
    usage: "topping"
  }
];

export default function CalculatorPage() {
  const [profile, setProfile] = useState<DogProfile>(initialProfile);
  const [mainFoods, setMainFoods] = useState<MainFoodInput[]>([initialMainFood]);
  const [ingredients, setIngredients] = useState<IngredientInputType[]>(initialIngredients);

  const result = useMemo(() => {
    const estimatedCalories = estimateDailyCalories(profile);
    const range = calorieRange(estimatedCalories);
    const mainFoodCalories = calculateMainFoodsCalories(mainFoods);
    const ingredientNutrition = ingredients.map((ingredient) => calculateIngredientNutrition(ingredient, foods));
    const allIngredientNutrients = addNutrients(ingredientNutrition.map((item) => item.nutrients));
    const toppingNutrients = addNutrients(
      ingredientNutrition.filter((item) => item.input.usage === "topping" || item.input.usage === "snack").map((item) => item.nutrients)
    );
    const ingredientCalories = allIngredientNutrients.kcal;
    const toppingCalories = toppingNutrients.kcal;
    const dangerousMatches = findDangerousFoodMatches(ingredients, dangerousFoods);
    const warnings = [
      ...buildWarnings({
        profile,
        estimatedCalories,
        toppingCalories,
        ingredientNutrition,
        dangerousMatches
      }),
      ...buildValidationWarnings(profile, mainFoods, ingredients)
    ];

    return {
      estimatedCalories,
      range,
      mainFoodCalories,
      ingredientNutrition,
      allIngredientNutrients,
      toppingCalories,
      ingredientCalories,
      totalCalories: mainFoodCalories.perDay + ingredientCalories,
      warnings
    };
  }, [profile, mainFoods, ingredients]);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link className="focus-ring text-sm font-semibold text-leaf hover:text-ink" href="/">
              トップへ戻る
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">食事量を計算する</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
              健康な成犬向けの一般的な目安です。診断、治療、療法食設計、完全手作り食の栄養保証は行いません。
            </p>
          </div>
          <Link className="focus-ring rounded-md border border-leaf/35 bg-white px-4 py-2 text-sm font-semibold text-leaf hover:bg-mint" href="/references">
            参考資料
          </Link>
        </header>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
          <div className="space-y-5">
            <DogProfileForm value={profile} onChange={(nextProfile) => {
              setProfile(nextProfile);
              setMainFoods((current) => current.map((food) => ({ ...food, mealsPerDay: nextProfile.mealsPerDay })));
            }} />
            <MainFoodForm value={mainFoods} onChange={setMainFoods} />
            <IngredientInput foods={foods} ingredients={ingredients} onChange={setIngredients} />
            <BodyConditionGuide />
          </div>

          <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <ResultSummary
              estimatedCalories={result.estimatedCalories}
              range={result.range}
              mealsPerDay={profile.mealsPerDay}
              mainFood={result.mainFoodCalories}
              ingredientCalories={result.ingredientCalories}
              toppingCalories={result.toppingCalories}
              totalCalories={result.totalCalories}
              nutrients={result.allIngredientNutrients}
              warnings={result.warnings}
            />
            <section className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-ink">免責</h2>
              <p className="mt-2">このアプリは健康な成犬向けの一般的な食事量・トッピング支援ツールです。持病、療法食、子犬、妊娠授乳期の場合は獣医師に相談してください。</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function buildValidationWarnings(profile: DogProfile, mainFoods: MainFoodInput[], ingredients: IngredientInputType[]): AppWarning[] {
  const warnings: AppWarning[] = [];

  if (profile.weightKg < 0.5 || profile.weightKg > 100) {
    warnings.push({
      id: "weight-range",
      severity: "danger",
      title: "体重の入力範囲を確認してください",
      message: "体重は0.5kg〜100kgの範囲で入力してください。"
    });
  }

  if (profile.mealsPerDay < 1 || mainFoods.some((mainFood) => mainFood.mealsPerDay < 1)) {
    warnings.push({
      id: "meals-range",
      severity: "danger",
      title: "食事回数を確認してください",
      message: "食事回数は1以上で入力してください。"
    });
  }

  mainFoods.forEach((mainFood, index) => {
    if (mainFood.kcalPer100g <= 0 || mainFood.gramsPerMeal <= 0) {
      warnings.push({
        id: `main-food-range-${mainFood.id}`,
        severity: "danger",
        title: `主食${index + 1}の入力を確認してください`,
        message: "100gあたりkcalと1食あたりgは0より大きい値を入力してください。"
      });
    }

    if (mainFood.foodType === "sideDish") {
      warnings.push({
        id: `main-food-side-dish-${mainFood.id}`,
        severity: "warning",
        title: `主食${index + 1}は総合栄養食ではない補助食です`,
        message: "一般食・副食は、それだけで栄養が完結しないことがあります。総合栄養食を主食にしているか確認してください。"
      });
    }

    if (mainFood.foodType === "homemadeMain") {
      warnings.push({
        id: `main-food-homemade-${mainFood.id}`,
        severity: "warning",
        title: `主食${index + 1}が手作り食中心です`,
        message: "このMVPは完全手作り食の栄養バランスを保証しません。長期継続する場合は獣医師または獣医栄養学の専門家に相談してください。"
      });
    }
  });

  if (mainFoods.length === 0) {
    warnings.push({
      id: "main-food-missing",
      severity: "danger",
      title: "主食フードを入力してください",
      message: "総カロリーを計算するため、少なくとも1つの主食フードを入力してください。"
    });
  }

  ingredients.forEach((ingredient, index) => {
    if (!ingredient.foodName.trim() || ingredient.grams <= 0) {
      warnings.push({
        id: `ingredient-range-${ingredient.id}`,
        severity: "danger",
        title: `食材${index + 1}の入力を確認してください`,
        message: "食材名を入力し、量は0gより大きい値にしてください。"
      });
    }
  });

  return warnings;
}
