import { z, ZodError } from "zod";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const validator = z.object({
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(1, { message: "Message is required" }),
});

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { message } = await validator.parseAsync(data);

    const result = await model.generateContent(
      `Give me a title for the thread that starts with the following message: ${message}. Tthe title should ideally be atmost 3 to 4 words. Give me only a single title that too as a string purely. Do not include any formatting whatsoever.`
    );

    const response = result.response
      .text()
      .replaceAll('"', "")
      .replaceAll("\n", "");

    return Response.json({ response }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.errors[0].message }, { status: 422 });
    } else {
      return Response.json(
        { error: "Some error occured. Please try again later!" },
        { status: 500 }
      );
    }
  }
};
