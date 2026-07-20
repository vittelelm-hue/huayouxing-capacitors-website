import type { MetadataRoute } from "next";
import { productFamilies, siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productFamilies.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.86,
      images: [`${siteUrl}${product.image}`],
    })),
  ];
}
