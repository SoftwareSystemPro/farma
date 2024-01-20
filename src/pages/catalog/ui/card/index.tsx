// CardComponent.tsx
import React, { useState } from 'react';
import s from './index.module.scss';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Col, Row } from 'react-grid-system';
import { CardComponentProps } from '../../types';


export const CardComponent: React.FC<CardComponentProps> = ({ keyProp }) => {
  const [count, setCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatCurrencyUZS = (amount: number): string => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0, // Minimum decimal places (remove decimals)
      maximumFractionDigits: 0, // Maximum decimal places (remove decimals)
    }).format(amount);
  };


  return (
    <>
      <div id={keyProp.id} className={s.card_wrapper}>
        <div className={s.card_img_wrapper}>
          <img onClick={showModal} width="189px" height="100%" src={keyProp.image_mobile} alt="" />
        </div>
        <div className={s.card_content_wrapper}>
          <div className={s.card_info_wrap}>
            <h4>{keyProp.name}</h4>
            <div className={s.info_list}>
              <div className={s.info_list_item}>
                <p>Mahsulot soni</p>
                <p>{keyProp.count}</p>
              </div>
              <div className={s.info_list_item}>
                <p>Amal qilish muddati</p>
                <p>{keyProp.expired_date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.card_count_wrap}>
          <div className={s.price_wrapp}>
          <p>{formatCurrencyUZS(keyProp?.price1 ?? 0)} </p>
            <div className={s.border_div} />
            <p>{formatCurrencyUZS(keyProp?.price2 ?? 0)} </p>
          </div>
          <div className={s.count_btn_wrap}>
            <Button id={keyProp.id} onClick={() => {
              if (keyProp.processButtonClickHundred) {
                keyProp.processButtonClickHundred(
                  'minus',
                  Number(keyProp.id),
                  Number(keyProp.price1),
                  String(keyProp.name),
                  String(keyProp.image_mobile),
                  String(keyProp.expired_date)
                );
                setCount(count - 1);
              }
              if (keyProp.processButtonClickFifty) {
                keyProp.processButtonClickFifty(
                  'minus',
                  Number(keyProp.id),
                  Number(keyProp.price2),
                  String(keyProp.name),
                  String(keyProp.image_mobile),
                  String(keyProp.expired_date)
                );
                setCount(count - 1);
              }
            }}

              disabled={count === 0} className={s.count_btn} shape="circle">
              <MinusOutlined />
            </Button>
            <p>{count}</p>
            <Button id={keyProp.id} onClick={() => {
              if (keyProp.processButtonClickHundred) {
                keyProp.processButtonClickHundred(
                  'plus',
                  Number(keyProp.id),
                  Number(keyProp.price1),
                  String(keyProp.name),
                  String(keyProp.image_mobile),
                  String(keyProp.expired_date)
                );
                setCount(count + 1);
              }
              if (keyProp.processButtonClickFifty) {
                keyProp.processButtonClickFifty(
                  'plus',
                  Number(keyProp.id),
                  Number(keyProp.price2),
                  String(keyProp.name),
                  String(keyProp.image_mobile),
                  String(keyProp.expired_date)
                );
                setCount(count + 1);
              }
            }} className={s.count_btn} shape="circle">
              <PlusOutlined />
            </Button>
          </div>
        </div>
      </div>
      <Modal width={900} title={keyProp.name} footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={s.modal_content_wrapper}>
          <Row>
            <Col lg={6}>
              <img width="100%" height="100%" src={keyProp.image_mobile} alt="" />
            </Col>
            <Col lg={6}>
              <div className={s.modal_info_wrap}>
                <h4>{keyProp.name}</h4>
                <div className={s.info_list}>
                  <div className={s.info_list_item}>
                    <p>Mahsulot soni:</p>
                    <p>{keyProp.count}</p>
                  </div>
                  <div className={s.info_list_item}>
                    <p>Amal qilish muddati:</p>
                    <p>{keyProp.expired_date}</p>
                  </div>
                  <div className={s.info_list_item}>
                    <p>Omborda bor:</p>
                    <p>{keyProp.warehouse_count}</p>
                  </div>
                  <div className={s.info_list_item}>
                    <p>Seria raqami:</p>
                    <p>{keyProp.seria}</p>
                  </div>
                  <div className={s.info_list_items}>
                    <p>Sharh:</p>
                    <p>{keyProp.composition}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

    </>
  );
};
