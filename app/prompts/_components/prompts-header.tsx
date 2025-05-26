"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreatePromptDialog } from "./create-prompt-dialog";

export const PromptsHeader = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handlePromptCreated = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Your Prompts</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your AI prompts in one place
          </p>
        </div>
        <Button 
          size="lg" 
          className="gap-2"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-5 w-5" />
          New Prompt
        </Button>
      </div>
      <CreatePromptDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onPromptCreated={handlePromptCreated}
      />
    </>
  );
}; 