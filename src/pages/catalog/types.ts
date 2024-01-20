/* eslint-disable @typescript-eslint/no-empty-interface */
import { ReactNode } from "react";

export interface ProductResponse {
  seria: string;
  composition: string;
  warehouse_count: number;
  image_mobile: string;
  price1: number;
  price2: number;
  expired_date: string;
  count: number;
  id: string;
  name: string;
  results(results: any): unknown;
  data: [];
  processButtonClickHundred: (action: 'plus' | 'minus', product: number, price: number, product_name: string, image: string, expired: string) => void;
  processButtonClickFifty: (action: 'plus' | 'minus', product: number, price: number, product_name: string, image: string, expired: string) => void;
  value: string,
  company_name: string
}
export interface CardComponentProps {
  keyProp: Partial<ProductResponse>;
}

export interface CompanyResponse {
  company_address: string;
  company_name: string;
  inn: string;
}

export interface RegionResponse {
  id: any;
  name: string
}

export interface OrderProductResponse {
  total_price(total_price: any, arg1: string): unknown;
  results: ProductResponse[];
}

export interface OrderResponse {
  type_price: ReactNode;
  total_price: ReactNode;
  inn: ReactNode;
  products: any[];
  id: number;
  created_date: ReactNode;
  phone_number: ReactNode;
  company_name: ReactNode;
  results: ProductResponse[];
  status: string
}

export interface OrderApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderResponse[];
}

export interface OrderFilterResponse {
  type_price: ReactNode;
  products: any[] | undefined;
  inn: ReactNode;
  total_price: ReactNode
  data: [];
  id: number;
  status: string
}

export interface OrderPutStatusResponse {
  status: string
}

export interface ReviewResponse{
    price(arg0: string, id: any, price: any): void;
    products: any[] | undefined;
    id: any;
    status: string;
    type_price: ReactNode;
    total_price: ReactNode;
    inn: ReactNode;
}



export interface UserRoleResponse {
  data: []
}
