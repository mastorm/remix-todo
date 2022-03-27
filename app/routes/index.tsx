import { Task } from '@prisma/client'
import { useCallback, useEffect, useRef } from 'react'
import { ActionFunction, Form, LoaderFunction, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'
import { useFormReset } from '~/hooks/form/useFormReset'
import { completeTask, createTask, getTasks } from '~/task'

export const loader: LoaderFunction = () => {
  return getTasks()
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()

  const action = form.get('action')
  invariant(typeof action === 'string')
  switch (action) {
    case 'create':
      const description = form.get('description')

      invariant(typeof description === 'string')

      await createTask(description)
      return null
    case 'complete':
      const id = form.get('taskId')

      invariant(typeof id === 'string')
      const idNum = Number.parseInt(id)
      await completeTask(idNum)
      return null
    default:
      return null
  }
}

export default function Index() {
  const tasks = useLoaderData<Task[]>()
  const formRef = useRef<HTMLFormElement | null>(null)

  useFormReset(formRef)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Form method="post" ref={formRef}>
        <input
          required
          type="text"
          name="description"
          placeholder="What do you want to get done?"
        />
        <button name="action" value="create">
          Add
        </button>
      </Form>
      <ul>
        {tasks.map((x) => (
          <TaskItem task={x} key={x.id} />
        ))}
      </ul>
    </div>
  )
}

export interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const formRef = useRef<HTMLFormElement | null>(null)

  const onToggleCheckbox = useCallback(() => {
    formRef.current?.submit()
  }, [])

  return (
    <li>
      <Form method="post" ref={formRef}>
        <input type="checkbox" onChange={onToggleCheckbox} />
        <input type="hidden" name="taskId" value={task.id} />
        <input type="hidden" name="action" value="complete" />
        {task.description}
      </Form>
    </li>
  )
}
