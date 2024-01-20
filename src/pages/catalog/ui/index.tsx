// catalog.tsx
import React, { useEffect, useState } from 'react';
import s from './index.module.scss';
import { Header } from './header';
import { CardComponent } from './card';
import { Row, Col } from 'react-grid-system';
import { Radio, Space, Button, Modal } from 'antd';
import { getOrder, getProduct, putOrder } from '../api';
import { OrderApiResponse, OrderResponse, ProductResponse } from '../types';
import type { RadioChangeEvent } from 'antd';
import { ModalOrder } from './modalorder';
import { HistoryOrder } from './history_order';
import { Key } from 'react';

export interface Product {
  count: number;
  product: number;
  price: number,
  product_name: string,
  image: string,
  expired: string
}

export const Catalog = () => {
  const [getData, setGetData] = useState<ProductResponse[]>([]);
  const [value, setValue] = useState<string>("100%");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderResponse[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0)
  const [productId, setProductId] = useState<number>()
  const [actionBtn, setActionBtn] = useState<string>("")


  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const getTotalPrice = (products: Product[]): number => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const [productsHundred, setProductsHundred] = useState<Product[]>([]);
  const [productsFifty, setProductsFifty] = useState<Product[]>([]);
  const [orderUpdate, setOrderUpdate] = useState<OrderResponse[]>([]);

  console.log(orderUpdate, 'order')

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handlePagePrev = () => {
    if (page > 1) {
      setPage((prevPage: number) => prevPage - 1);
    }
  };

  const handlePageNext = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const processButtonClickHundred = (
    action: 'plus' | 'minus',
    product: number,
    price: number,
    product_name: string,
    image: string,
    expired: string
  ) => {
    const existingProductIndex = productsHundred.findIndex((p) => p.product === product);

    if (action === 'plus') {
      if (existingProductIndex !== -1) {
        const updatedProducts = [...productsHundred];
        updatedProducts[existingProductIndex].count += 1;
        updatedProducts[existingProductIndex].price += price;
        setProductsHundred(updatedProducts);
      } else {
        setProductsHundred((prevProducts: any) => [
          ...prevProducts,
          {
            product: product,
            count: 1,
            price: price,
            product_name: product_name,
            image: image,
            expired: expired
          },
        ]);
      }
    } else if (action === 'minus' && existingProductIndex !== -1) {
      const updatedProducts = [...productsHundred];
      const currentProduct = updatedProducts[existingProductIndex];

      // O'zgartirishlar
      currentProduct.price = Math.max(currentProduct.price - price, 0);
      currentProduct.count = Math.max(currentProduct.count - 1, 0);

      if (currentProduct.count === 0) {
        // Agar "count" 0 ga teng bo'lsa, mahsulotni o'chiramiz
        updatedProducts.splice(existingProductIndex, 1);
      }

      setProductsHundred(updatedProducts);
    }
  };

  const processButtonClickFifty = (
    action: 'plus' | 'minus',
    product: number,
    price: number,
    product_name: string,
    image: string,
    expired: string) => {
    const existingProductIndex = productsFifty.findIndex((p: { product: number; }) => p.product === product);

    if (action === 'plus') {
      if (existingProductIndex !== -1) {
        const updatedProducts = [...productsFifty];
        updatedProducts[existingProductIndex].count += 1;
        updatedProducts[existingProductIndex].price += price;
        setProductsFifty(updatedProducts);
      } else {
        setProductsFifty((prevProducts: any) => [
          ...prevProducts,
          {
            product: product,
            count: 1,
            price: price,
            product_name: product_name,
            image: image,
            expired: expired
          },
        ]);
      }
    } else if (action === 'minus' && existingProductIndex !== -1) {
      const updatedProducts = [...productsFifty];
      const currentProduct = updatedProducts[existingProductIndex];

      // O'zgartirishlar
      currentProduct.price = Math.max(currentProduct.price - price, 0);
      currentProduct.count = Math.max(currentProduct.count - 1, 0);

      if (currentProduct.count === 0) {
        // Agar "count" 0 ga teng bo'lsa, mahsulotni o'chiramiz
        updatedProducts.splice(existingProductIndex, 1);
      }

      setProductsFifty(updatedProducts);
    }
  };

  // const processButtonClickUpdate = (
  //   action: 'plus' | 'minus',
  //   product: number,
  //   price: number) => {
  //   const existingProductIndex = orderUpdate.findIndex((p: { product: number }) => p.product === product);

  //   if (action === 'plus') {
  //     if (existingProductIndex !== -1) {
  //       const updatedProducts = [...productsFifty];
  //       updatedProducts[existingProductIndex].count += 1;
  //       updatedProducts[existingProductIndex].price += price;
  //       setOrderUpdate(updatedProducts);
  //     } else {
  //       setOrderUpdate((prevProducts: any) => [
  //         ...prevProducts,
  //         {
  //           product: product,
  //           count: 1,
  //           price: price,
  //         },
  //       ]);
  //     }
  //   } else if (action === 'minus' && existingProductIndex !== -1) {
  //     const updatedProducts = [...productsFifty];
  //     const currentProduct = updatedProducts[existingProductIndex];

  //     // O'zgartirishlar
  //     currentProduct.price = Math.max(currentProduct.price - price, 0);
  //     currentProduct.count = Math.max(currentProduct.count - 1, 0);

  //     if (currentProduct.count === 0) {
  //       // Agar "count" 0 ga teng bo'lsa, mahsulotni o'chiramiz
  //       updatedProducts.splice(existingProductIndex, 1);
  //     }

  //     setOrderUpdate(updatedProducts);
  //   }
  // };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProduct();

        setGetData((prevData: any) => [...prevData, ...productData.results]);
      } catch (error) {
        error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productData: OrderApiResponse = await getOrder({ page });

        if (productData.results) {
          setOrderData(productData.results);
        } else {
          console.error("Error fetching product data: Results field is missing in the response.");
        }
      } catch (error) {
        error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const formatCurrencyUZS = (amount: number): string => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0, // Minimum decimal places (remove decimals)
      maximumFractionDigits: 0, // Maximum decimal places (remove decimals)
    }).format(amount);
  };


  const handleCountUpdate = (productId: number, countChange: number, actionValue: string) => {
    setCount(prevCount => prevCount + countChange);
    setProductId(productId);
    setActionBtn(actionValue)
  }

  const handleUpdateStatus = async (order_id: number) => {
    console.log(order_id, 'id');
    try {
      const orderToUpdate = orderData.find((order) => order.id === order_id);

      if (!orderToUpdate) {
        console.error("Order not found");
        return;
      }

      const updatedProducts = orderToUpdate.products.map((product) => {
        const updatedCount = product.count + count;

        return {
          ...product,
          count: updatedCount,
          price:
            product.price +
            (orderToUpdate.type_price === "100%"
              ? product.product.price1
              : product.product.price2),
        };
      });

      const total_price = updatedProducts.reduce(
        (sum, product) => sum + product.price,
        0
      );

      const updatedOrder = {
        ...orderToUpdate,
        status: 'office_manager',
        products: updatedProducts,
        total_price: total_price,
      };

      console.log(updatedOrder, 'updateOrder');
      await putOrder({ order_id, body: updatedOrder });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Header headerProp={{ setOpen }} />
      <HistoryOrder historyProp={{
        open,
        setOpen,
        orderData,
        handlePageNext,
        handlePagePrev,
        page,
        loading,
        setLoading,
        setOrderData,
        handleUpdateStatus,
        handleCountUpdate,
        count,
        productId,
      }} />
      <div className={s.catalog_section}>
        <div className={s.catalog_container}>
          <div className={s.catalog_row_wrapper}>
            <Row>
              <Col lg={8}>
                {getData.map((item: {
                  price2: number | undefined; id: any; name: any; count: any; expired_date: any; price1: any; image_mobile: any; warehouse_count: any; composition: any; seria: any;
                }, index: Key | null | undefined) => (
                  <CardComponent key={index} keyProp={{
                    id: item.id,
                    name: item.name,
                    count: item.count,
                    expired_date: item.expired_date,
                    price1: item.price1,
                    price2: item.price2,
                    image_mobile: item.image_mobile,
                    warehouse_count: item.warehouse_count,
                    composition: item.composition,
                    seria: item.seria,
                    processButtonClickHundred,
                    processButtonClickFifty,
                    value: value,
                  }} />
                ))}
              </Col>
              <Col lg={4}>
                <div className={s.section}>
                  <div className={s.about}>
                    <div className={s.about_product}>
                      <p>Tovarlar ({productsHundred?.length})</p>
                      <p>{value === "100%" ? formatCurrencyUZS(getTotalPrice(productsHundred)) : formatCurrencyUZS(getTotalPrice(productsFifty))}</p>
                    </div>
                    <div className={s.about_product}>
                      <p>Yetkazib berish</p>
                      <p>Bupel</p>
                    </div>
                    <div className={s.about_product_price}>
                      <p>Jami:</p>
                      <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                          <Radio className={s.radio_btn} value={"50%"}> {formatCurrencyUZS(getTotalPrice(productsFifty))}  <sup className={s.sup}>(50%)</sup></Radio>
                          <Radio className={s.radio_btn} value={"100%"}> {formatCurrencyUZS(getTotalPrice(productsHundred))} <sup className={s.sup}>(100%)</sup></Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                    <Button disabled={productsFifty.length === 0 && productsHundred.length === 0} onClick={showModal}>Buyurtma berish</Button>
                  </div>
                  <ModalOrder modalProp={{
                    setIsModalOpen, isModalOpen, value, productsHundred, productsFifty, getTotalPrice
                  }} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};



