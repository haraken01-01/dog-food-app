import type { BodyCondition } from "@/types/dog";
import { FormField, inputClass } from "./FormField";

const bodyConditionOptions: Array<{ value: BodyCondition; label: string }> = [
  { value: "thin", label: "痩せ" },
  { value: "slightlyThin", label: "やや痩せ" },
  { value: "ideal", label: "理想体型" },
  { value: "slightlyOverweight", label: "やや肥満" },
  { value: "overweight", label: "肥満" }
];

type BodyConditionSelectorProps = {
  value: BodyCondition;
  onChange: (value: BodyCondition) => void;
};

export function BodyConditionSelector({ value, onChange }: BodyConditionSelectorProps) {
  return (
    <FormField label="体型チェック">
      <select className={inputClass} value={value} onChange={(event) => onChange(event.target.value as BodyCondition)}>
        {bodyConditionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
