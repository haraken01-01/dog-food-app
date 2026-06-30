import type { FoodNutrient, FoodState, IngredientInput as IngredientInputType, IngredientUsage } from "@/types/food";
import { FormField, inputClass } from "./FormField";

type IngredientInputProps = {
  foods: FoodNutrient[];
  ingredients: IngredientInputType[];
  onChange: (ingredients: IngredientInputType[]) => void;
};

export function IngredientInput({ foods, ingredients, onChange }: IngredientInputProps) {
  function findFoodByName(value: string) {
    const normalized = value.trim().toLocaleLowerCase("ja-JP").replace(/\s+/g, "");

    return foods.find((food) => {
      const names = [food.nameJa, ...food.aliases].map((name) => name.trim().toLocaleLowerCase("ja-JP").replace(/\s+/g, ""));
      return names.some((name) => name === normalized);
    });
  }

  function updateIngredient(id: string, next: Partial<IngredientInputType>) {
    onChange(ingredients.map((ingredient) => (ingredient.id === id ? { ...ingredient, ...next } : ingredient)));
  }

  function addIngredient() {
    const firstFood = foods[0];
    onChange([
      ...ingredients,
      {
        id: crypto.randomUUID(),
        foodName: firstFood?.nameJa ?? "",
        matchedFoodId: firstFood?.id ?? "",
        state: firstFood?.state ?? "boiled",
        grams: 10,
        usage: "topping"
      }
    ]);
  }

  function removeIngredient(id: string) {
    onChange(ingredients.filter((ingredient) => ingredient.id !== id));
  }

  return (
    <section className="rounded-lg border border-leaf/20 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink">手作り食材・トッピング</h2>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            食材は候補から選ぶと栄養計算できます。候補外の自由入力は危険食材チェックには使いますが、栄養計算は0として扱います。
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            用途が「トッピング」「おやつ」のものだけを10%目安の判定に使います。「主食の一部」は総カロリーには入りますが、トッピング過多判定からは外します。
          </p>
        </div>
        <button className="focus-ring rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white hover:bg-ink" type="button" onClick={addIngredient}>
          追加
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="rounded-lg border border-slate-200 bg-cream p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-ink">食材 {index + 1}</h3>
              {ingredients.length > 1 ? (
                <button className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-coral hover:text-coral" type="button" onClick={() => removeIngredient(ingredient.id)}>
                  削除
                </button>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FormField label="食材" hint="候補選択または自由入力">
                <input
                  className={inputClass}
                  list={`food-options-${ingredient.id}`}
                  value={ingredient.foodName}
                  onChange={(event) => {
                    const foodName = event.target.value;
                    const food = findFoodByName(foodName);
                    updateIngredient(ingredient.id, {
                      foodName,
                      matchedFoodId: food?.id ?? "",
                      state: food?.state ?? ingredient.state
                    });
                  }}
                />
                <datalist id={`food-options-${ingredient.id}`}>
                  {foods.map((food) => (
                    <option key={food.id} value={food.nameJa} />
                  ))}
                </datalist>
              </FormField>
              <FormField label="調理方法" hint="MVPでは記録用">
                <select className={inputClass} value={ingredient.state} onChange={(event) => updateIngredient(ingredient.id, { state: event.target.value as FoodState })}>
                  <option value="boiled">ゆで</option>
                  <option value="steamed">蒸し</option>
                  <option value="grilled">焼き</option>
                  <option value="other">その他</option>
                </select>
              </FormField>
              <FormField label="量 g">
                <input
                  className={inputClass}
                  min={0}
                  step={1}
                  type="number"
                  value={ingredient.grams}
                  onChange={(event) => updateIngredient(ingredient.id, { grams: Number(event.target.value) })}
                />
              </FormField>
              <FormField label="用途" hint="10%判定に影響">
                <select className={inputClass} value={ingredient.usage} onChange={(event) => updateIngredient(ingredient.id, { usage: event.target.value as IngredientUsage })}>
                  <option value="topping">トッピング</option>
                  <option value="mainPart">主食の一部</option>
                  <option value="snack">おやつ</option>
                </select>
              </FormField>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-600">
              調理方法によって栄養値は変わりますが、現在のMVPでは候補食材に登録された成分値を使います。犬向けには安全のため、基本は加熱した食材を想定しています。
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
