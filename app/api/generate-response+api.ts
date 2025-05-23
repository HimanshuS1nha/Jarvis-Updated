import { z, ZodError } from "zod";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const validator = z.object({
  input: z
    .string({ required_error: "User input is required" })
    .trim()
    .min(1, { message: "User input is required" }),
  messages: z.array(
    z.object({
      content: z.string(),
      id: z.number(),
      by: z.enum(["model", "user"]),
    })
  ),
  image: z.string().optional(),
  links: z.array(z.string()),
});

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { input, messages, image, links } = await validator.parseAsync(data);

    let updatedInput = input;

    if (links.length > 0) {
      updatedInput += ` You can also use these API URLs if needed to answer the user's query. Links (separated by and): ${links.join(
        " and "
      )}.`;
    }

    const result = await model
      .startChat({
        history: messages.map((message) => ({
          role: message.by,
          parts: [
            {
              text: message.content,
            },
          ],
        })),
      })
      .sendMessage(
        image
          ? [
              updatedInput,
              { inlineData: { data: image, mimeType: "image/png" } },
            ]
          : updatedInput
      );

    return Response.json({ response: result.response.text() }, { status: 200 });
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
