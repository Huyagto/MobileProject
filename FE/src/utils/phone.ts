// src/utils/phone.ts
export const normalizePhone = (dial: string, phone: string) => {
  // dial: "84" | "+84"
  const cleanDial = dial.replace("+", "");
  let raw = phone.replace(/\D/g, "");

  // Nếu user đã nhập +84...
  if (raw.startsWith(cleanDial)) {
    return `+${raw}`;
  }

  // 🇻🇳 Việt Nam: bỏ số 0 đầu
  if (cleanDial === "84" && raw.startsWith("0")) {
    raw = raw.slice(1);
  }

  return `+${cleanDial}${raw}`;
};
