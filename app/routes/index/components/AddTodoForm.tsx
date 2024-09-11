import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFetcher } from '@remix-run/react';
import { type z } from 'zod';

import { type addTodo } from '../actions/addTodo';
import { addTodoSchema, intent } from '../actions/schemas';

import { FormGroup } from '#components/FormGroup';

export const AddTodoForm = () => {
  const fetcher = useFetcher<typeof addTodo>();

  const [form, fields] = useForm<z.infer<typeof addTodoSchema>>({
    id: 'add-todo',
    lastResult: fetcher.data,
    onValidate: ({ formData }) => parseWithZod(formData, { schema: addTodoSchema }),
  });

  return (
    <fetcher.Form method="POST" {...getFormProps(form)} className="add-todo-form">
      <FormGroup>
        <FormGroup.InputField
          {...getInputProps(fields.title, { type: 'text' })}
          placeholder="What do you have to do?"
          aria-label="Add new todo item"
          autoComplete="off"
        />
        <FormGroup.Hint id={fields.title.errorId}>{fields.title.errors?.[0]}</FormGroup.Hint>
      </FormGroup>
      <input type="hidden" name="intent" value={intent.enum.add} />
    </fetcher.Form>
  );
};
