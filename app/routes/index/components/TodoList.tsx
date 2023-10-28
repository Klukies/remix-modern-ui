import { Form, useLoaderData, useNavigation } from '@remix-run/react';

import { _action } from '../actions/schemas';
import { type loader } from '../route';

import { Checkbox } from '#components/Checkbox';
import { Icon } from '#components/Icon';
import { IconButton } from '#components/IconButton';
import { ListItem } from '#components/ListItem';
import { UnorderedList } from '#components/UnorderedList';
import { type Todo } from '#services/drizzle/schema';

const DeleteTodoForm = ({ id }: Pick<Todo, 'id'>) => {
  const navigation = useNavigation();
  const isPending =
    navigation.state !== 'idle' &&
    navigation.formData?.get('_action') === _action.enum.delete &&
    navigation.formData?.get('id') === id.toString();

  return (
    <Form method="POST" className="ml-auto">
      <IconButton pending={isPending}>
        <Icon name="trash" />
      </IconButton>
      <input type="hidden" name="_action" value={_action.enum.delete} />
      <input type="hidden" name="id" value={id} />
    </Form>
  );
};

const TodoListItem = ({ id, title, isCompleted }: Pick<Todo, 'id' | 'title' | 'isCompleted'>) => {
  return (
    <ListItem>
      <Form method="POST" replace id="todo-list-item">
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
      </Form>
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
