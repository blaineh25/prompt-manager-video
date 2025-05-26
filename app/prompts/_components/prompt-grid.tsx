"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditPromptDialog } from "./edit-prompt-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePrompt } from "@/actions/prompts-actions";

// Define the type for our prompt data
type Prompt = {
  id: string;
  name: string;
  description: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

interface PromptGridProps {
  prompts: Prompt[];
}

export const PromptGrid = ({ prompts }: PromptGridProps) => {
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [deletingPrompt, setDeletingPrompt] = useState<Prompt | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deletingPrompt) return;
    
    setIsDeleting(true);
    try {
      await deletePrompt(deletingPrompt.id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete prompt:", error);
    } finally {
      setIsDeleting(false);
      setDeletingPrompt(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <Card 
          key={prompt.id} 
          className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="space-y-1">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl font-semibold tracking-tight">
                {prompt.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity relative z-10"
                  onClick={() => setEditingPrompt(prompt)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity relative z-10 text-destructive hover:text-destructive"
                  onClick={() => setDeletingPrompt(prompt)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="text-xs">
                  {formatDistanceToNow(new Date(prompt.updatedAt), { addSuffix: true })}
                </Badge>
              </div>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              {prompt.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {prompt.content}
            </p>
          </CardContent>
        </Card>
      ))}

      {editingPrompt && (
        <EditPromptDialog
          open={true}
          onOpenChange={(open) => {
            if (!open) setEditingPrompt(null);
          }}
          onPromptUpdated={() => {
            setEditingPrompt(null);
            window.location.reload();
          }}
          prompt={editingPrompt}
        />
      )}

      <AlertDialog open={!!deletingPrompt} onOpenChange={(open) => !open && setDeletingPrompt(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the prompt
              {deletingPrompt && ` "${deletingPrompt.name}"`}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}; 