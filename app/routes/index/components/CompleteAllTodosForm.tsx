import { Form, useLoaderData } from '@remix-run/react';

import { _action } from '../actions/schemas';
import { type loader } from '../route';

import { Checkbox } from '#components/Checkbox';

export const CompleteAllTodosForm = () => {
  const { todos } = useLoaderData<typeof loader>();
  const areAllTodosCompleted = todos.every((todo) => todo.isCompleted);
  const remainingItems = todos.filter(({ isCompleted }) => !isCompleted).length;

  return (
    <div className="flex">
      <Form method="POST" replace>
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
      </Form>
      <span className="ml-auto">
        {remainingItems} item{remainingItems > 1 ? 's' : ''} left
      </span>
    </div>
  );
};
