import OpenAI from "openai";
import { storage } from "./storage";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeNote(content: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise, well-structured summaries of research notes. Focus on key findings, main points, and actionable insights. Return the summary in markdown format."
        },
        {
          role: "user",
          content: `Please summarize the following note:\n\n${content}`
        }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    return response.choices[0].message.content || "Unable to generate summary.";
  } catch (error) {
    console.error("Error summarizing note:", error);
    throw new Error("Failed to generate summary");
  }
}

export async function recallSimilarNotes(query: string, userId: number): Promise<{ title: string; excerpt: string; id: number }[]> {
  try {
    // Get all notebooks for the user
    const notebooks = await storage.getNotebooks(userId);
    
    // Use OpenAI to find semantically similar content
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are analyzing a collection of research notes to find content related to a specific query. 
          Return a JSON array of note IDs that are most relevant to the query, ordered by relevance. 
          Only include notes that have meaningful connections to the query topic.
          Return format: {"relevant_ids": [1, 3, 5]}`
        },
        {
          role: "user",
          content: `Query: "${query}"\n\nNotes collection:\n${notebooks.map(n => 
            `ID: ${n.id}\nTitle: ${n.title}\nContent: ${n.content.substring(0, 300)}...\n---`
          ).join('\n')}`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 200,
      temperature: 0.1,
    });

    const result = JSON.parse(response.choices[0].message.content || '{"relevant_ids": []}');
    const relevantIds = result.relevant_ids || [];
    
    return notebooks
      .filter(n => relevantIds.includes(n.id))
      .slice(0, 5)
      .map(n => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt
      }));
  } catch (error) {
    console.error("Error recalling similar notes:", error);
    throw new Error("Failed to find related notes");
  }
}

export async function suggestNextSteps(content: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a research assistant that helps users identify productive next steps based on their notes. 
          Analyze the content and suggest 3-5 specific, actionable next steps that would advance their research or project. 
          Focus on concrete actions they can take. Return your suggestions in markdown format with bullet points.`
        },
        {
          role: "user",
          content: `Based on this note content, what should I work on next?\n\n${content}`
        }
      ],
      max_tokens: 400,
      temperature: 0.4,
    });

    return response.choices[0].message.content || "Unable to generate suggestions.";
  } catch (error) {
    console.error("Error suggesting next steps:", error);
    throw new Error("Failed to generate suggestions");
  }
}