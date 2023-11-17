import { parse } from '@conform-to/zod';
import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type LinksFunction,
  type MetaFunction,
  json,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'invariant';
import { z } from 'zod';

import { addTodo } from './actions/addTodo';
import { deleteTodo } from './actions/deleteTodo';
import { todoToastSchema, _action } from './actions/schemas';
import { toggleAllTodos } from './actions/toggleAllTodos';
import { toggleTodo } from './actions/toggleTodo';
import { AddTodoForm } from './components/AddTodoForm';
import { Logo } from './components/Logo';
import { TodoList } from './components/TodoList';
import { TodoToast } from './components/TodoToast';
import { ToggleAllTodosForm } from './components/ToggleAllTodosForm';

import { db } from '#services/drizzle';
import { combineHeaders } from '#utils/headers';
import { getNestedTitle } from '#utils/meta';
import { getToast } from '#utils/toast.server';

import './route.css';

export const links: LinksFunction = () => [...Logo.links()];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const todos = await db.query.todos.findMany({ orderBy: (t, { asc }) => [asc(t.createdAt)] });
  const { toast, headers: toastHeaders } = await getToast(request, todoToastSchema);

  return json({ todos, toast }, { headers: combineHeaders(toastHeaders) });
};

export const meta: MetaFunction = ({ matches }) => [{ title: getNestedTitle('Todos', matches) }];

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <main>
      <Logo />
      <AddTodoForm />
      <TodoList />
      {!!todos.length && (
        <>
          <hr />
          <ToggleAllTodosForm />
        </>
      )}
      <TodoToast />
    </main>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parse(formData, { schema: z.object({ _action }) });
  invariant(submission.value, '_action is not present in the _action schema');

  switch (submission.value._action) {
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
