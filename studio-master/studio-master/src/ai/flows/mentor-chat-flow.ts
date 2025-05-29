
'use server';
/**
 * @fileOverview A specialized AI chatbot flow for Wisdom Bridge,
 * focused ONLY on answering questions about the Python programming language.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentorChatInputSchema = z.object({
  query: z.string().describe("The user's query or message to the chatbot."),
});
export type MentorChatInput = z.infer<typeof MentorChatInputSchema>;

const MentorChatOutputSchema = z.object({
  reply: z.string().describe("The chatbot's response to the user's query."),
});
export type MentorChatOutput = z.infer<typeof MentorChatOutputSchema>;

// Wrapper function that is exported and called by the client
export async function mentorChat(input: MentorChatInput): Promise<MentorChatOutput> {
  let safeQuery = "Default query (input was problematic)";
  try {
    safeQuery = input && typeof input.query === 'string' ? input.query : "Hello (input query was not a string)";
  } catch (e) {
    console.error("[mentorChat function - Input Processing] Error accessing input.query:", e instanceof Error ? e.message : String(e));
  }
  console.log('[mentorChat function] Entry. Input query:', safeQuery);

  try {
    const result = await mentorChatFlow({ query: safeQuery });
    let resultString = 'Could not stringify result';
    try {
      resultString = JSON.stringify(result);
    } catch (e) {
      console.error('[mentorChat function - Result Stringify] Error stringifying result:', e instanceof Error ? e.message : String(e));
    }
    console.log('[mentorChat function] Exit. Result:', resultString.substring(0, 200)); 
    return result;
  } catch (flowError: any) {
      console.error('[mentorChat function] CRITICAL ERROR calling mentorChatFlow for query:', safeQuery);
      console.error('[mentorChat function] Flow Error Name:', flowError?.name);
      console.error('[mentorChat function] Flow Error Message:', String(flowError?.message || 'No message').substring(0,300));
      console.error('[mentorChat function] Flow Error Stack (partial):', String(flowError?.stack || 'No stack').substring(0,400));
      const criticalErrorReply = "A critical system error occurred while processing your request. Please contact support.";
      console.log('[mentorChat function] Returning critical error reply:', criticalErrorReply);
      return { reply: criticalErrorReply };
  }
}


const mentorChatFlow = ai.defineFlow(
  {
    name: 'mentorChatFlowPythonSpecialist', // Renamed to reflect specialization
    inputSchema: MentorChatInputSchema,
    outputSchema: MentorChatOutputSchema,
  },
  async (flowInput) => {
    let currentQuery: string;

    if (flowInput && typeof flowInput.query === 'string' && flowInput.query.trim() !== '') {
      currentQuery = flowInput.query;
      console.log('[mentorChatFlow - Python Specialist] Received valid query:', currentQuery);
    } else {
      const rawInput = typeof flowInput === 'object' ? JSON.stringify(flowInput).substring(0,100) : String(flowInput).substring(0,100);
      console.warn('[mentorChatFlow - Python Specialist] Invalid or empty query in flowInput. Using a default query. Input was:', rawInput);
      // For a specialized bot, even a default query might be out of scope.
      // It might be better to let the LLM decide based on the rules if this is Python-related.
      currentQuery = "Is this Python related?"; 
    }
    
    console.log('[mentorChatFlow - Python Specialist] Attempting direct ai.generate() with query:', currentQuery);

    const pythonSpecialistPrompt = `You are a specialized AI assistant for the Wisdom Bridge platform. Your ONLY function is to answer questions about the Python programming language.

If the user's query is clearly about the Python programming language (e.g., "how to define a function in python?", "what are python lists?", "explain python decorators"), answer it comprehensively and helpfully.
If the user's query is NOT about the Python programming language (e.g., "hello", "what is Java?", "tell me a joke", "who are you?", "what is Wisdom Bridge?"), you MUST respond with the exact phrase: "Sorry, I can only discuss topics related to the Python programming language."
Do not deviate from this instruction. Do not engage in small talk or answer questions about yourself or other topics if they are not Python-related.

User query: ${currentQuery}`;

    try {
      const response = await ai.generate({
        prompt: pythonSpecialistPrompt,
        model: 'googleai/gemini-1.5-flash-latest',
        config: {
          safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE'},
          ],
        },
      });
      
      const aiTextReply = response.text;
      let rawResponseString = 'Could not stringify raw AI response';
      try {
        rawResponseString = JSON.stringify(response).substring(0,500);
      } catch {/* ignore */}
      console.log('[mentorChatFlow - Python Specialist] Raw response from ai.generate():', rawResponseString);
      console.log('[mentorChatFlow - Python Specialist] Extracted text:', String(aiTextReply).substring(0,100) + "...");

      if (aiTextReply && typeof aiTextReply === 'string' && aiTextReply.trim().length > 0) {
        console.log('[mentorChatFlow - Python Specialist] Successfully received AI text reply:', aiTextReply.substring(0,100) + "...");
        return { reply: aiTextReply };
      } else {
        const fallbackMessage = "I'm sorry, I couldn't generate a response for that. I can only discuss Python topics.";
        console.warn('[mentorChatFlow - Python Specialist] ai.generate() did not return a valid text reply or reply was empty. aiTextReply was:', String(aiTextReply).substring(0,200));
        console.log('[mentorChatFlow - Python Specialist] Returning fallback (invalid AI reply):', fallbackMessage);
        return { reply: fallbackMessage };
      }

    } catch (e: unknown) {
      let errorName = "UnknownErrorType";
      let errorMessage = "An unknown error occurred during direct ai.generate() execution.";
      let errorStack = "No stack available.";
      let genkitDetails = "No Genkit details available.";

      if (e instanceof Error) {
        errorName = e.name;
        errorMessage = String(e.message || 'No message').substring(0,300);
        errorStack = String(e.stack || 'No stack').substring(0,400);
      } else {
        errorMessage = `Non-Error Exception: ${String(e).substring(0,100)}`;
      }
      
      // @ts-ignore - attempt to log Genkit specific details if they exist
      if (e && typeof e === 'object' && 'details' in e) {
        try { // @ts-ignore
          genkitDetails = JSON.stringify(e.details).substring(0,300);
        } catch { genkitDetails = 'Could not stringify e.details'; }
      }
      
      console.error(`[mentorChatFlow - Python Specialist] CRITICAL ERROR for query: "${currentQuery}". Name: ${errorName}, Message: ${errorMessage}`);
      console.error(`[mentorChatFlow - Python Specialist] GenkitError Details: ${genkitDetails}`);
      console.error('[mentorChatFlow - Python Specialist] Error Stack (partial):', errorStack);
      
      const fallbackMessage = "An unexpected error occurred. Please try again later. I can only assist with Python-related queries.";
      console.log('[mentorChatFlow - Python Specialist] Returning fallback (critical error):', fallbackMessage);
      return { reply: fallbackMessage };
    }
  }
);
