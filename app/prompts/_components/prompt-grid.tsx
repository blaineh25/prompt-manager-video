import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for prompts
const mockPrompts = [
  {
    id: 1,
    name: "Code Review Assistant",
    description: "Helps review and improve code quality",
    content: "Please review this code and suggest improvements for better performance and readability."
  },
  {
    id: 2,
    name: "Documentation Generator",
    description: "Creates clear and concise documentation",
    content: "Generate documentation for the following code, including usage examples and API references."
  },
  {
    id: 3,
    name: "Bug Analyzer",
    description: "Identifies and suggests fixes for bugs",
    content: "Analyze this error message and provide potential solutions to fix the bug."
  },
  {
    id: 4,
    name: "Code Optimizer",
    description: "Optimizes code for better performance",
    content: "Review this code and suggest optimizations to improve its performance."
  }
];

export function PromptGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockPrompts.map((prompt) => (
        <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{prompt.name}</CardTitle>
            <CardDescription>{prompt.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{prompt.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 