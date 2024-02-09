import { useState } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { initialTaskState, Task } from '../../models';
import { DatabaseService } from '../../services';
import TaskFormField from './TaskFormField';

const TaskForm = () => {
  const [task, setTask] = useState<Partial<Task>>(initialTaskState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  enum FieldName {
    Title = 'title',
    Description = 'description',
    DueDate = 'dueDate',
    SetReminder = 'setReminder',
  }

  const onCloseComplete = () => {
    setTask(initialTaskState);
    onClose();
  };

  const onCreateTask = () => {
    toast.promise(DatabaseService.instance.createTask(task), {
      loading: {
        title: 'Creating task...',
        description: 'Please wait',
      },
      success: {
        title: 'Task created',
        description: 'Looks great',
        duration: 1500,
        onCloseComplete,
      },
      error: {
        title: 'Failed to create task',
        description: 'Something went wrong',
      },
    });
  };

  return (
    <>
      <Button
        size='sm'
        leftIcon={<AddIcon />}
        colorScheme='blue'
        onClick={onOpen}
      >
        Add task
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='full'
        onClose={onCloseComplete}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton bgColor='transparent' />
          <DrawerHeader>Create new task</DrawerHeader>
          <Divider />

          <DrawerBody>
            <Stack spacing='6'>
              {Object.values(FieldName).map((fieldName) => (
                <TaskFormField
                  key={fieldName}
                  task={task}
                  fieldName={fieldName}
                  onFieldChange={setTask}
                />
              ))}
            </Stack>
          </DrawerBody>

          <Divider />
          <DrawerFooter>
            <Button variant='outline' size='sm' mr='3' onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' size='sm' onClick={onCreateTask}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TaskForm;
