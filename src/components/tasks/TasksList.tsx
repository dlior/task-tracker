import { useEffect, useState } from 'react';

import { Center, Spinner, Stack, Text } from '@chakra-ui/react';

import { Task } from '../../models';
import { DatabaseService } from '../../services';
import TaskItem from './TaskItem';

const databaseService = DatabaseService.instance;

const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = databaseService.getTasks((tasks) => {
      setTasks(tasks);
      setIsLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <>
      <Stack as='main' my='12' spacing='4' px='4'>
        {tasks.length ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <Center my='50%'>
            {isLoading ? (
              <Spinner size='xl' />
            ) : (
              <Text as='b' fontSize='large'>
                There're no tasks!
              </Text>
            )}
          </Center>
        )}
      </Stack>
    </>
  );
};

export default TasksList;
