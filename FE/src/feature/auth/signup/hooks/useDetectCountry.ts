// src/features/auth/signup/hooks/useDetectCountry.ts
import { useEffect, useState } from "react";
import * as Localization from "expo-localization";
import * as Location from "expo-location";
import { countries, Country } from "@/utils/countries";

export default function useDetectCountry() {
  const [country, setCountry] = useState<Country>(countries[0]);

  useEffect(() => {
    const region = Localization.getLocales()[0].regionCode;
    if (region) {
      const found = countries.find((c) => c.code === region);
      if (found) setCountry(found);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        const pos = await Location.getCurrentPositionAsync({});
        const geo = await Location.reverseGeocodeAsync({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        const iso = geo[0]?.isoCountryCode?.toUpperCase();
        const found = countries.find((c) => c.code === iso);
        if (found) setCountry(found);
      } catch {
        // ignore
      }
    })();
  }, []);

  return { country, setCountry };
}
