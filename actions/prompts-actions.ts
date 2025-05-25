// Ensure this directive is at the very top of the file
"use server";

import { db } from "@/DB"; // Drizzle db instance
import { prompts } from "@/DB/schema/prompts-schema"; // Prompts table schema
import { devDelay } from "@/lib/dev-delay"; // Development delay helper
import { desc, eq } from "drizzle-orm"; // Drizzle operators

/**
 * READ: Fetches all prompts, ordered by creation date descending.
 */
export async function getPrompts() {
  try {
    await devDelay(); // Simulate latency in development
    console.log("Server Action: Fetching prompts...");
    const allPrompts = await db.select().from(prompts).orderBy(desc(prompts.createdAt));
    console.log(`Server Action: Fetched ${allPrompts.length} prompts.`);
    return allPrompts;
  } catch (error) {
    console.error("Server Action Error (getPrompts):", error);
    throw new Error("Failed to fetch prompts."); // Rethrow a generic error
  }
}

/**
 * CREATE: Creates a new prompt.
 */
export async function createPrompt({ name, description, content }: { name: string; description: string; content: string }) {
  try {
    await devDelay();
    console.log("Server Action: Creating prompt...");
    // Insert the new prompt and return the inserted record
    const [newPrompt] = await db.insert(prompts).values({ 
      id: crypto.randomUUID(),
      name, 
      description, 
      content 
    }).returning();
    console.log("Server Action: Prompt created:", newPrompt);
    return newPrompt;
  } catch (error) {
    console.error("Server Action Error (createPrompt):", error);
    throw new Error("Failed to create prompt.");
  }
}

/**
 * UPDATE: Updates an existing prompt by its ID.
 */
export async function updatePrompt({ id, name, description, content }: { id: string; name: string; description: string; content: string }) {
  try {
    await devDelay();
    console.log(`Server Action: Updating prompt ${id}...`);
    // Update the prompt matching the ID and return the updated record
    const [updatedPrompt] = await db
      .update(prompts)
      .set({ name, description, content, updatedAt: new Date() }) // Also update updated_at
      .where(eq(prompts.id, id)) // Use eq() for equality check
      .returning();

    if (!updatedPrompt) {
      throw new Error("Prompt not found for update.");
    }
    console.log("Server Action: Prompt updated:", updatedPrompt);
    return updatedPrompt;
  } catch (error) {
    console.error("Server Action Error (updatePrompt):", error);
    // Rethrow specific errors or a generic one
     if (error instanceof Error && error.message.includes("Prompt not found")) {
       throw error;
    }
    throw new Error("Failed to update prompt.");
  }
}

/**
 * DELETE: Deletes a prompt by its ID.
 */
export async function deletePrompt(id: string) {
  try {
    await devDelay();
    console.log(`Server Action: Deleting prompt ${id}...`);
    // Delete the prompt matching the ID and return the deleted record
    const [deletedPrompt] = await db.delete(prompts).where(eq(prompts.id, id)).returning();

    if (!deletedPrompt) {
      throw new Error("Prompt not found for deletion.");
    }
    console.log("Server Action: Prompt deleted:", deletedPrompt);
    return deletedPrompt;
  } catch (error) {
    console.error("Server Action Error (deletePrompt):", error);
    if (error instanceof Error && error.message.includes("Prompt not found")) {
       throw error;
    }
    throw new Error("Failed to delete prompt.");
  }
}