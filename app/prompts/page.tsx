import { PromptGrid } from "./_components/prompt-grid";
import { LoadingGrid } from "./_components/loading-grid";
import { getPrompts } from "@/actions/prompts-actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default function PromptsPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Your Prompts</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your AI prompts in one place
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          New Prompt
        </Button>
      </div>
      <Suspense fallback={<LoadingGrid />}>
        <PromptGridWrapper />
      </Suspense>
    </div>
  );
}

async function PromptGridWrapper() {
  const prompts = await getPrompts();
  return <PromptGrid prompts={prompts} />;
} 
