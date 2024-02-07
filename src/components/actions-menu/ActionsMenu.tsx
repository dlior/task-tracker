import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { DatabaseService } from '../../services';
import { HorizontalEllipsisIcon } from '../icons/HorizontalEllipsisIcon';

const databaseService = DatabaseService.instance;

const Actions: React.FC<{ taskId: string }> = ({ taskId }) => {
  const onTaskDelete = async (taskId: string) => {
    await databaseService.deleteTask(taskId);
  };

  const onTaskComplete = async (taskId: string) => {
    await databaseService.updateTask(taskId, {
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <Menu placement='bottom-end'>
      <MenuButton
        as={IconButton}
        isRound
        icon={<HorizontalEllipsisIcon />}
        variant='solid'
        colorScheme='black'
      />
      <MenuList>
        <MenuItem
          data-testid='complete-task-action'
          fontSize='large'
          icon={<CheckIcon color='green.500' />}
          onClick={() => onTaskComplete(taskId)}
        >
          Mark as complete
        </MenuItem>
        <MenuItem
          data-testid='delete-task-action'
          fontSize='large'
          icon={<DeleteIcon color='red.500' />}
          onClick={() => onTaskDelete(taskId)}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Actions;
