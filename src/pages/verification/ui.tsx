import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { routeHistory } from '@/shared/config/routing/historyRouter';
import { routePaths } from '@/shared/config/routing';
import { actionsVerificationStore, useVerificationStore } from '@/pages/verification/model';
import { Case, Switch, When } from 'react-if';
import { Box, Button, Flex, Loader, Text } from '@mantine/core';
import style from './index.module.scss';
import { ReactComponent as IconOk } from '@/shared/images/icon-ok.svg';
import { ReactComponent as IconError } from '@/shared/images/icon-error.svg';

export const Verification = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  console.log(token);
  const { status,notPermission } = useVerificationStore(['status','notPermission']);

  useEffect(() => {
    if (!token) {
      routeHistory.push(routePaths.login);
    } else {
      actionsVerificationStore.submitLogin({ token });
    }
  }, [token]);

  return (
    <div className={style.wrapperVerification}>
      <Switch>
        <Case condition={status === 'error'}>
          <div className={style.verificationCard}>
            <Box bg={'red'} className={style.iconWrapper}>
              <IconError className={style.svg} />
            </Box>
            <Text component={'p'}>
              Tizimda xatolik !!!
            </Text>
            <Button onClick={() => {
              routeHistory.push(routePaths.login);
            }}>
              Qaytadan kirish
            </Button>
          </div>

        </Case>
        <Case condition={status === 'success'}>
          <div className={style.verificationCard}>
            <Box bg={'green'} className={style.iconWrapper}>
              <IconOk className={style.svg} />
            </Box>
            <Text component={'p'}>
              Tizimga muvaffaqiyatli kirdingiz.
            </Text>
            <Flex gap={15} justify={'center'} align={'center'}>
             <When condition={notPermission}>
               <Button onClick={() => {
                 window.location.replace(`fwguz://fwg.uz/${token}`);
               }}>
                 Mobile app
               </Button>
             </When>
              <Button onClick={() => {
                routeHistory.push(routePaths.root);
              }}>
                Web version
              </Button>
            </Flex>
          </div>
        </Case>
        <Case condition={status === 'pending'}>
          <div className={style.verificationCard}>
            <Box bg={'blue'} className={style.iconWrapper}>
              <Loader color={'white'} size={'100%'}/>
            </Box>
            <Text component={'p'}>
              Iltimos kutib turing.
            </Text>
          </div>
        </Case>
      </Switch>
    </div>
  );
};
