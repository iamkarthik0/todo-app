import { getTodos } from './actions/todoActions'
import { AddTodoForm } from './components/custom/AddTodoForm'
import { TodoItem } from './components/custom/TodoItem'
import { Toaster } from "@/components/ui/toaster"

export default async function Home() {
  const todos = await getTodos()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            Task Manager
          </h1>
          <p className="text-gray-500">Stay organized, get more done</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <AddTodoForm />
        </div>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100">
              <p className="text-gray-500">No tasks yet. Add one above!</p>
            </div>
          ) : (
            todos.map((todo: { id: string; title: string; completed: boolean }) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
              />
            ))
          )}
        </div>
      </div>
      <Toaster />
    </main>
  )
}
