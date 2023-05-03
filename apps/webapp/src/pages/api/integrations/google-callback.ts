import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "./slack-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query) {
    const query = req.query;
    const { state, code } = query;

    /*await dbConnect();

    const accessParams = (await getAccessToken(code)) || {};

    await Token.create({
      provider: "google",
      userId: state,
      params: {
        ...query,
        ...accessParams,
      },
    });*/

    /*await App.create(
      {
        provider: "google",
        userId: state,
        params: query,
      },
      {
        upsert: true,
      }
    );*/
  }

  res.send("<script>window.close();</script>");
}
