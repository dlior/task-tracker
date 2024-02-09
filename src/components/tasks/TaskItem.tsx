import { BellIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react';

import { Task } from '../../models';
import { dateTransformer, isToday } from '../../utils';
import ActionsMenu from '../actions-menu/ActionsMenu';

const TaskItem: React.FC<{
  task: Task;
}> = ({ task }) => {
  return (
    <Box boxShadow='md' p='4' rounded='md' bg='white'>
      <Flex justifyContent='space-between'>
        <HStack>
          <Text as='b' fontSize='large' color='black'>
            {task.title}
          </Text>
          <Badge colorScheme='blue' rounded='full' px='2' variant='subtle'>
            {isToday(task.createdAt) && 'New'}
          </Badge>
        </HStack>
        <ActionsMenu taskId={task.id} />
      </Flex>
      <Box>
        <Text fontSize='small' color='black'>
          {task.description}
        </Text>
        <HStack>
          <Text fontSize='small' color='black'>
            {dateTransformer(task.dueDate)}
          </Text>
          {task.setReminder && <BellIcon color='blue.600' boxSize='18px' />}
        </HStack>
      </Box>
    </Box>
  );
};

export default TaskItem;
