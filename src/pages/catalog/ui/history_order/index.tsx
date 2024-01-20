/* eslint-disable react/no-unescaped-entities */
import React, { SetStateAction, useEffect, useState } from 'react';

import { Button, Drawer, List, Result, Select, Space, Spin, Tabs } from 'antd';
import './index.css'
import { getOrderFilter, getRegion, getReviewed, getUnReviewed, putOrder, putOrderStatus } from '../../api';
import { OrderFilterResponse, OrderResponse, RegionResponse, ReviewResponse } from '../../types';
import type { TabsProps } from 'antd';
import s from '../card/index.module.scss'
import { InboxOutlined } from '@ant-design/icons';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';


interface HistoryOrderProps {
    historyProp: {
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
        open: boolean,
        page: number,
        orderData: OrderResponse[]
        handlePagePrev: any,
        handlePageNext: any,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
        loading: boolean,
        setOrderData: React.Dispatch<SetStateAction<OrderResponse[]>>;
        handleCountUpdate: (productId: number, countChange: number, actionValue: string) => void,
        count: number,
        productId: number | undefined,
        handleUpdateStatus: (order_id:number) => void

    };
}

export const HistoryOrder: React.FC<HistoryOrderProps> = ({ historyProp }) => {
    const { open,
        setOpen,
        orderData,
        page,
        handlePagePrev,
        handlePageNext,
        loading,
        setLoading,
        count,
        handleCountUpdate,
        handleUpdateStatus,
        productId
    } = historyProp
    const [orderId, setOrderId] = useState<string>()
    const [filteredOrderData, setFilteredOrderData] = useState<OrderFilterResponse[]>([]);
    const [district, setDistrict] = useState<number | undefined>(0);
    const [region, setRegion] = useState<Array<RegionResponse>>([])
    const [choose, setChoose] = useState<boolean>(true)
    const companyAddres: any[] | undefined = []
    // const [productsUpdate, setProductsUpdate] = useState<Product[]>([])
    const [action, setAction] = useState<string>("")
    const [reviewed, setReviewed] = useState<Array<ReviewResponse>>([])
    const [unReviewed, setUnReviewed] = useState<Array<ReviewResponse>>([])
    const results = district ? filteredOrderData : orderData
    const reviewResult = action === 'tasdiqlangan' ? reviewed : unReviewed
    // const [count, setCount] = useState<number>(0)
    // const [productId, setProductId] = useState<number>()
    const [actionBtn, setActionBtn] = useState<string>("")

    const lastResult = choose === true ? results : reviewResult
    console.log(productId, 'count')


    const formattedDate = (dateTimeString: any) => {
        const date = new Date(dateTimeString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    const formatCurrencyUZS = (amount: number): string => {
        return new Intl.NumberFormat('uz-UZ', {
            style: 'currency',
            currency: 'UZS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const regionData = await getRegion();
                setRegion(regionData.results);
            } catch (error) {
                error
            }
        };
        fetchRegion();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (district !== undefined) {
                    setLoading(true)
                    const filterData: OrderFilterResponse[] = await getOrderFilter({ district });
                    setFilteredOrderData(filterData)
                }
            } catch (error) {
                error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [district, setLoading]);




    // const handleCountUpdate = (productId: number, countChange: number, actionValue: string) => {
    //     setCount(prevCount => prevCount + countChange);
    //     setProductId(productId);
    //     setActionBtn(actionValue)
    // }

    // const handleUpdateStatus = async (order_id: number) => {
    //     console.log(order_id, 'id')
    //     try {
    //         const orderToUpdate = orderData.find(order => order.id === order_id);

    //         if (!orderToUpdate) {
    //             console.error("Order not found");
    //             return;
    //         }


    //         const updatedProducts = orderToUpdate.products.map(product => ({
    //             ...product,
    //             product: product.product,
    //             count: product.count + count,
    //             price: product.price + (orderToUpdate.type_price === "100%" ? product.product.price1 : product.product.price2)
    //         }));

    //         const total_price = updatedProducts.reduce((sum, product) => sum + product.price, 0);

    //         const updatedOrder = {
    //             ...orderToUpdate,
    //             status: 'office_manager',
    //             products: updatedProducts,
    //             total_price: total_price
    //         };

    //         console.log(updatedOrder, 'updateOrder');
    //         await putOrder({ order_id, body: updatedOrder });
    //         window.location.reload();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // const handleUpdateStatus = async (order_id: number) => {
    //     console.log(order_id, 'id');
    //     try {
    //         const orderToUpdate = orderData.find((order) => order.id === order_id);

    //         if (!orderToUpdate) {
    //             console.error("Order not found");
    //             return;
    //         }

    //         const updatedProducts = orderToUpdate.products.map((product) => {
    //             const updatedCount = product.count + count;

    //             return {
    //                 ...product,
    //                 count: updatedCount,
    //                 price:
    //                     product.price +
    //                     (orderToUpdate.type_price === "100%"
    //                         ? product.product.price1
    //                         : product.product.price2) * updatedCount,
    //             };
    //         });

    //         const total_price = updatedProducts.reduce(
    //             (sum, product) => sum + product.price,
    //             0
    //         );

    //         const updatedOrder = {
    //             ...orderToUpdate,
    //             status: 'office_manager',
    //             products: updatedProducts,
    //             total_price: total_price,
    //         };

    //         console.log(updatedOrder, 'updateOrder');
    //         await putOrder({ order_id, body: updatedOrder });
    //         window.location.reload();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleUpdateStatus = async (order_id: number) => {
    //     try {
    //         const body = {
    //             status: "office_manager"
    //         }
    //      const response = await putOrderStatus({ order_id, body: body });
    //     if(response) {
    //         console.log('status_change')
    //     }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }



    useEffect(() => {
        const fetchReviewed = async () => {
            try {
                const reviewedData = await getReviewed();
                setReviewed(reviewedData);
            } catch (error) {
                error
            }
        };
        fetchReviewed();
    }, []);

    useEffect(() => {
        const fetchUnReviewed = async () => {
            try {
                const unReviewedData = await getUnReviewed();
                setUnReviewed(unReviewedData);
            } catch (error) {
                error
            }
        };
        fetchUnReviewed();
    }, []);



    const onClose = () => {
        setOpen(false);
    };
    const onChange = (key: string) => {
        setOrderId(key);
    }

    const items: TabsProps['items'] = [];
    lastResult.map((elem, index) => (
        items.push({
            key: String(index),
            label: (
                <div id={elem.id} className='tabs_label'>
                    <p>
                        {elem.inn}
                    </p>
                </div>
            ),
            children: <>
                <div className='header_wrapper'>
                    <div className='header_wrapper_item'>
                        <div className='header_price'>
                            <p style={{ marginRight: "10px" }}>Umumiy narxi:</p>
                            <p>{formatCurrencyUZS(Number(elem?.total_price) ?? 0)}</p>
                        </div>
                        <div className='header_price'>
                            <p style={{ marginRight: "10px" }}>To'lov foizi:</p>
                            <p>{elem.type_price}</p>
                        </div>
                    </div>
                    <div>
                        {
                            elem?.status === "office_manager" ? null : (
                                <>
                                    <Button
                                        id={elem.id ? elem.id.toString() : undefined}
                                        onClick={() => {
                                            if (elem.id !== undefined) {
                                                handleUpdateStatus(elem.id);
                                            }
                                        }}
                                        className='confirmation'>
                                        Tasqidlash
                                    </Button>
                                </>
                            )
                        }
                    </div>
                </div>
                <List
                    bordered
                    className='history_list'
                    dataSource={elem.products}
                    key={elem.id}
                    renderItem={(item: any) => (
                        <>
                            <List.Item key={item.product.id}>
                                <div id={item.product.id} key={item.product.id} style={{ width: "100%" }}>
                                    <div id={item.product.id} className={s.card_wrapper} style={{ margin: "0" }}>
                                        <div className={s.card_img_wrapper}>
                                            <img width="150px" height="100px" src={item.product.image_mobile} alt="" />
                                        </div>
                                        <div className={s.card_content_wrapper}>
                                            <div className={s.card_info_wrap}>
                                                <div className={s.info_list}>
                                                    <div className={s.info_list_item} style={{ marginBottom: "5px" }}>
                                                        <p>Mahsulot nomi</p>
                                                        <p>{item.product.name}</p>
                                                    </div>
                                                    <div className={s.info_list_item} style={{ marginBottom: "5px" }}>
                                                        <p>Mahsulot soni</p>
                                                        <p>{item.count}ta</p>
                                                    </div>
                                                    <div className={s.info_list_item} style={{ marginBottom: "5px" }}>
                                                        <p>Summasi</p>
                                                        <p>{formatCurrencyUZS(Number(item?.price) ?? 0)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            elem.status === 'office_manager' ? null : (
                                                <div id={item.product.id} className={s.card_count_wrap}>
                                                    <div id={item.product.id} className={s.count_btn_wrap}>
                                                        <Button
                                                            id={item.product.id}
                                                            onClick={() => handleCountUpdate(item.product.id, -1, 'decrement')}
                                                            className={s.count_btn} shape="circle">
                                                            <MinusOutlined id={item.product.id} />
                                                        </Button>
                                                        <p>{item.count + count}</p>
                                                        <Button
                                                            onClick={() => handleCountUpdate(item.product.id, 1, 'increment')}
                                                            id={item.product.id}
                                                            className={s.count_btn} shape="circle">
                                                            <PlusOutlined id={item.product.id} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </List.Item>
                        </>
                    )}
                />
            </>,
        })
    ))

    region.map((elem: any) => (
        companyAddres.push({
            value: elem.id,
            label: elem.name,
        })
    ))



    const handleCompanyAddress = (value: number) => {
        setDistrict(value);
        setChoose(true)
    };

    const handleAction = (value: string) => {
        setAction(value)
        setChoose(false)
    }




    return (
        <>
            <Drawer width={"90%"} extra={
                <Space>
                    <Button className='close_btn' onClick={onClose}>Yopish</Button>
                </Space>
            } title="Buyurtmalar tarixi" placement="right" open={open}>
                <div className='filter_wrapp'>
                    <Select
                        allowClear
                        placeholder="Viloyatni tanlang"
                        className="select"
                        bordered={true}
                        onChange={handleCompanyAddress}
                        options={companyAddres}
                    />
                    <Select
                        style={{
                            marginLeft: "20px"
                        }}
                        allowClear
                        placeholder="Holatni tanlang"
                        className="select"
                        bordered={true}
                        onChange={handleAction}
                        options={
                            [
                                {
                                    label: "Tasdiqlangan",
                                    value: "tasdiqlangan"
                                },
                                {
                                    label: "Tasdiqlanmagan",
                                    value: "tasdiqlanmagan"
                                }
                            ]
                        }
                    />

                    {
                        district || action ? null : (
                            <div className='pagination'>
                                <Button className='pagi_btn' disabled={page <= 1 ? true : false} onClick={handlePagePrev} type="primary">Ortga</Button>
                                <Button className='count_pagination'>{page}/{orderData?.length}</Button>
                                <Button className='pagi_btn' disabled={orderData?.length >= 25 ? false : true} onClick={handlePageNext} type="primary">Oldinga</Button>
                            </div>
                        )
                    }
                </div>
                {loading ? (
                    <div className='loading_wrapper'>
                        <Spin size="large" tip="Loading..." />
                    </div>
                ) :
                    <>
                        {
                            results?.length ? <Tabs rootClassName='history_tabs' tabPosition='right' defaultActiveKey="0" items={items} onChange={onChange} /> : <Result
                                icon={<InboxOutlined />}
                                title="Hech qanday malumot topilmadi!"
                            />
                        }

                    </>
                }
            </Drawer>
        </>
    );
};

