import { type ActionFunctionArgs, type LinksFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { type z } from 'zod';

import { addTodo } from './actions/addTodo';
import { deleteTodo } from './actions/deleteTodo';
import { type _action } from './actions/schemas';
import { toggleAllTodos } from './actions/toggleAllTodos';
import { toggleTodo } from './actions/toggleTodo';
import { AddTodoForm } from './components/AddTodoForm';
import { CompleteAllTodosForm } from './components/CompleteAllTodosForm';
import { Logo } from './components/Logo';
import { TodoList } from './components/TodoList';

import { db } from '#services/drizzle';

export const links: LinksFunction = () => [...Logo.links()];

export const loader = async () => {
  const todos = await db.query.todos.findMany({ orderBy: (t, { asc }) => [asc(t.createdAt)] });

  return { todos };
};

export const meta: MetaFunction = () => [{ title: 'Pending UI and toasts with Remix' }];

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <main className="m-auto mt-16 max-w-3xl px-4">
      <Logo />
      <AddTodoForm />
      <TodoList />
      {!!todos.length && (
        <>
          <hr className="mb-5 mt-3 text-neutral-600" />
          <CompleteAllTodosForm />
        </>
      )}
    </main>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries()) as { _action: z.infer<typeof _action> };

  switch (entries?._action) {
    case 'add':
      return addTodo(formData);
    case 'toggle':
      return toggleTodo(formData);
    case 'delete':
      return deleteTodo(formData);
    case 'toggleAll':
      return toggleAllTodos(formData);
  }
};