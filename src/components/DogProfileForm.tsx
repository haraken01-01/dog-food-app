import type { AgeGroup, DogProfile, MedicalStatus, NeuteredStatus } from "@/types/dog";
import { ActivitySelector } from "./ActivitySelector";
import { BodyConditionSelector } from "./BodyConditionSelector";
import { FormField, inputClass } from "./FormField";

type DogProfileFormProps = {
  value: DogProfile;
  onChange: (value: DogProfile) => void;
};

export function DogProfileForm({ value, onChange }: DogProfileFormProps) {
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
            value={value.weightKg}
            onChange={(event) => onChange({ ...value, weightKg: Number(event.target.value) })}
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
        <FormField label="避妊・去勢">
          <select
            className={inputClass}
            value={value.neuteredStatus}
            onChange={(event) => onChange({ ...value, neuteredStatus: event.target.value as NeuteredStatus })}
          >
            <option value="neutered">済み</option>
            <option value="intact">未実施</option>
            <option value="unknown">不明</option>
          </select>
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
