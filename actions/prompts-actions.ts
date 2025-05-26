// Ensure this directive is at the very top of the file
"use server";

import { db } from "@/DB"; // Drizzle db instance
import { prompts } from "@/DB/schema/prompts-schema"; // Prompts table schema
import { devDelay } from "@/lib/dev-delay"; // Development delay helper
import { desc, eq } from "drizzle-orm"; // Drizzle operators
import { revalidatePath } from "next/cache";

/**
 * READ: Fetches all prompts, ordered by creation date descending.
 */
export async function getPrompts() {
  try {
    await devDelay(3000); // Simulate latency in development
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
export async function createPrompt(data: {
  name: string;
  description: string;
  content: string;
}) {
  try {
    const result = await db.insert(prompts).values({
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      content: data.content,
    });

    revalidatePath("/prompts");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error creating prompt:", error);
    return { success: false, error: "Failed to create prompt" };
  }
}

/**
 * UPDATE: Updates an existing prompt by its ID.
 */
export async function updatePrompt(
  id: string,
  data: {
    name: string;
    description: string;
    content: string;
  }
) {
  try {
    const result = await db
      .update(prompts)
      .set({
        name: data.name,
        description: data.description,
        content: data.content,
        updatedAt: new Date(),
      })
      .where(eq(prompts.id, id));

    revalidatePath("/prompts");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating prompt:", error);
    return { success: false, error: "Failed to update prompt" };
  }
}

/**
 * DELETE: Deletes a prompt by its ID.
 */
export async function deletePrompt(id: string) {
  try {
    const result = await db.delete(prompts).where(eq(prompts.id, id));
    revalidatePath("/prompts");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return { success: false, error: "Failed to delete prompt" };
  }
}