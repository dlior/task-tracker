import { Flex } from '@chakra-ui/react';

import { LogoIcon } from '../icons/LogoIcon';
import CreateTaskForm from '../tasks/CreateTaskForm';

const Header = () => {
  return (
    <Flex
      as='header'
      bgColor='gray.800'
      py='2'
      px='4'
      position='sticky'
      top='0'
      left='0'
      zIndex='2'
      roundedBottom='md'
      h='14'
      justifyContent='space-between'
      alignItems='center'
    >
      <LogoIcon boxSize='32px' bgColor='gray.800' />
      <CreateTaskForm />
    </Flex>
  );
};

export default Header;
