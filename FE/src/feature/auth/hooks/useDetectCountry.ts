// src/feature/auth/hooks/useDetectCountry.ts
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Country, getCountryByCode } from "@/utils/countries";

const DEFAULT_COUNTRY = getCountryByCode("VN")!;

export default function useDetectCountry() {
  const [country, setCountry] =
    useState<Country>(DEFAULT_COUNTRY);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detect();
  }, []);

  const detect = async () => {
    try {
      // 1️⃣ Xin quyền GPS
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLoading(false);
        return;
      }

      // 2️⃣ Lấy toạ độ
      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

      // 3️⃣ Reverse geocode → ISO country code
      const geo =
        await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

      const isoCode =
        geo[0]?.isoCountryCode ?? undefined;

      // 4️⃣ Map sang country list
      const detected =
        getCountryByCode(isoCode);

      if (detected) {
        setCountry(detected);
      }
    } catch (e) {
      console.log("Detect country error:", e);
    } finally {
      setLoading(false);
    }
  };

  return {
    country,
    setCountry,
    loading,
  };
}
