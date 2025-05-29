
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-image.ts';
import '@/ai/flows/mentor-chat-flow.ts';
import '@/ai/flows/recommend-mentors-flow.ts'; // Add the new recommendation flow
