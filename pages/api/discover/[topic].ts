import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../../utils/client";
import { topicPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { topic }: any = req.query;

    const data = await client.fetch(topicPostsQuery(topic));

    res.status(200).send(data);
  }
}
