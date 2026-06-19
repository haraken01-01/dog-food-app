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
  mainFood: { perMeal: number; perDay: number };
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
        <Metric label="主食フード" value={formatKcal(mainFood.perDay)} sub={`${formatKcal(mainFood.perMeal)} / 食`} />
        <Metric label="トッピング" value={formatKcal(toppingCalories)} sub={`${toppingRatio.toFixed(1)}%`} />
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-cream p-4">
        <h3 className="font-bold text-ink">現在の食事プラン</h3>
        <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <p>合計：<strong className="text-ink">{formatKcal(totalCalories)}</strong></p>
          <p>目安との差分：<strong className="text-ink">{formatKcal(difference)}</strong></p>
          <p>判定：<strong className="text-ink">{isInRange ? "目安範囲内です" : "目安範囲外です"}</strong></p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-3 font-bold text-ink">トッピングの主要栄養素</h3>
        <NutritionSummary nutrients={nutrients} />
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
        <h3 className="font-bold text-ink">栄養メモ</h3>
        <p className="mt-2">この組み合わせで不足しやすい栄養素の候補：カルシウム、亜鉛、ヨウ素、ビタミンD、ビタミンE。</p>
        <p className="mt-2">完全手作り食として継続する場合、食品だけで安定して補うのが難しい栄養素があります。総合栄養食を主食にするか、獣医栄養学の専門家が設計したレシピを使ってください。</p>
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
