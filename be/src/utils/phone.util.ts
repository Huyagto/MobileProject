// utils/phone.util.ts
export function normalizePhone(phone: string): string {
  if (phone.startsWith("+84")) {
    return "+84" + phone.replace("+84", "").replace(/^0+/, "");
  }

  if (phone.startsWith("0")) {
    return "+84" + phone.replace(/^0+/, "");
  }

  return phone;
}
