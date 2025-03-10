import { signal } from "@preact/signals";

// Create the shared signal
export const urls = signal<string[]>([]);

// Initialize from localStorage
export function initializeUrls() {
  // Only run this on the client side
  if (typeof localStorage !== "undefined") {
    const storedUrls: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const url = localStorage.getItem(i.toString());
      if (url) {
        storedUrls.push(url);
      }
    }
    urls.value = storedUrls;
  }
}

// Helper functions for managing URLs
export function addUrl(url: string) {
  localStorage.setItem(urls.value.length.toString(), url);
  urls.value = [...urls.value, url]; // Create a new array to trigger updates
}

export function removeUrl(index: number) {
  const newUrls = urls.value.filter((_, i) => i !== index);
  urls.value = newUrls;
  
  // Reorganize localStorage to match the new array
  localStorage.clear();
  newUrls.forEach((url, i) => {
    localStorage.setItem(i.toString(), url);
  });
} 