import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if ((req.method = "Post")) {
    const user = req.body;

    client
      .createIfNotExists(user)
      .then(() => res.status(201).send("Login success"));
  }
}
