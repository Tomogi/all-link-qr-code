import { createClient } from "contentful";

// Type for environment variables
interface ContentfulConfig {
  space: string;
  accessToken: string;
  environment?: string;
}

// Create the configuration
const contentfulConfig: ContentfulConfig = {
  space: Deno.env.get("CONTENTFUL_SPACE_ID") || "",
  accessToken: Deno.env.get("CONTENTFUL_ACCESS_TOKEN") || "",
  environment: Deno.env.get("CONTENTFUL_ENVIRONMENT") || "master",
};

// Create a singleton client instance
const contentfulClient = createClient({
  space: contentfulConfig.space,
  accessToken: contentfulConfig.accessToken,
  environment: contentfulConfig.environment,
});

// Generic type for Contentful entries
export interface ContentfulEntry<T> {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: T;
}

export async function getEntries<T>(contentType: string, query = {}) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: contentType,
      ...query,
    });
    return entries.items as ContentfulEntry<T>[];
  } catch (error) {
    console.error("Error fetching entries from Contentful:", error);
    throw error;
  }
}

export async function getEntry<T>(entryId: string) {
  try {
    const entry = await contentfulClient.getEntry(entryId);
    return entry as ContentfulEntry<T>;
  } catch (error) {
    console.error("Error fetching entry from Contentful:", error);
    throw error;
  }
} 