import React, { useEffect } from 'react';
import style from './index.module.scss';
import { Button, Input,Text } from '@mantine/core';
import { Formik } from 'formik';
import { loginSchema } from '../model/lib';

import { actionsLogin } from '@/pages/login/model';
import { InputPhone } from '@/shared/ui';
import { StorageKeys } from '@/shared/lib/constants';
import IconLogo  from '@/shared/images/FWG.png';

export const Login = () => {

  useEffect(() => {
    localStorage.removeItem(StorageKeys.USER_INFO);
  },[])

  return (
    <div className={style.loginWrapper}>
      <div className={style.loginInputsLogo}>
        <img src={IconLogo} className={style.logo} alt={'logo'}/>
        <Formik
          initialValues={{
            phone_number: '',
          }}
          validationSchema={loginSchema}
          onSubmit={actionsLogin.submitLogin}
        >
          {({ handleSubmit, handleChange, handleBlur, errors, isSubmitting, touched, values }) =>
            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.phoneNumber}>
                <Input.Label>
                  Telefon raqam
                </Input.Label>
                <InputPhone
                  id={'phone_number'}
                  name={'phone_number'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.phone_number && errors.phone_number
                      ? errors.phone_number
                      : ''
                  }
                  value={values.phone_number}
                  placeholder={'+998 (99) 999-99-99'} />
                {
                  touched.phone_number && errors.phone_number && (
                    <Text color={'red'}>
                      {errors.phone_number}
                    </Text>
                  )
                }
              </div>

              <Button type={'submit'} fullWidth disabled={isSubmitting}>
                Submit
              </Button>

            </form>
          }
        </Formik>
      </div>


    </div>
  );
};
