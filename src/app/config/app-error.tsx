import { Center,Button } from '@mantine/core';

import { routeHistory } from '@/shared/config/routing/historyRouter';

export function AppError() {
  return (
    <Center style={{ padding: 50, flexDirection: 'column', gap: 30 }}>
      <h1>Что-то пошло не так</h1>
      <Button onClick={() => routeHistory.push('/')}>Вернуться</Button>
    </Center>
  );
}
