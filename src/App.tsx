import { Box, useColorMode } from '@chakra-ui/react';

import Header from './components/header/Header';
import TasksList from './components/tasks/TasksList';

const App = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      w='375px'
      h='600px'
      overflow='scroll'
      bgColor={colorMode === 'light' ? 'gray.200' : 'gray.800'}
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Header />
      <TasksList />
    </Box>
  );
};

export default App;
