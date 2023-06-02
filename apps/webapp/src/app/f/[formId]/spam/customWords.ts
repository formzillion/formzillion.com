export default async function customWords(reqBody: any, honeypotValues: any) {
  for (const value of Object.values(reqBody)) {
    if (
      typeof value === "string" &&
      honeypotValues.includes(value?.toLowerCase())
    ) {
      return false;
    }
  }
  return true;
}
