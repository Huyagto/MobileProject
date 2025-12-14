// utils/phone.ts
export const normalizePhone = (dial: string, phone: string) => {
  const raw = phone.replace(/\D/g, "");

  // 🇻🇳 Việt Nam
  if (dial === "+84" && raw.startsWith("0")) {
    return `+84${raw.slice(1)}`;
  }

  return `${dial}${raw}`;
};
