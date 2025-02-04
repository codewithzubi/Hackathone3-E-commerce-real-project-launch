import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, 
  apiVersion: "2023-05-03", // Ensure the API version is correct
  token: process.env.SANITY_API_TOKEN, // Ensure the token is included
  useCdn: false, // Set to false if you need fresh data
});
