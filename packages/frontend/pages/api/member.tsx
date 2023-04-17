import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const sqs = new AWS.SQS();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return await createMember(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function createMember(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  console.log("DASA body", body);
  try {
    await sqs
      .sendMessage({
        // Get the queue url from the environment variable
        QueueUrl: process.env.INBOUND_QUEUE,
        MessageBody: JSON.stringify({
          first_name: body.first_name,
          last_name: body.last_name,
          country: body.country,
          wallet: body.wallet,
          email: body.email,
          amount: body.amount,
          block_number: body.block_number,
        }),
      })
      .promise();

    console.log("Message queued!");

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating member", success: false });
  }
}
