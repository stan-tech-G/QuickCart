import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import { syncUserCreation } from "@/config/inngest";
import { syncUserUpdate } from "@/config/inngest";
import { syncUserDeletion } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDeletion,
  ],
});