import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { useFetcher } from '@remix-run/react';
import { type z } from 'zod';

import { type addTodo } from '../actions/addTodo';
import { addTodoSchema, _action } from '../actions/schemas';

import { FormGroup } from '#components/FormGroup';

export const AddTodoForm = () => {
  const fetcher = useFetcher<typeof addTodo>();

  const [form, fields] = useForm<z.infer<typeof addTodoSchema>>({
    id: 'add-todo',
    lastSubmission: fetcher.data,
    onValidate: ({ formData }) => parse(formData, { schema: addTodoSchema }),
  });

  return (
    <fetcher.Form method="POST" {...form.props} className="add-todo-form">
      <FormGroup>
        <FormGroup.InputField
          placeholder="What do you have to do?"
          aria-label="Add new todo item"
          autoComplete="off"
          {...conform.input(fields.title)}
        />
        <FormGroup.Hint id={fields.title.errorId}>{fields.title.error}</FormGroup.Hint>
      </FormGroup>
      <input type="hidden" name="_action" value={_action.enum.add} />
    </fetcher.Form>
  );
};
