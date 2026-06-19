import type { AppWarning } from "@/lib/warnings";

type WarningListProps = {
  warnings: AppWarning[];
};

const severityClass = {
  danger: "border-coral bg-orange-50 text-red-950",
  warning: "border-amber-400 bg-amber-50 text-amber-950",
  info: "border-leaf/35 bg-mint text-ink"
};

export function WarningList({ warnings }: WarningListProps) {
  if (warnings.length === 0) {
    return (
      <div className="rounded-lg border border-leaf/25 bg-mint p-4 text-sm text-ink">
        強い警告はありません。まずは2週間ほど体重・体型・便・食欲を見て調整してください。
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {warnings.map((warning) => (
        <div key={warning.id} className={`rounded-lg border p-4 ${severityClass[warning.severity]}`}>
          <h3 className="font-bold">{warning.title}</h3>
          <p className="mt-1 text-sm leading-6">{warning.message}</p>
        </div>
      ))}
    </div>
  );
}
