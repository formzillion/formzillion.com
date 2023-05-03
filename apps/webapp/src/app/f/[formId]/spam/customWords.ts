const honeypotValues = ["spam", "bots", "evil", "form", "bulb"];

export default async function customWords(reqBody: any) {
  for (const value of Object.values(reqBody)) {
    if (
      typeof value === "string" &&
      honeypotValues.includes(value.toLowerCase())
    ) {
      return false;
    }
  }
  return true;
}
