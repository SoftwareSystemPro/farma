import * as yup from 'yup';
import { numberFormat } from '@/shared/lib/number-format';

const requiredPhone = 'Telefon raqami maydonini kiritish shart.';

export interface ILoginForm {
  phone_number: string;
}

export const loginSchema = yup.object().shape({
  phone_number: yup
    .string()
    .required(requiredPhone)
    .test('phone_number', requiredPhone, (value) => {
      if (!value) {
        return false;
      }
      return numberFormat(value).toString().length === 12;
    })
});
