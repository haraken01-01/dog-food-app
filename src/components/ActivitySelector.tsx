import type { ActivityLevel } from "@/types/dog";
import { FormField, inputClass } from "./FormField";

const activityOptions: Array<{ value: ActivityLevel; label: string }> = [
  { value: "inactive", label: "活動的ではない" },
  { value: "low", label: "あまり活動的ではない" },
  { value: "normal", label: "普通" },
  { value: "active", label: "活発" },
  { value: "veryActive", label: "とても活発" }
];

type ActivitySelectorProps = {
  value: ActivityLevel;
  onChange: (value: ActivityLevel) => void;
};

export function ActivitySelector({ value, onChange }: ActivitySelectorProps) {
  return (
    <FormField label="活動量">
      <select className={inputClass} value={value} onChange={(event) => onChange(event.target.value as ActivityLevel)}>
        {activityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
