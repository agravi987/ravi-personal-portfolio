export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function portfolioItemId(prefix: string, value: string) {
  return `${prefix}-${slugify(value) || "item"}`;
}
