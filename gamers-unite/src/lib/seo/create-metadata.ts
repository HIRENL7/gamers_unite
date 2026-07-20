import type { Metadata } from "next";

import { siteConfig } from "@/lib/seo/site-config";

type CreateMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const mergedKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      creator: siteConfig.twitterHandle,
    },
  };
}

export { createMetadata };
