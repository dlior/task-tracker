import { useEffect, useState } from 'react';

import { Badge, Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';

import { Task } from '../../models';
import { DatabaseService } from '../../services';
import { dateTransformer, isToday } from '../../utils';
import ActionsMenu from '../actions-menu/ActionsMenu';

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
        {tasks.map((task) => (
          <Box key={task.id} boxShadow='md' p='4' rounded='md' bg='white'>
            <Flex justifyContent='space-between'>
              <HStack>
                <Text as='b' fontSize='large' color='black'>
                  {task.title}
                </Text>
                <Badge
                  colorScheme='green'
                  rounded='full'
                  px='2'
                  variant='subtle'
                >
                  {isToday(task.createdAt) && 'New'}
                </Badge>
              </HStack>
              <ActionsMenu taskId={task.id} />
            </Flex>
            <Box>
              <Text fontSize='small' color='black'>
                {task.description}
              </Text>
              <Text fontSize='small' color='black'>
                {dateTransformer(task.dueDate)}
              </Text>
            </Box>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default TasksList;
