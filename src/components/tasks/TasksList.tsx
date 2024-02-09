import { useEffect, useState } from 'react';

import { Center, Spinner, Stack } from '@chakra-ui/react';

import { Task } from '../../models';
import { DatabaseService } from '../../services';
import TaskItem from './TaskItem';

const databaseService = DatabaseService.instance;

const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = databaseService.getTasks((tasks) => {
      setTasks(tasks);
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
            <Spinner size='xl' />
          </Center>
        )}
      </Stack>
    </>
  );
};

export default TasksList;
