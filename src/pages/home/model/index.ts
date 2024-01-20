import { createStore, StoreActions } from '@/shared/lib/zustand-class';
import { handleApiRequest } from '@/shared/lib/api/handle-api-request';
import { getDistrict, getWorkers, getWorkersDayLocation } from './api';
import { notificationError, notificationSuccess } from '@/shared/lib/notification';
import { getUserInfoFromLocalStoreData } from '@/pages/home/model/lib';
import { SelectItem } from '@mantine/core';
import { DatesRangeValue } from '@mantine/dates';
import dayjs from 'dayjs';
import { ILocationsWorker } from '@/pages/home/model/types';

export const userInfo = getUserInfoFromLocalStoreData();

class InitialState {
  districtData: SelectItem[] = [];
  workersData: SelectItem[] = [];
  selectedDistrictId: number | null = userInfo?.district ?? null;
  selectedWorker: string | null = null;
  dateRangeValue: DatesRangeValue = [new Date(), new Date()];
  workersPath: ILocationsWorker[] = [];
  isLoading = false;
}

class Actions extends StoreActions<InitialState> {
  async getDistrictData() {
    await handleApiRequest({
      handler: () => getDistrict(),
      onSuccess: (data) => {
        this.set({
          districtData: data.results.map((item) => {
            return {
              ...item,
              value: item.id.toString(),
              label: item.name,
            };
          }),
        });
      },
      onFail: () => {
        this.set({ districtData: [] });
        notificationError('Serverda xatolik');
      },
    });
  }

  setDistrictId(id: number) {
    this.set({ selectedDistrictId: id, selectedWorker: null });
    this.getWorkersData();
    this.getPathWorker();
  }

  setDateRangeValue(value: DatesRangeValue) {
    this.set({ dateRangeValue: value });
    if (value[0] && value[1]) {
      this.getPathWorker();
    }
  }

  setWorkerId(value: string) {
    this.set({ selectedWorker: value });
    this.getPathWorker();
  }

  async getWorkersData() {
    const { selectedDistrictId } = this.get();

    if (!userInfo || !selectedDistrictId) return;

    await handleApiRequest({
      handler: () => getWorkers({
        district: selectedDistrictId,
        role: userInfo.role,
      }),
      onSuccess: (data) => {
        this.set({
          workersData: data.map((item) => {
            return {
              ...item,
              value: item.id.toString(),
              label: item.first_name || '' + ' ' + item.last_name || '',
            };
          }),
        });
      },
      onFail: () => {
        this.set({ districtData: [] });
        notificationError('Serverda xatolik');
      },
    });
  }

  async getPathWorker() {
    const { selectedDistrictId, dateRangeValue, selectedWorker } = this.get();

    if (!selectedDistrictId) return;

    const payload = {
      district: selectedDistrictId,
      start: dayjs(dateRangeValue[0]).format('YYYY-MM-DD'),
      end: dayjs(dateRangeValue[1]).format('YYYY-MM-DD'),
      user: selectedWorker,
    };

    await handleApiRequest({
        handler: () => getWorkersDayLocation(payload),
        onSuccess: (data) => {
          notificationSuccess(data.message.language.uz);
          const usersLocation: ILocationsWorker[] = data.results.map((item) => {
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            return {
              id: item.created_by.id,
              full_name: item.created_by.first_name ?? '' + ' ' + item.created_by.last_name ?? '',
              polyline: item.location.map((location) => {
                return {
                  coordination: [Number(location.lat), Number(location.lan)],
                  color: color,
                };
              }),
              markers: item.location.map((location) => {
                return {
                  coordination: [Number(location.lat), Number(location.lan)],
                  created_at: location.created_at,
                  color: color,
                };
              }),
            };
          });

          this.set({ workersPath: usersLocation });
        },
        onFail: () => {
          notificationError('Serverda xatolik');
          this.set({ workersPath: [] });
        },
        loading: {
          set: this.set,
          key: 'isLoading',
        },
      },
    );
  }
}


export const useHomeStore = createStore({
  initialState: new InitialState(),
  actionsClass: Actions,
});

export const actionsHomeStore = useHomeStore.actions;

//start_date: dayjs(dateRangeValue[0]).format('YYYY-MM-DD'),
//         end_date: dayjs(dateRangeValue[1]).format('YYYY-MM-DD'),