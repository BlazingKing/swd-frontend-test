export const CITIZEN_ID_LENGTHS = [1, 4, 5, 2, 1] as const;

export const combineCitizenId = (parts: Record<string, string>): string =>
  CITIZEN_ID_LENGTHS.map((_, i) => parts[`citizenIdPart${i}`] ?? "").join("-");

export const isValidMobile = (value: string): boolean => /^\d{8,10}$/.test(value);
