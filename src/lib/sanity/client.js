import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  apiVersion: "2021-04-28",
  token: process.env.SANITY_WRITE_KEY,
  useCdn: false,
};

const client = sanityClient(config);

export default client;
