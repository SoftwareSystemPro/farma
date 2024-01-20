import axios from 'axios';
import { API_BASE } from '@/shared/lib/constants';
import { IDistrict, IWorker, IWorkerDayLocationParams, IWorkerParams, IWorkerPath } from './types';
import { IResponseWorkerPath } from '@/shared/lib/types';

export async function getDistrict() {
  const res = await axios.get<IDistrict>(`${API_BASE}/district/`);
  return res.data;
}

export async function getWorkers({ district, role }: IWorkerParams) {
  const res = await axios.get<IWorker[]>(`${API_BASE}/registration/village_agent_manager/`,{
    params: {
      village: district,
      role: role,
    }
  });
  return res.data;
}

export async function getWorkersDayLocation({district,user,end,start}:IWorkerDayLocationParams){
  const res = await axios.get<IResponseWorkerPath<IWorkerPath[]>>(`${API_BASE}/mobile_location/get_day_location/`,{
    params: {
      village: district,
      user,
      start,
      end,
    }
  });
  return res.data;
}