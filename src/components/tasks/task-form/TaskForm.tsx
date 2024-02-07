import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

import { Task } from '../../../models';

const TaskForm: React.FC<{
  task: Partial<Task>;
  fieldName: 'title' | 'description' | 'dueDate' | 'setReminder';
  onFieldChange: (task: Partial<Task>) => void;
}> = ({ task, fieldName, onFieldChange }) => {
  const formLabel = `${fieldName[0].toUpperCase()}${fieldName.slice(1)}`;

  return (
    <FormControl>
      {fieldName !== 'setReminder' ? (
        <Stack>
          <FormLabel htmlFor={fieldName}>{formLabel}</FormLabel>
          <Input
            id={fieldName}
            type={fieldName === 'dueDate' ? 'datetime-local' : 'text'}
            placeholder={`Task ${fieldName}`}
            value={task[fieldName]}
            onChange={({ target }) =>
              onFieldChange({ ...task, [fieldName]: target.value })
            }
          />
        </Stack>
      ) : (
        <Checkbox
          isChecked={task.setReminder}
          onChange={({ target }) =>
            onFieldChange({ ...task, setReminder: target.checked })
          }
        >
          Set reminder
        </Checkbox>
      )}
    </FormControl>
  );
};

export default TaskForm;
