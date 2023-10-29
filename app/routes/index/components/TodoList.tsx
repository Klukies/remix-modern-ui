import { useFetcher, useLoaderData } from '@remix-run/react';

import { type deleteTodo } from '../actions/deleteTodo';
import { _action } from '../actions/schemas';
import { type toggleTodo } from '../actions/toggleTodo';
import { type loader } from '../route';

import { Checkbox } from '#components/Checkbox';
import { Icon } from '#components/Icon';
import { IconButton } from '#components/IconButton';
import { ListItem } from '#components/ListItem';
import { UnorderedList } from '#components/UnorderedList';
import { type Todo } from '#services/drizzle/schema';

type TodoListItemProps = Pick<Todo, 'id' | 'title' | 'isCompleted'>;

const DeleteTodoForm = ({ id }: Pick<TodoListItemProps, 'id'>) => {
  const fetcher = useFetcher<typeof deleteTodo>();
  const isPending = fetcher.state !== 'idle';

  return (
    <fetcher.Form method="POST" className="ml-auto">
      <IconButton pending={isPending}>
        <Icon name="trash" />
      </IconButton>
      <input type="hidden" name="_action" value={_action.enum.delete} />
      <input type="hidden" name="id" value={id} />
    </fetcher.Form>
  );
};

const TodoListItem = ({ id, title, isCompleted }: TodoListItemProps) => {
  const fetcher = useFetcher<typeof toggleTodo>();

  return (
    <ListItem>
      <fetcher.Form method="POST" id="todo-list-item">
        <Checkbox
          as="button"
          id={id.toString()}
          className="flex items-center"
          defaultChecked={isCompleted}
        >
          <Checkbox.Indicator className="mr-3" />
          <Checkbox.Label>{title}</Checkbox.Label>
        </Checkbox>
        <input type="hidden" name="_action" value={_action.enum.toggle} />
        <input type="hidden" name="id" value={id} />
      </fetcher.Form>
      <DeleteTodoForm id={id} />
    </ListItem>
  );
};

export const TodoList = () => {
  const { todos } = useLoaderData<typeof loader>();

  if (!todos.length) {
    return null;
  }

  return (
    <UnorderedList>
      {todos.map(({ id, title, isCompleted }) => {
        return <TodoListItem key={id} id={id} title={title} isCompleted={isCompleted} />;
      })}
    </UnorderedList>
  );
};
