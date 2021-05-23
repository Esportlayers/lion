import type { NextApiRequest, NextApiResponse } from "next";

import { BASE_API_URL } from "@/modules/streamdotaAPI";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET" && req.query["code"]) {
    const response = await fetch(
      `${BASE_API_URL}/auth/twitchNew/callback?code=${req.query["code"]}`
    );

    if (response.ok) {
      const jwt = await response.text();
      return res.redirect(`/?jwt=${jwt}`);
    } else {
      return res.status(500).send("Login went wrong");
    }
  }
  return res.status(404).send({});
};
