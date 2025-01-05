'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { toggleTodo, deleteTodo } from "@/app/actions/todoActions"

import { Trash2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface TodoItemProps {
  id: string
  title: string
  completed: boolean
}

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const { toast } = useToast()

  const handleToggle = async (checked: boolean) => {
    try {
      await toggleTodo(id, checked)
      toast({
        title: "Task updated",
        description: `Task marked as ${checked ? 'completed' : 'pending'}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task",
      })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTodo(id)
      toast({
        title: "Task deleted",
        description: "Successfully removed task",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task",
      })
    }
  }

  return (
    <div className="group flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all">
      <Checkbox
        checked={completed}
        onCheckedChange={handleToggle}
        className="h-5 w-5 rounded-lg"
      />
      <span className={`flex-1 text-lg ${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
        {title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-5 w-5 text-red-500" />
      </Button>
    </div>
  )
} 