import { ILoginForm } from '@/pages/login/model/lib';
import axios from 'axios';
import { API_BASE } from '@/shared/lib/constants';
import { IResponse } from '@/shared/lib/types';

export async function login({phone_number} : ILoginForm) {
  const res = await axios.post<IResponse>(
    `${API_BASE}/registration/mobile_login/?phone_number=${phone_number}`
  )
  return res.data;
}