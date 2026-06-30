import type { MainFoodInput, MainFoodType } from "@/types/food";
import { FormField, inputClass } from "./FormField";

type MainFoodFormProps = {
  value: MainFoodInput[];
  onChange: (value: MainFoodInput[]) => void;
};

export function MainFoodForm({ value, onChange }: MainFoodFormProps) {
  function updateFood(id: string, next: Partial<MainFoodInput>) {
    onChange(value.map((food) => (food.id === id ? { ...food, ...next } : food)));
  }

  function addFood() {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        foodType: "completeWet",
        productName: "",
        kcalPer100g: 120,
        gramsPerMeal: 30,
        mealsPerDay: 2
      }
    ]);
  }

  function removeFood(id: string) {
    onChange(value.filter((food) => food.id !== id));
  }

  return (
    <section className="rounded-lg border border-leaf/20 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink">主食フード</h2>
          <p className="mt-1 text-xs leading-5 text-slate-600">ドライとウェット・フレッシュ系を併用している場合は、別々に追加してください。</p>
        </div>
        <button className="focus-ring rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white hover:bg-ink" type="button" onClick={addFood}>
          主食を追加
        </button>
      </div>
      <div className="mt-5 space-y-4">
        {value.map((food, index) => (
          <div key={food.id} className="rounded-lg border border-slate-200 bg-cream p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-ink">主食 {index + 1}</h3>
              {value.length > 1 ? (
                <button className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-coral hover:text-coral" type="button" onClick={() => removeFood(food.id)}>
                  削除
                </button>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="主食フードの種類">
                <select className={inputClass} value={food.foodType} onChange={(event) => updateFood(food.id, { foodType: event.target.value as MainFoodType })}>
                  <option value="completeDry">総合栄養食ドライ</option>
                  <option value="completeWet">総合栄養食ウェット・フレッシュ系</option>
                  <option value="sideDish">総合栄養食ではない補助食（一般食・副食）</option>
                  <option value="homemadeMain">手作り食中心</option>
                </select>
              </FormField>
              <FormField label="商品名" hint="任意">
                <input className={inputClass} value={food.productName} onChange={(event) => updateFood(food.id, { productName: event.target.value })} />
              </FormField>
              <FormField label="100gあたりkcal">
                <input
                  className={inputClass}
                  min={1}
                  step={1}
                  type="number"
                  value={food.kcalPer100g}
                  onChange={(event) => updateFood(food.id, { kcalPer100g: Number(event.target.value) })}
                />
              </FormField>
              <FormField label="1食あたりg">
                <input
                  className={inputClass}
                  min={1}
                  step={1}
                  type="number"
                  value={food.gramsPerMeal}
                  onChange={(event) => updateFood(food.id, { gramsPerMeal: Number(event.target.value) })}
                />
              </FormField>
              <FormField label="1日何食">
                <input
                  className={inputClass}
                  min={1}
                  step={1}
                  type="number"
                  value={food.mealsPerDay}
                  onChange={(event) => updateFood(food.id, { mealsPerDay: Number(event.target.value) })}
                />
              </FormField>
            </div>
            {food.foodType === "completeWet" ? (
              <p className="mt-3 text-xs leading-5 text-slate-600">ココグルメなどのフレッシュフードは、パッケージ上で総合栄養食ならここに入力してください。</p>
            ) : null}
            {food.foodType === "sideDish" ? (
              <p className="mt-3 text-xs leading-5 text-slate-600">一般食・副食は、主食だけで栄養が完結しない補助的なフードを指します。総合栄養食と同じ扱いにはしません。</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
