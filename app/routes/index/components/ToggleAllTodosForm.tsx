import { useFetcher, useFetchers, useLoaderData } from '@remix-run/react';

import { _action } from '../actions/schemas';
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
        formData?.get('_action') === _action.enum.toggle &&
        formData?.get('id') === todo.id.toString()
      );
    });

    const isCompleted = todoFetcher?.formData?.get('isCompleted') ?? todo.isCompleted;

    return remainingItems - Number(isCompleted);
  }, todos.length);
  const areAllTodosCompleted = remainingItems === 0;

  return (
    <div className="flex">
      <fetcher.Form method="POST">
        <Checkbox
          as="button"
          id="toggle-all"
          defaultChecked={areAllTodosCompleted}
          className="flex items-center"
        >
          <Checkbox.Indicator name="_action" value={_action.enum.toggleAll} className="mr-3" />
          <Checkbox.Label>
            {areAllTodosCompleted ? 'Uncheck all todos' : 'Check all todos'}
          </Checkbox.Label>
        </Checkbox>
        <input type="hidden" name="areAllTodosCompleted" value={+areAllTodosCompleted} />
      </fetcher.Form>
      <span className="ml-auto">
        {remainingItems} item{remainingItems > 1 ? 's' : ''} left
      </span>
    </div>
  );
};
