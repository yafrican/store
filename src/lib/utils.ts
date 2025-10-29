// lib/utils.ts

// existing utils...
export function formatPhone(phone: string) {
  return phone.replace(/[\s-]/g, "");
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

// CN utility for combining classes
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
