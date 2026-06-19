import type { FoodNutrient, FoodState, IngredientInput as IngredientInputType, IngredientUsage } from "@/types/food";
import { FormField, inputClass } from "./FormField";

type IngredientInputProps = {
  foods: FoodNutrient[];
  ingredients: IngredientInputType[];
  onChange: (ingredients: IngredientInputType[]) => void;
};

export function IngredientInput({ foods, ingredients, onChange }: IngredientInputProps) {
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
        <h2 className="text-xl font-bold text-ink">手作り食材・トッピング</h2>
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
              <FormField label="候補食材">
                <select
                  className={inputClass}
                  value={ingredient.matchedFoodId}
                  onChange={(event) => {
                    const food = foods.find((item) => item.id === event.target.value);
                    updateIngredient(ingredient.id, {
                      matchedFoodId: event.target.value,
                      foodName: food?.nameJa ?? ingredient.foodName,
                      state: food?.state ?? ingredient.state
                    });
                  }}
                >
                  <option value="">自由入力</option>
                  {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.nameJa}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="食材名">
                <input
                  className={inputClass}
                  value={ingredient.foodName}
                  onChange={(event) => updateIngredient(ingredient.id, { foodName: event.target.value, matchedFoodId: "" })}
                />
              </FormField>
              <FormField label="状態">
                <select className={inputClass} value={ingredient.state} onChange={(event) => updateIngredient(ingredient.id, { state: event.target.value as FoodState })}>
                  <option value="raw">生</option>
                  <option value="boiled">ゆで</option>
                  <option value="grilled">焼き</option>
                  <option value="steamed">蒸し</option>
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
              <FormField label="用途">
                <select className={inputClass} value={ingredient.usage} onChange={(event) => updateIngredient(ingredient.id, { usage: event.target.value as IngredientUsage })}>
                  <option value="topping">トッピング</option>
                  <option value="mainPart">主食の一部</option>
                  <option value="snack">おやつ</option>
                </select>
              </FormField>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
