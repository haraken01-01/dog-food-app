import type { AgeGroup, DogProfile, MedicalStatus } from "@/types/dog";
import { ActivitySelector } from "./ActivitySelector";
import { BodyConditionSelector } from "./BodyConditionSelector";
import { FormField, inputClass } from "./FormField";

type DogProfileFormProps = {
  value: DogProfile;
  onChange: (value: DogProfile) => void;
};

export function DogProfileForm({ value, onChange }: DogProfileFormProps) {
  const weightValue = Number.isFinite(value.weightKg) && value.weightKg > 0 ? String(value.weightKg) : "";

  return (
    <section className="rounded-lg border border-leaf/20 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-ink">犬情報</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <FormField label="体重" hint="0.5〜100kg">
          <input
            className={inputClass}
            min={0.5}
            max={100}
            step={0.1}
            type="number"
            value={weightValue}
            onChange={(event) => {
              const nextValue = event.target.value;
              onChange({ ...value, weightKg: nextValue === "" ? Number.NaN : Number(nextValue) });
            }}
          />
        </FormField>
        <FormField label="年齢">
          <select className={inputClass} value={value.ageGroup} onChange={(event) => onChange({ ...value, ageGroup: event.target.value as AgeGroup })}>
            <option value="puppy">1歳未満</option>
            <option value="youngAdult">1〜2歳</option>
            <option value="adult">3〜7歳</option>
            <option value="senior">7歳以上</option>
          </select>
        </FormField>
        <FormField label="避妊・去勢手術">
          <div className="rounded-md border border-slate-300 bg-white px-3 py-3 shadow-sm">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                className="mt-1 h-4 w-4 rounded border-slate-300 text-leaf focus:ring-leaf"
                checked={value.neuteredStatus === "neutered"}
                type="checkbox"
                onChange={(event) => onChange({ ...value, neuteredStatus: event.target.checked ? "neutered" : "intact" })}
              />
              <span>
                避妊・去勢手術を受けている
                <span className="mt-1 block text-xs leading-5 text-slate-500">チェックがない場合は、カロリー計算上は手術を受けていない前提で扱います。</span>
              </span>
            </label>
          </div>
        </FormField>
        <FormField label="1日の食事回数">
          <input
            className={inputClass}
            min={1}
            step={1}
            type="number"
            value={value.mealsPerDay}
            onChange={(event) => onChange({ ...value, mealsPerDay: Number(event.target.value) })}
          />
        </FormField>
        <ActivitySelector value={value.activityLevel} onChange={(activityLevel) => onChange({ ...value, activityLevel })} />
        <BodyConditionSelector value={value.bodyCondition} onChange={(bodyCondition) => onChange({ ...value, bodyCondition })} />
        <FormField label="持病・療法食">
          <select className={inputClass} value={value.medicalStatus} onChange={(event) => onChange({ ...value, medicalStatus: event.target.value as MedicalStatus })}>
            <option value="none">なし</option>
            <option value="hasCondition">あり</option>
            <option value="unknown">不明</option>
          </select>
        </FormField>
      </div>
    </section>
  );
}
