import { suportedBlockchains } from "@/config/blockchains";
import { routeNames } from "@/config/routes";
import { i18n } from "@/i18n-config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_BASE_URL!;
  const pagesWithTranslation = [
    routeNames.rewards,
    routeNames.aggregator,
    routeNames.defi,
    routeNames.farm,
    routeNames.dust,
    routeNames.play,
  ];
  const locales = i18n.locales;
  const pathWithLocaleAndBlockchain = pagesWithTranslation.flatMap((page) => {
    return suportedBlockchains.flatMap((blockchain) => {
      return locales.map((locale) => {
        return `/${locale}/${blockchain}${page}`;
      });
    });
  });

  const pathWithLocale = locales.map((locale) => {
    return `/${locale}`;
  });

  const pathWithNoLocale = [routeNames.about, routeNames.docs];

  const allPath = [
    ...pathWithLocaleAndBlockchain,
    ...pathWithLocale,
    ...pathWithNoLocale,
  ];

  const sitemap = allPath.map((path) => {
    return {
      url: `${url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as any,
    };
  });

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    ...sitemap,
  ];
}
