import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Calendar, Plus } from "lucide-react";

interface Milestone {
  id: string;
  text: string;
  completed: boolean;
}

interface KeyResult {
  id: string;
  text: string;
  progress: number;
  milestones: Milestone[];
}

interface KeyResultItemProps {
  keyResult: KeyResult;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onAddMilestone: (keyResultId: string) => void;
}

export function KeyResultItem({
  keyResult,
  onDelete,
  onUpdate,
  onAddMilestone
}: KeyResultItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(keyResult.text);

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(keyResult.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex-1 mr-4">
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
              className="text-sm cursor-pointer hover:bg-muted/50 p-2 rounded"
              onClick={handleEdit}
            >
              {keyResult.text}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Select defaultValue="milestone">
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="milestone">Milestone</SelectItem>
                <SelectItem value="target">Target</SelectItem>
                <SelectItem value="metric">Metric</SelectItem>
              </SelectContent>
            </Select>
            
            <span className="text-sm font-medium">{keyResult.progress}%</span>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(keyResult.id)}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Milestones */}
      {keyResult.milestones.length > 0 && (
        <div className="ml-6 space-y-2">
          {keyResult.milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              {milestone.text}
            </div>
          ))}
        </div>
      )}
      
      {/* Add Milestone Button */}
      <div className="ml-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddMilestone(keyResult.id)}
          className="h-8 text-xs text-primary hover:bg-primary/10"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Milestone
        </Button>
      </div>
    </div>
  );
}