'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function getTodos() {
  try {
    return await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    throw new Error('Failed to fetch todos')
  }
}

export async function addTodo(title: string) {
  try {
    await prisma.todo.create({
      data: { title }
    })
    revalidatePath('/')
  } catch (error) {
    throw new Error('Failed to create todo')
  }
}

export async function toggleTodo(id: string, completed: boolean) {
  try {
    await prisma.todo.update({
      where: { id },
      data: { completed }
    })
    revalidatePath('/')
  } catch (error) {
    throw new Error('Failed to toggle todo')
  }
}

export async function deleteTodo(id: string) {
  try {
    await prisma.todo.delete({
      where: { id }
    })
    revalidatePath('/')
  } catch (error) {
    throw new Error('Failed to delete todo')
  }
} 