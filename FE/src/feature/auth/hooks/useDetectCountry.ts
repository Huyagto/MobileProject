import { useEffect, useState } from "react";
import * as Localization from "expo-localization";
import { countries, Country } from "@/utils/countries";

/* fallback mặc định */
const DEFAULT_COUNTRY = countries.find(c => c.code === "VN")!;

export default function useDetectCountry() {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);

  useEffect(() => {
    const locale = Localization.getLocales()?.[0];
    const regionCode = locale?.regionCode;

    if (!regionCode) return;

    const detected = countries.find(
      (c) => c.code === regionCode
    );

    if (detected) {
      setCountry(detected);
    }
  }, []);

  return {
    country,
    setCountry, // khi user chọn thủ công
  };
}
