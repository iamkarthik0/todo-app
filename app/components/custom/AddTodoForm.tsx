'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addTodo } from "@/app/actions/todoActions"

import { Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function AddTodoForm() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)
    try {
      await addTodo(title)
      setTitle('')
      toast({
        title: "Task added",
        description: "Successfully added new task",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add task",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 text-lg h-12"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        size="lg"
        className="w-12 h-12 rounded-xl"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  )
} 