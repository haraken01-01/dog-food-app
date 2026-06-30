import { formatKcal } from "@/lib/calorie";
import { getToppingRatio } from "@/lib/warnings";
import type { Nutrients } from "@/types/nutrition";
import { NutritionSummary } from "./NutritionSummary";
import { WarningList } from "./WarningList";
import type { AppWarning } from "@/lib/warnings";

type ResultSummaryProps = {
  estimatedCalories: number;
  range: { lower: number; upper: number };
  mealsPerDay: number;
  mainFood: {
    items: Array<{ id: string; productName: string; perMeal: number; perDay: number; gramsPerDay: number }>;
    perDay: number;
    gramsPerDay: number;
  };
  ingredientCalories: number;
  toppingCalories: number;
  totalCalories: number;
  nutrients: Nutrients;
  warnings: AppWarning[];
};

export function ResultSummary({
  estimatedCalories,
  range,
  mealsPerDay,
  mainFood,
  ingredientCalories,
  toppingCalories,
  totalCalories,
  nutrients,
  warnings
}: ResultSummaryProps) {
  const difference = totalCalories - estimatedCalories;
  const toppingRatio = getToppingRatio(toppingCalories, estimatedCalories);
  const isInRange = totalCalories >= range.lower && totalCalories <= range.upper;

  return (
    <section className="rounded-lg border border-leaf/20 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-ink">結果</h2>
      <div className="mt-5">
        <WarningList warnings={warnings} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="1日のカロリー目安" value={`${formatKcal(range.lower)}〜${formatKcal(range.upper)}`} />
        <Metric label="1食あたり目安" value={formatKcal(estimatedCalories / Math.max(mealsPerDay, 1))} />
        <Metric label="主食フード合計" value={formatKcal(mainFood.perDay)} sub={`${Math.round(mainFood.gramsPerDay)} g / 日`} />
        <Metric label="トッピング・おやつ" value={formatKcal(toppingCalories)} sub={`${toppingRatio.toFixed(1)}%`} />
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-cream p-4">
        <h3 className="font-bold text-ink">現在の食事プラン</h3>
        <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <p>主食：<strong className="text-ink">{formatKcal(mainFood.perDay)}</strong></p>
          <p>食材：<strong className="text-ink">{formatKcal(ingredientCalories)}</strong></p>
          <p>合計：<strong className="text-ink">{formatKcal(totalCalories)}</strong></p>
          <p>目安との差分：<strong className="text-ink">{formatKcal(difference)}</strong></p>
          <p>判定：<strong className="text-ink">{isInRange ? "目安範囲内です" : "目安範囲外です"}</strong></p>
        </div>
        <div className="mt-4 space-y-2 border-t border-slate-200 pt-3 text-sm text-slate-700">
          {mainFood.items.map((item, index) => (
            <p key={item.id}>
              主食{index + 1}{item.productName ? `（${item.productName}）` : ""}：
              <strong className="text-ink">{Math.round(item.gramsPerDay)}g / {formatKcal(item.perDay)}</strong>
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-3 font-bold text-ink">トッピングの主要栄養素</h3>
        <NutritionSummary nutrients={nutrients} />
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
        <h3 className="font-bold text-ink">栄養メモ</h3>
        <p className="mt-2">この組み合わせで不足しやすい栄養素の候補：カルシウム、亜鉛、ヨウ素、ビタミンD、ビタミンE。</p>
        <p className="mt-2">食品例としては、カルシウムは無糖ヨーグルトやカッテージチーズ、亜鉛は肉・卵・魚、ビタミンDは鮭や卵黄、ビタミンEは植物油などに含まれます。</p>
        <p className="mt-2">ただし、これは追加をすすめる量の提案ではありません。ヨウ素やビタミンD、油は過剰にも注意が必要です。完全手作り食として継続する場合は、総合栄養食を主食にするか、獣医師または獣医栄養学の専門家に相談してください。</p>
      </div>
    </section>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-cream p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-ink">{value}</p>
      {sub ? <p className="mt-1 text-xs text-slate-500">{sub}</p> : null}
    </div>
  );
}
