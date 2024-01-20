import { useMantineColorScheme } from '@mantine/core';

export const useDarkMode = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  console.log(colorScheme,'colorScheme');
  return {
    toggleColorScheme,
    dark
  };
};

