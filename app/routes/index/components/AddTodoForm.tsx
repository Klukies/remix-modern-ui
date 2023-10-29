import { conform } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { useFetcher } from '@remix-run/react';
import { type z } from 'zod';

import { type addTodo, addTodoSchema } from '../actions/addTodo';
import { _action } from '../actions/schemas';

import { FormGroup } from '#components/FormGroup';
import { useForm } from '#hooks/useForm';

export const AddTodoForm = () => {
  const fetcher = useFetcher<typeof addTodo>();

  const [form, fields] = useForm<z.infer<typeof addTodoSchema>>({
    id: 'add-todo',
    lastSubmission: fetcher.data?.submission,
    onValidate: ({ formData }) => parse(formData, { schema: addTodoSchema }),
  });

  return (
    <fetcher.Form method="POST" {...form.props} className="mb-6">
      <FormGroup>
        <FormGroup.InputField
          {...conform.input(fields.title, { type: 'text' })}
          placeholder="What do you have to do?"
          aria-label="Add new todo item"
          autoComplete="off"
        />
        <FormGroup.Hint id={fields.title.errorId}>{fields.title.error}</FormGroup.Hint>
      </FormGroup>
      <input type="hidden" name="_action" value={_action.enum.add} />
    </fetcher.Form>
  );
};
