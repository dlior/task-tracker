import { useState } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { initialTaskState, Task } from '../../models';
import { DatabaseService } from '../../services';

const CreateTaskForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [task, setTask] = useState<Partial<Task>>(initialTaskState);

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
              <FormControl>
                <Stack>
                  <FormLabel htmlFor='title'>Tilte</FormLabel>
                  <Input
                    id='title'
                    placeholder='Task title'
                    value={task.title}
                    onChange={({ target }) =>
                      setTask({ ...task, title: target.value })
                    }
                  />
                </Stack>
              </FormControl>

              <FormControl>
                <Stack>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Input
                    type='text'
                    id='description'
                    placeholder='Task description'
                    value={task.description}
                    onChange={({ target }) =>
                      setTask({ ...task, description: target.value })
                    }
                  />
                </Stack>
              </FormControl>

              <FormControl>
                <Stack>
                  <FormLabel htmlFor='due-date'>Due date</FormLabel>
                  <Input
                    type='datetime-local'
                    id='due-date'
                    value={task.dueDate}
                    onChange={({ target }) =>
                      setTask({ ...task, dueDate: target.value })
                    }
                  />
                </Stack>
              </FormControl>

              <FormControl>
                <Checkbox
                  isChecked={task.setReminder}
                  onChange={({ target }) =>
                    setTask({ ...task, setReminder: target.checked })
                  }
                >
                  Set reminder
                </Checkbox>
              </FormControl>
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

export default CreateTaskForm;
