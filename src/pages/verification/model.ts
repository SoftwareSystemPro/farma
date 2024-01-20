import { createStore, StoreActions } from '@/shared/lib/zustand-class';
import { handleApiRequest } from '@/shared/lib/api/handle-api-request';
import { sendToken } from '@/pages/verification/api';
import { StorageKeys } from '@/shared/lib/constants';
import { routeHistory } from '@/shared/config/routing/historyRouter';

class InitialState {
  status: 'pending' | 'error' | 'success'  = 'pending';
  notPermission = false;
}

class Actions extends StoreActions<InitialState> {
  async submitLogin({ token }: { token: string }) {
    await handleApiRequest({
      handler: () => sendToken({ token }),
      onSuccess: (data) => {
        window.localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data));
        console.log(data);
        if (data.role !== "admin"){
          this.set({ notPermission: true });
        }
        this.set({ status: 'success', });
      },
      onFail: () => {
        localStorage.removeItem(StorageKeys.USER_INFO);
        this.set({ status: 'error' });
      },
    });
  }
}

export const useVerificationStore = createStore({
  initialState: new InitialState(),
  actionsClass: Actions,
});

export const actionsVerificationStore = useVerificationStore.actions;

