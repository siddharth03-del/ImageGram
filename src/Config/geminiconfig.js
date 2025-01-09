import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./server_config.js";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
export const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

