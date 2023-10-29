import { useFetcher, useLoaderData } from '@remix-run/react';

import { _action } from '../actions/schemas';
import { type toggleAllTodos } from '../actions/toggleAllTodos';
import { type loader } from '../route';

import { Checkbox } from '#components/Checkbox';

export const ToggleAllTodosForm = () => {
  const fetcher = useFetcher<typeof toggleAllTodos>();
  const { todos } = useLoaderData<typeof loader>();
  const remainingItems = todos.filter(({ isCompleted }) => !isCompleted).length;
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
