import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Form, Input, Checkbox, Button, Select, message } from 'antd';
import type { TabsProps } from 'antd';
import { Col, Row } from 'react-grid-system';
import s from './style.module.scss'
import './style.css'
import { getCompany, getRegion, getUserRole, orderProduct, postCompany } from '../../api';
import { CompanyResponse, RegionResponse } from '../../types';
import { Product } from '../index';
const { TextArea } = Input;



interface ModalOrderProps {
  modalProp: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    value: string;
    productsHundred: Product[];
    productsFifty: Product[];
    getTotalPrice: (products: Product[]) => number;
  };
}

export interface UserRoleResponse {
  role: any;
  id: any;
  first_name: string;
  last_name: string;
}

export const ModalOrder: React.FC<ModalOrderProps> = ({ modalProp }) => {
  const { isModalOpen, setIsModalOpen, value, productsFifty, productsHundred, getTotalPrice } = modalProp;
  const [messageApi, contextHolder] = message.useMessage();
  const [companies, setCompanies] = useState<Array<CompanyResponse>>([]);
  const [selectCompany, setSelectCompany] = useState<string>("")
  const [addresCompany, setAddressCompany] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [inn, setInn] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [region, setRegion] = useState<Array<RegionResponse>>([])
  const regionId = region.find(elem => elem.name === addresCompany);
  const [roleData, setRoleData] = useState<Array<UserRoleResponse>>([])
  const [status, setStatus] = useState<string>("")
  const [orderTaker, setOrderTaker] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)




  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const errorResponse = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };






  const companyName: any[] | undefined = []
  const companyAddres: any[] | undefined = []
  const orderTakerData: any[] | undefined = []



  companies.map((elem) => {
    const name = elem.company_name.trim(); // Bo'shliqlarni olib tashlash
    const isDuplicate = companyName.some((item) => item.value === name);

    if (name && !isDuplicate) {
      companyName.push({
        value: name,
        label: name,
      });
    }
  });

  region.map((elem) => (
    companyAddres.push({
      value: elem.id,
      label: elem.name,
    })
  ))

  roleData?.map((elem) => (
    orderTakerData.push({
      value: elem.id,
      label: `${elem.first_name} ${elem.last_name}`
    })
  ))


  const onChange = (key: string) => {
    return key;
  };

  // Create Company function
  // Ma'lumotlarni saqlash uchun state
  const [companyInn, setCompanyInn] = useState<string>("");
  const [companyNames, setCompanyNames] = useState<string>("")

  // Formni yuborish uchun event handler
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // postCompany ni chaqirib, ma'lumotlarni yuborish
      const formData = new FormData();
      formData.append("inn", companyInn)
      formData.append("company_name", companyNames)
      const response = await postCompany(formData);

      // Ma'lumotlarni saqlash
       window.location.reload()
      response && success()

      // Qanday ish bajarilsa, uni natijasini foydalanuvchiga ko'rsatish, masalan, modalni yopish
      setIsModalOpen(false);
    } catch (error) {
      error && errorResponse()
    }
  };
  // Create Company function



  const handleOrder = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault()
    try {
      setLoading(true);
      const body = {
        products: value === "100%" ? [...productsHundred] : [...productsFifty],
        inn: inn,
        comment: comment,
        total_price: value === "100%" ? getTotalPrice(productsHundred) : getTotalPrice(productsFifty),
        type_price: value,
        phone_number: phone,
        seller: orderTaker,
        district: addresCompany,
        status: null
      }

     
      // Buyurtma yuborish
      const response = await orderProduct(body);
      await response && success()
      setIsModalOpen(false);
    } catch (error) {
      error && errorResponse()
    } finally {
      setLoading(false);
    }
  };


  // Company get
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // getCompany dan qaytgan ma'lumotlarni olish
        const companyData = await getCompany();

        // Olingan ma'lumotlarni useState orqali state ga saqlash
        setCompanies(companyData.results);
      } catch (error) {
         error;
      }
    };

    // useEffect orqali fetchCompanies ni chaqirish
    fetchCompanies();
  }, []);


  // Region get
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        // getRegion dan qaytgan ma'lumotlarni olish
        const regionData = await getRegion();

        // Olingan ma'lumotlarni useState orqali state ga saqlash
        setRegion(regionData.results);
      } catch (error) {
         error;
      }
    };

    // useEffect orqali fetchRegion ni chaqirish
    fetchRegion();
  }, []);

  const handleCompanyName = (value: string) => {
    setSelectCompany(value);
  };

  const handleCompanyAddress = (value: string) => {
    setAddressCompany(value);
  };

  const handleUserRole = async (value: string) => {
    try {
      const result = await getUserRole({ role: value, id: addresCompany });
      setRoleData(result);
      setStatus(value)
    } catch (error) {
      error
    }
    setIsOpen(true)
  };


  const handleOrderTaker = (value: string) => {
    setOrderTaker(value)
  }



  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Buyurtma oluvchi',
      children: <>
        <div style={{ width: "100%" }}>
          <form
            onSubmit={handleOrder}
            className={s.form}
            autoComplete="off"
          >
            <Row className={s.row}>
              {/* <Col lg={6} className={s.col}>
                <div
                  className={s.input_wrapper}
                >
                  <label className={s.input_label}>Kompaniya</label>
                  <Select
                    allowClear
                    placeholder="Tanlang"
                    className={s.select}
                    bordered={false}
                    onChange={handleCompanyName}
                    options={companyName}
                  />
                </div>
              </Col> */}
              <Col lg={6} className={s.col}>
                <div
                  className={s.input_wrapper}
                >
                  <label className={s.input_label}>INN</label>
                  <Input type='number' onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInn(e.target.value)} className={s.input} />
                </div>
              </Col>
              <Col lg={6} className={s.col}>
                <div className={s.input_wrapper}
                >
                  <label className={s.input_label}>Telefon raqam</label>
                  <Input type='tel' onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhone(e.target.value)} className={s.input} />
                </div>
              </Col>
              <Col lg={6} className={s.col}>
                <div
                  className={s.input_wrapper}
                >
                  <label className={s.input_label}>Region</label>
                  <Select
                    allowClear
                    placeholder="Tanlang"
                    className={s.select}
                    bordered={false}
                    onChange={handleCompanyAddress}
                    options={companyAddres}
                  />
                </div>
              </Col>
              {addresCompany == "" ? null : <Col lg={6} className={s.col}>
                <div
                  className={s.input_wrapper}
                >
                  <label className={s.input_label}>Role</label>
                  <Select
                    allowClear
                    placeholder="Tanlang"
                    className={s.select}
                    bordered={false}
                    onChange={handleUserRole}
                    options={[
                      {
                        value: "agent",
                        label: "Agent",
                      },
                      {
                        value: "office_manager",
                        label: "Ofis menejeri",
                      }
                    ]}
                  />
                </div>
              </Col>}
              {isOpen === true ? (
                <Col lg={6} className={s.col}>
                  <div
                    className={s.input_wrapper}
                  >
                    <label className={s.input_label}>Buyurtmani oluvchi</label>
                    <Select
                      allowClear
                      placeholder="Tanlang"
                      className={s.select}
                      bordered={false}
                      onChange={handleOrderTaker}
                      options={orderTakerData}
                    />
                  </div>
                </Col>
              ) : null}

              <Col className={s.col} lg={12}>
                <div className={s.input_wrapper}>
                  <label className={s.input_label}>Izoh</label>
                  <TextArea placeholder='Yozing...' onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setComment(e.target.value)} className={s.textArea} rows={4} autoSize={{ minRows: 3, maxRows: 6 }} />
                </div>
              </Col>
            </Row>
            <div>
              {contextHolder}
              <button  className={s.form_btn} type="submit">
                Tasdiqlash
              </button>
            </div>
          </form>
        </div>
      </>,
    },
    {
      key: '2',
      label: "Kompaniya qo'shish",
      children: <>
        <div style={{ width: "100%" }}>
          <form
            onSubmit={handleCreateCompany}
            className={s.form}
            autoComplete="off"
          >
            <Row className={s.row}>
              <Col lg={6} className={s.col}>
                <div
                  className={s.input_wrapper}
                >
                  <label className={s.input_label}>INN</label>
                  <Input onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCompanyInn(e.target.value)} className={s.input} />
                </div>
              </Col>
              <Col lg={6} className={s.col}>
                <div className={s.input_wrapper}
                >
                  <label className={s.input_label}>Kompaniya nomi</label>
                  <Input onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCompanyNames(e.target.value)} className={s.input} />
                </div>
              </Col>

            </Row>
            <div className={s.btn_wrapper}>
              {contextHolder}
              <button className={s.form_btn} type="submit">
                Qoshish
              </button>
            </div>
          </form>
        </div>
      </>,
    }
  ];

  return (
    <>
      <Modal footer={false} open={isModalOpen} width={800} onOk={handleOk} onCancel={handleCancel}>
        <Tabs animated={true} tabBarStyle={{ padding: "10px 0" }} className={s.tabBar} defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </>
  );
};

