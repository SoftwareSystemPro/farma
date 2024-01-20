import { StorageKeys } from '@/shared/lib/constants';
import { IVerificationResponse } from '@/pages/verification/types';
import { IRegionData } from '@/pages/home/model/types';
import { Map } from 'leaflet';

export const getUserInfoFromLocalStoreData = (): null | IVerificationResponse => {
  const userInfo = localStorage.getItem(StorageKeys.USER_INFO);
  if (userInfo) {
    return JSON.parse(userInfo) as IVerificationResponse;
  }
  return null;
};

export const regionsLanLat: IRegionData[] = [
  {
    city: 'Toshkent Shaxar',
    lat: 41.3111,
    lng: 69.2797,
  },
  {
    city: 'Namangan',
    lat: 41.0011,
    lng: 71.6683,
  },
  {
    city: 'Samarqand',
    lat: 39.6547,
    lng: 66.9758,
  },
  {
    city: 'Andijon',
    lat: 40.7833,
    lng: 72.3333,
  },
  {
    city: 'Nukus',
    lat: 42.4667,
    lng: 59.6000,
  },
  {
    city: 'Farg\'ona',
    lat: 40.3864,
    lng: 71.7864,
  },
  {
    city: 'Buxoro',
    lat: 39.7667,
    lng: 64.4333,
  },
  {
    city: 'Qarshi',
    lat: 38.8667,
    lng: 65.8000,
  },
  {
    city: 'Jizzax',
    lat: 40.1158,
    lng: 67.8422,
  },
  {
    city: 'Urganch',
    lat: 41.5500,
    lng: 60.6333,
  },
  {
    city: 'Termiz',
    lat: 37.2167,
    lng: 67.2833,
  },
  {
    city: 'Navoiy',
    lat: 40.0844,
    lng: 65.3792,
  },
  {
    city: 'Xorazim',
    lat: 41.5,
    lng: 60.5,
  },
  {
    city: 'Qashqadaryo',
    lat: 41.5,
    lng: 60.5,
  },
  {
    city: 'Qoraqalpog\'iston',
    lat: 43.804133,
    lng: 59.445799,
  },
  {
    city: 'Sirdaryo',
    lat: 40.5,
    lng: 68.5,
  },
  {
    city: 'Surxandaryo',
    lat: 38.5,
    lng: 67.5,
  }
];

export const flyToMap = (map: Map | null, longitude: number, latitude: number, zoom?: number) => {
  try {
    if (map) {
      if (latitude && longitude) {
        map.flyTo([latitude, longitude + 0.003], zoom || 17, {
          duration: 1.2,
          animate: true
        });
      }
    }
  } catch (e) {
    console.log(e, 'flyToMap');
  }
};