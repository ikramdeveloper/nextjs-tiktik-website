import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "l3lckjbr",
  dataset: "production",
  apiVersion: "2022-07-09",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
