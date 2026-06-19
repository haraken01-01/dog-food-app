import type { MainFoodInput, MainFoodType } from "@/types/food";
import { FormField, inputClass } from "./FormField";

type MainFoodFormProps = {
  value: MainFoodInput;
  onChange: (value: MainFoodInput) => void;
};

export function MainFoodForm({ value, onChange }: MainFoodFormProps) {
  return (
    <section className="rounded-lg border border-leaf/20 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-ink">主食フード</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <FormField label="主食フードの種類">
          <select className={inputClass} value={value.foodType} onChange={(event) => onChange({ ...value, foodType: event.target.value as MainFoodType })}>
            <option value="completeDry">総合栄養食ドライ</option>
            <option value="completeWet">総合栄養食ウェット</option>
            <option value="sideDish">一般食・副食</option>
            <option value="homemadeMain">手作り食中心</option>
            <option value="unknown">わからない</option>
          </select>
        </FormField>
        <FormField label="商品名" hint="任意">
          <input className={inputClass} value={value.productName} onChange={(event) => onChange({ ...value, productName: event.target.value })} />
        </FormField>
        <FormField label="100gあたりkcal">
          <input
            className={inputClass}
            min={1}
            step={1}
            type="number"
            value={value.kcalPer100g}
            onChange={(event) => onChange({ ...value, kcalPer100g: Number(event.target.value) })}
          />
        </FormField>
        <FormField label="1食あたりg">
          <input
            className={inputClass}
            min={1}
            step={1}
            type="number"
            value={value.gramsPerMeal}
            onChange={(event) => onChange({ ...value, gramsPerMeal: Number(event.target.value) })}
          />
        </FormField>
        <FormField label="1日何食">
          <input
            className={inputClass}
            min={1}
            step={1}
            type="number"
            value={value.mealsPerDay}
            onChange={(event) => onChange({ ...value, mealsPerDay: Number(event.target.value) })}
          />
        </FormField>
      </div>
    </section>
  );
}
