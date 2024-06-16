function calculateTotalExperienceForLevel(level: number): number {
  if (level === 1) {
    return 200;
  }

  const XPRequireToNextLevel = 250 * (1 + level / 10);
  return XPRequireToNextLevel;
}

export { calculateTotalExperienceForLevel };
