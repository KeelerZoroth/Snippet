/* !!! This Code has been in part copied from the SMU Bootcamp !!! */

/* This code will be changed in the future */

import { type Request, type Response } from 'express';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import dotenv from 'dotenv';

dotenv.config();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
let model: OpenAI;

if (apiKey) {
  // Initialize the OpenAI model if the API key is provided
  model = new OpenAI({ temperature: 0, openAIApiKey: apiKey, modelName: "gpt-4o-mini" });
} else {
  console.error('OPENAI_API_KEY is not configured.');
}

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  title: "Title of the code to get the over all meaning of the code",
  summary: 'A summary of the code provided that is easy to understand and under 800 characters',
});

const formatInstructions = parser.getFormatInstructions();

// Create a new prompt template for formatting prompts
const promptTemplate = new PromptTemplate({
  template: "You are a programming expert in all programming languages and will explain the code provided as thoroughly as possible while still being simple and short. If the code is non-functional, explain why in the summary and append 'NON-FUNCTIONAL_CODE' to the summary.\n{format_instructions}\n{code}",
  inputVariables: ["code"],
  partialVariables: { format_instructions: formatInstructions }
});

// Format the prompt using the prompt template with the user's question
const formatPrompt = async (code: string): Promise<string> => {
  return await promptTemplate.format({ code });
};

// Call the OpenAI API to get a response to the formatted prompt
const promptFunc = async (input: string): Promise<string> => {
  try {
    if (model) {
      return await model.invoke(input);
    }
    return "```json\n{\n    \"code\": \"No OpenAI API key provided.\",\n    \"explanation\": \"Unable to provide a response.\"\n}\n```"
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Parse the response from the model
const parseResponse = async (response: string): Promise<{ [key: string]: string }> => {
  try {
    return await parser.parse(response);
  } catch (err) {
    console.error('Error in parseResponse:', err);
    return { error: 'Failed to parse the response from the model.' };
  }
};

// Handle the POST request to ask a question
export const explainCode = async (req: Request, res: Response): Promise<void> => {
  const userCode: string = req.body.question;

  try {
    if (!userCode) {
      res.status(400).json({ question: null, response: 'Please provide code in the request body.', formattedResponse: null });
      return;
    }

    const formattedPrompt: string = await formatPrompt(userCode);
    const rawResponse: string = await promptFunc(formattedPrompt);
    const result: { [key: string]: string } = await parseResponse(rawResponse);
    res.json({ question: userCode, prompt: formattedPrompt, response: rawResponse, formattedResponse: result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
    res.status(500).json({ code: userCode, prompt: null, response: 'Internal Server Error', formattedResponse: null });
  }
};
