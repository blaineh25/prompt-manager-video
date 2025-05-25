import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

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

export function PromptGrid({ prompts }: PromptGridProps) {
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
              <Badge variant="secondary" className="text-xs">
                {formatDistanceToNow(new Date(prompt.updatedAt), { addSuffix: true })}
              </Badge>
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
    </div>
  );
} 