import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Add more detailed logging
console.log("Sanity Configuration:", {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  tokenSet: !!process.env.SANITY_API_TOKEN,
})

// Test the Sanity connection
client.fetch('*[_type == "product"][0]').then(console.log).catch(console.error)

