export type AgeGroup = "puppy" | "youngAdult" | "adult" | "senior";
export type NeuteredStatus = "neutered" | "intact" | "unknown";
export type ActivityLevel = "inactive" | "low" | "normal" | "active" | "veryActive";
export type BodyCondition = "thin" | "slightlyThin" | "ideal" | "slightlyOverweight" | "overweight";
export type MedicalStatus = "none" | "hasCondition" | "unknown";

export type DogProfile = {
  weightKg: number;
  ageGroup: AgeGroup;
  neuteredStatus: NeuteredStatus;
  mealsPerDay: number;
  activityLevel: ActivityLevel;
  bodyCondition: BodyCondition;
  medicalStatus: MedicalStatus;
};
