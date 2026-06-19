import { formatKcal } from "@/lib/calorie";
import { calculateCaPRatio } from "@/lib/nutrition";
import type { Nutrients } from "@/types/nutrition";

type NutritionSummaryProps = {
  nutrients: Nutrients;
};

function formatGram(value: number) {
  return `${value.toFixed(value < 10 ? 1 : 0)} g`;
}

function formatMg(value: number) {
  return `${value.toFixed(value < 10 ? 1 : 0)} mg`;
}

export function NutritionSummary({ nutrients }: NutritionSummaryProps) {
  const caPRatio = calculateCaPRatio(nutrients);
  const rows = [
    ["カロリー", formatKcal(nutrients.kcal)],
    ["タンパク質", formatGram(nutrients.proteinG)],
    ["脂質", formatGram(nutrients.fatG)],
    ["炭水化物", formatGram(nutrients.carbG)],
    ["カルシウム", formatMg(nutrients.calciumMg)],
    ["リン", formatMg(nutrients.phosphorusMg)],
    ["Ca:P比", caPRatio === null ? "算出不可" : `${caPRatio.toFixed(2)} : 1`]
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-200 last:border-0">
              <th className="w-1/2 bg-cream px-4 py-3 font-semibold text-ink">{label}</th>
              <td className="px-4 py-3 text-slate-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
