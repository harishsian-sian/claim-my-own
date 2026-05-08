export const CATEGORY_COLLECTION_TO_LEGACY_HANDLE: Record<string, string> = {
  "whey-protein": "protein-powder",
  "pre-workouts": "pre-workout",
  bcaa: "amino-acids-bcaa",
  "vitamins-and-mineral": "vitamins-minerals",
  "weight-management": "weight-loss",
  "weight-gainer": "mass-gainers",
  "meal-replacement": "meal-replacements",
  "hydration-electrolytes-supplement": "hydration-electrolytes",
  "carbohydrate-powder": "carbohydrates",
  "gut-health-support": "gut-health",
  "sleep-formulas": "sleep-recovery",
};

export const LEGACY_CATEGORY_TO_COLLECTION_HANDLE: Record<string, string> = {
  "protein-powder": "whey-protein",
  "whey-protein": "whey-protein",
  "pre-workout": "pre-workouts",
  "pre-workouts": "pre-workouts",
  "amino-acids-bcaa": "bcaa",
  bcaas: "bcaa",
  bcaa: "bcaa",
  "vitamins-minerals": "vitamins-and-mineral",
  "vitamins-and-mineral": "vitamins-and-mineral",
  "weight-loss": "weight-management",
  "fat-burners": "weight-management",
  "weight-management": "weight-management",
  "mass-gainers": "weight-gainer",
  "weight-gainer": "weight-gainer",
  "meal-replacements": "meal-replacement",
  "meal-replacement": "meal-replacement",
  "hydration-electrolytes": "hydration-electrolytes-supplement",
  electrolytes: "hydration-electrolytes-supplement",
  "carbohydrates": "carbohydrate-powder",
  "carbohydrate-powder": "carbohydrate-powder",
  "gut-health": "gut-health-support",
  "gut-health-support": "gut-health-support",
  "sleep-recovery": "sleep-formulas",
  "sleep-formulas": "sleep-formulas",
};

export function getLegacyCategoryHandle(collectionHandle: string) {
  return CATEGORY_COLLECTION_TO_LEGACY_HANDLE[collectionHandle] ?? collectionHandle;
}

export function resolveLegacyCategoryHandle(categoryHandle: string) {
  return LEGACY_CATEGORY_TO_COLLECTION_HANDLE[categoryHandle] ?? categoryHandle;
}