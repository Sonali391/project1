
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  // Ensure this is a standard model for text generation like gemini-1.5-flash-latest
  model: 'googleai/gemini-1.5-flash-latest', 
});
