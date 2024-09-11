import { useFetcher, useFetchers, useLoaderData } from '@remix-run/react';

import { intent } from '../actions/schemas';
import { type toggleAllTodos } from '../actions/toggleAllTodos';
import { type loader } from '../route';

import { Checkbox } from '#components/Checkbox';

export const ToggleAllTodosForm = () => {
  const fetchers = useFetchers();
  const fetcher = useFetcher<typeof toggleAllTodos>();
  const { todos } = useLoaderData<typeof loader>();

  const remainingItems = todos.reduce((remainingItems, todo) => {
    const todoFetcher = fetchers.find(({ formData }) => {
      return (
        formData?.get('intent') === intent.enum.toggle && formData?.get('id') === todo.id.toString()
      );
    });

    const isCompleted = todoFetcher?.formData?.get('isCompleted') ?? todo.isCompleted;

    return remainingItems - Number(isCompleted);
  }, todos.length);
  const areAllTodosCompleted = remainingItems === 0;

  return (
    <div className="toggle-all-todos">
      <fetcher.Form method="POST">
        <Checkbox as="button" id="toggle-all" defaultChecked={areAllTodosCompleted}>
          <Checkbox.Indicator name="intent" value={intent.enum.toggleAll} />
          <Checkbox.Label>
            {areAllTodosCompleted ? 'Uncheck all todos' : 'Check all todos'}
          </Checkbox.Label>
        </Checkbox>
        <input type="hidden" name="areAllTodosCompleted" value={+areAllTodosCompleted} />
      </fetcher.Form>
      <span>
        {remainingItems} item{remainingItems > 1 ? 's' : ''} left
      </span>
    </div>
  );
};
