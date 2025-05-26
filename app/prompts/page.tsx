import { PromptGrid } from "./_components/prompt-grid";
import { LoadingGrid } from "./_components/loading-grid";
import { getPrompts } from "@/actions/prompts-actions";
import { Suspense } from "react";
import { PromptsHeader } from "@/app/prompts/_components/prompts-header";

export const dynamic = "force-dynamic";

export default function PromptsPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <PromptsHeader />
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
