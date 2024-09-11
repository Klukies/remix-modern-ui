import { useFetcher, useLoaderData } from '@remix-run/react';

import { type deleteTodo } from '../actions/deleteTodo';
import { intent } from '../actions/schemas';
import { type toggleTodo } from '../actions/toggleTodo';
import { type loader } from '../route';

import { Checkbox } from '#components/Checkbox';
import { Icon } from '#components/Icon';
import { IconButton } from '#components/IconButton';
import { ListItem } from '#components/ListItem';
import { UnorderedList } from '#components/UnorderedList';
import { type Todo } from '#services/drizzle/schema';

type TodoListItemProps = Pick<Todo, 'id' | 'title' | 'isCompleted'>;

const ToggleTodoForm = ({ id, title, isCompleted: initialIsCompleted }: TodoListItemProps) => {
  const fetcher = useFetcher<typeof toggleTodo>();
  const isCompleted =
    (fetcher.formData && fetcher.formData.get('isCompleted') === '1') ?? initialIsCompleted;

  return (
    <fetcher.Form method="POST" className="toggle-todo-form">
      <Checkbox as="button" id={id.toString()} checked={isCompleted}>
        <Checkbox.Indicator />
        <Checkbox.Label>{title}</Checkbox.Label>
      </Checkbox>
      <input type="hidden" name="intent" value={intent.enum.toggle} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="isCompleted" value={+!initialIsCompleted} />
    </fetcher.Form>
  );
};

const DeleteTodoForm = ({ id }: Pick<TodoListItemProps, 'id'>) => {
  const fetcher = useFetcher<typeof deleteTodo>();
  const isPending = fetcher.state !== 'idle';

  return (
    <fetcher.Form method="POST" className="delete-todo-form">
      <IconButton pending={isPending} border>
        <Icon name="trash" />
      </IconButton>
      <input type="hidden" name="intent" value={intent.enum.delete} />
      <input type="hidden" name="id" value={id} />
    </fetcher.Form>
  );
};

const TodoListItem = ({ id, title, isCompleted }: TodoListItemProps) => {
  return (
    <ListItem className="todo-list__item">
      <ToggleTodoForm id={id} title={title} isCompleted={isCompleted} />
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
