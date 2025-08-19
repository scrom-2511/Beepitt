import OpenAI from "openai";
import dotenv from "dotenv"
import { ErrMsg, ErrMsgObj } from "../interfaces/ErrMsg.Interface";
dotenv.config()

const token = process.env.OPENAI_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export const aiRecommendationUtil = async(errMsgObj: ErrMsgObj) => {

  try {
    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const prompt = `Given the following error information, analyze the cause of the error and suggest a possible solution. Respond strictly in the following JSON format:
[{ key: "THE CAUSE", value: "<Explanation of the root cause in depth(must be plain text with no nested JSON or code snippets that look like object syntax)>"}, 
{key: "THE SOLUTION", value: "<Suggested fix or approach to resolve the error in depth(must be plain text with no nested JSON or code snippets that look like object syntax)>"}]

INPUT:
ERR NAME:
${errMsgObj.errName}

ERROR MESSAGE:
${errMsgObj.errMsg}

ERROR STACK:
${errMsgObj.errStack}`

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        { role: "user", content: prompt }
      ],
      temperature: 0,
      top_p: 1,
      model: model
    });
    console.log(response.choices[0].message.content)
    return response.choices[0].message.content
  } catch (error) {
    console.log("There was an err", error)
    return null;
  }
}