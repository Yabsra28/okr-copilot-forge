import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, RefreshCw, X } from "lucide-react";

interface AISuggestionCardProps {
  suggestion: string;
  suggestionCount: number;
  onRegenerate: () => void;
  onAdd: () => void;
  onCancel: () => void;
  onEdit: (text: string) => void;
}

export function AISuggestionCard({
  suggestion,
  suggestionCount,
  onRegenerate,
  onAdd,
  onCancel,
  onEdit
}: AISuggestionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(suggestion);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-ai-suggestion border border-ai-icon/20 rounded-lg p-4 space-y-3">
      <div className="bg-gradient-to-r from-ai-icon/10 to-ai-icon/5 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ai-icon" />
          <span className="text-sm font-semibold text-ai-suggestion-foreground">
            This is a Key Result from the AI
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-ai-icon" />
          <span className="text-sm font-medium text-ai-suggestion-foreground">
            AI Key Result Suggestion
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-3 py-1 h-7 border-ai-icon/30 text-ai-suggestion-foreground"
          >
            I have made you {suggestionCount} Suggestions
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-7 w-7 p-0 hover:bg-ai-icon/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="text-sm"
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit();
              }
            }}
            autoFocus
          />
        ) : (
          <p 
            className="text-sm text-ai-suggestion-foreground cursor-pointer hover:bg-ai-icon/5 p-2 rounded"
            onClick={handleEdit}
          >
            {suggestion}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-ai-suggestion-foreground/70">
            This is a Key Result from the AI
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              className="h-8 text-xs text-ai-suggestion-foreground hover:bg-ai-icon/10"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Regenerate
            </Button>
            <Button
              onClick={onAdd}
              size="sm"
              className="h-8 text-xs bg-primary hover:bg-primary/90"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}