// Cleans one text value. Anything that is not a string becomes "" so the
// model's "required" check rejects it. This also stops objects such as
// { "$gt": "" } from reaching a database query later.
export function sanitizeText(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
