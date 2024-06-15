export default function calculateTotalExperienceForLevel(
  level: number
): number {
  let totalExperience = 0;
  let xpForNextLevel = 200;

  for (let i = 1; i < level; i++) {
    totalExperience += xpForNextLevel;
    xpForNextLevel += 250 * (1 + i / 10);
  }

  return totalExperience;
}
