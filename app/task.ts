import {prisma} from "./prisma"

export async function getTasks() {
    return await prisma.task.findMany({
        where: {
            done: false
        }
    })
}

export async function createTask(description: string) {
    return await prisma.task.create({
        data: {
            description,
            done: false,
        }
    })
}

export async function completeTask(id: number) {
    await prisma.task.update({
        where: {
            id
        },
        data: {
            done: true
        }
    })
}