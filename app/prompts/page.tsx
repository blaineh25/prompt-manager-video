import { PromptGrid } from "./_components/prompt-grid";

export default function PromptsPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Prompts</h1>
      <PromptGrid />
    </div>
  );
} 
