import { createStore, StoreActions } from '@/shared/lib/zustand-class';
import { ILoginForm } from '@/pages/login/model/lib';
import { handleApiRequest } from '@/shared/lib/api/handle-api-request';
import { login } from '@/pages/login/model/api';
import { numberFormat } from '@/shared/lib/number-format';
import { notificationError, notificationSuccess } from '@/shared/lib/notification';
import { AxiosError } from 'axios';
import { sendToken } from '@/pages/verification/api';

class InitialState {
}

class Actions extends StoreActions<InitialState> {
  async submitLogin({phone_number}:ILoginForm){
    await handleApiRequest({
      handler: () => login({
        phone_number: `+${numberFormat(phone_number)}`
      }),
      onSuccess: (data) => {
        notificationSuccess(data.message)
      },
      onFail: (error) => {
        if (error instanceof AxiosError){
          notificationError(error.response?.data.message)
        }
      }
    })
  }
}

export const useLoginStore = createStore({
  initialState: new InitialState(),
  actionsClass: Actions,
});

export const actionsLogin = useLoginStore.actions;

