// api.ts
import axios from 'axios';
import { ProductResponse, OrderProductResponse, CompanyResponse, RegionResponse, OrderResponse, OrderApiResponse, OrderFilterResponse, OrderPutStatusResponse, ReviewResponse } from './types';
import { UserRoleResponse } from './ui/modalorder';



export async function getProduct(): Promise<{ results: ProductResponse[] }> {
  try {
    const response = await axios.get('https://dilshod22.pythonanywhere.com/version1/product/product/', {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Error fetching product data: ' + error);
  }
}

export async function getCompany(): Promise<{ results: CompanyResponse[] }> {
  try {
    const response = await axios.get('https://dilshod22.pythonanywhere.com/version1/order/web_company/', {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Error fetching product data: ' + error);
  }
}

export async function postCompany(formData: any): Promise<CompanyResponse> {
  try {
    const response = await axios.post(
      'https://dilshod22.pythonanywhere.com/version1/order/web_company/',
      formData,
      {
        headers: {
          Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error posting company data: ' + error);
  }
}

export async function orderProduct(body: any): Promise<OrderProductResponse> {
  try {
    const response = await axios.post(
      'https://dilshod22.pythonanywhere.com/version1/order/web_order/',
      body,
      {
        headers: {
          Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product data: ' + error);
  }
}

export async function getOrder({ page }: { page: number }): Promise<OrderApiResponse> {
  try {
    const response = await axios.get(`https://dilshod22.pythonanywhere.com/version1/order/web_order/?page=${page}`, {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product data: ' + error);
  }
}

export async function getRegion(): Promise<{ results: RegionResponse[] }> {
  try {
    const response = await axios.get('https://dilshod22.pythonanywhere.com/version1/users/district/')
    return response.data
  } catch (error) {
    throw new Error('Error fetching product data: ' + error);
  }
}

export async function getUserRole({ role, id }: { role: string, id: string | number }): Promise<UserRoleResponse[]> {
  try {
    const url = `https://dilshod22.pythonanywhere.com/version1/users/registration/village_agent_manager/?role=${role}&village=${id}`;
    console.log('Request URL:', url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      },
    });

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw new Error('Error fetching user role: ' + error);
  }
}

export async function getOrderFilter({ district }: { district: number }): Promise<OrderFilterResponse[]> {
  try {
    const response = await axios.get(`https://dilshod22.pythonanywhere.com/version1/order/web_order/order_filter_region/?district=${district}`, {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching filtered order data: ' + error);
  }
}

export async function putOrderStatus({ order_id, body }: { order_id: number, body: any }): Promise<OrderPutStatusResponse> {
  try {
    const response = await axios.put(`https://dilshod22.pythonanywhere.com/version1/order/order/${order_id}/status_update/`, body, {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching filtered order data: ' + error);
  }
}

export async function putOrder({ order_id, body }: { order_id: number, body: any }): Promise<OrderPutStatusResponse> {
  try {
    const response = await axios.put(`https://dilshod22.pythonanywhere.com/version1/order/web_order/${order_id}/`, body, {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching filtered order data: ' + error);
  }
}


export async function getReviewed(): Promise<ReviewResponse[]> {
  try {
    const response = await axios.get('https://dilshod22.pythonanywhere.com/version1/order/web_order/order_filter_reviewed/', {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Error fetching product data: ' + error);
  }
}

export async function getUnReviewed(): Promise<ReviewResponse[]> {
  try {
    const response = await axios.get('https://dilshod22.pythonanywhere.com/version1/order/web_order/order_filter_unreviewed/', {
      headers: {
        Authorization: `Token e2cefaf4362592f8deccc9864c8d83e76ff8a5b1`,
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Error fetching product data: ' + error);
  }
}


