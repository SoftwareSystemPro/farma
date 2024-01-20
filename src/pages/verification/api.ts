import axios from 'axios';
import { API_BASE } from '@/shared/lib/constants';
import { IVerificationResponse } from '@/pages/verification/types';

export async function sendToken({ token }: { token: string }) {
  const res = await axios.post<IVerificationResponse>(
    `${API_BASE}/registration/send_token/`, {
      token,
    },
  );
    console.log(res.data);
    
  return res.data;
}