import React, { useState } from 'react';
import {
  Layout,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Table,
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  Space,
  Divider
} from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  SaveOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form] = Form.useForm();

  // Данные для таблицы
  const tableData = [
    {
      key: '1',
      col1: 'Данные 1-1',
      col2: 'Данные 1-2',
      col3: 'Данные 1-3',
      col4: 'Данные 1-4',
      col5: 'Данные 1-5',
      col6: 'Данные 1-6',
    },
    {
      key: '2',
      col1: 'Данные 2-1',
      col2: 'Объединенные ячейки 2-2 и 2-3',
      col3: 'Объединенные ячейки 2-2 и 2-3',
      col4: 'Данные 2-4',
      col5: 'Данные 2-5',
      col6: 'Данные 2-6',
    },
    {
      key: '3',
      col1: 'Данные 3-1',
      col2: 'Данные 3-2',
      col3: 'Данные 3-3',
      col4: 'Данные 3-4',
      col5: 'Объединенные строки 3-5 и 4-5',
      col6: 'Данные 3-6',
    },
    {
      key: '4',
      col1: 'Данные 4-1',
      col2: 'Данные 4-2',
      col3: 'Данные 4-3',
      col4: 'Данные 4-4',
      col5: 'Объединенные строки 3-5 и 4-5',
      col6: 'Данные 4-6',
    },
  ];

  // Колонки таблицы с объединенными ячейками
  const tableColumns = [
    {
      title: 'Колонка 1',
      dataIndex: 'col1',
      key: 'col1',
    },
    {
      title: 'Колонка 2',
      dataIndex: 'col2',
      key: 'col2',
      onCell: (_, index) => {
        if (index === 1) {
          return { colSpan: 2 }
        }
        return {}
      },
    },
    {
      title: 'Колонка 3',
      dataIndex: 'col3',
      key: 'col3',
      onCell: (_, index) => {
        if (index === 1) {
          return { colSpan: 0 }
        }
        return {}
      },
    },
    {
      title: 'Колонка 4',
      dataIndex: 'col4',
      key: 'col4',
    },
    {
      title: 'Колонка 5',
      dataIndex: 'col5',
      key: 'col5',
      onCell: (_, index) => {
        if (index === 2 || index === 3) {
          return { rowSpan: index === 2 ? 2 : 0 }
        }
        return {}
      },
    },
    {
      title: 'Колонка 6',
      dataIndex: 'col6',
      key: 'col6',
    },
  ];

  // Обработчик отправки формы
  const onFinish = (values) => {
    console.log('Form values:', values);
    alert('Форма отправлена!');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <div className="site-header">
        <div className="header-content">
          <div className="logo-section">
            <img src = "image.png" alt = "Лого" width={50}/>
            <Title level={3} className="site-title">
              Название сайта
            </Title>
          </div>

          {/* Навигация - вертикальная на mobile, горизонтальная на desktop */}
          <nav className="site-navigation">
            <a href="#home" className="nav-link">Ссылка меню 1</a>
            <a href="#about" className="nav-link">Ссылка 2</a>
            <a href="#contact" className="nav-link">Ссылка 3</a>
          </nav>
        </div>
      </div>
      {/* Content */}
      <Content style={{ padding: '20px 15px' }}>
        <Row gutter={[16, 16]} style={{ maxWidth: '100%', margin: '0 auto' }}>

          {/* Таблица - на mobile первая, на desktop вторая */}
          <Col xs={24} lg={24} style={{ order: 1 }}>
            <Card title="Таблица данных" bordered={false}>
              <Table
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
                bordered
                size="middle"
                scroll={{ x: true }}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
                }
              />
            </Card>
          </Col>

          {/* Ссылки - на mobile вторая, на desktop первая */}
          <Col xs={24} lg={24} style={{ order: 2 }}>
            <Card title="Маркированный список гиперссылок" bordered={false}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
                  <li style={{ marginBottom: '8px' }}>
                    <Link href="http://kubsu.ru" target="_blank">
                      Абсолютная гиперссылка на главную страницу сайта kubsu.ru
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="https://kubsu.ru" target="_blank">
                      Абсолютная гиперссылка на главную страницу сайта kubsu.ru (HTTPS)
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="https://kubsu.ru" title="Цветок"><img src="image.jpg" alt="Цветок" width="300" height="300"></img></Link>    
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="/about" title="Сокращенная ссылка на внутреннюю страницу">
                      Сокращенная ссылка на внутреннюю страницу
                    </Link>
                  </li>

                  <li style={{marginBottom: '8px' }}>
                    <Link href="/" title="Сокращенная ссылка на главную страницу">
                      Сокращенная ссылка на главную страницу
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="#fragment">
                      Ссылка на фрагмент текущей страницы
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Text>
                      Это <Link href="#fragment">контекстная ссылка</Link> в тексте абзаца
                    </Text>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="index.html?param1=value1&param2=value2&param3=value3" title="Ссылка с тремя параметрами">
                      Ссылка с тремя параметрами
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="index.html?id=123" title="Ссылка с параметром id">
                      Ссылка с параметром id
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="index.html" title="Относительная ссылка в текущем каталоге">
                      Относительная ссылка в текущем каталоге
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="about/index.html" title="Относительная ссылка в каталоге about">
                      Относительная ссылка в каталоге about
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="../../index.html" title="Относительная ссылка двумя уровнями выше">
                      Относительная ссылка двумя уровнями выше
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <img
                      src="/image.jpg"
                      alt="Карта-изображение"
                      useMap="#exampleMap"
                      width={300}
                    />
                    <map name="exampleMap">
                      <area
                        shape="rect"
                        coords="30,30,130,80"
                        href="https://kubsu.ru"
                        alt="Прямоугольная область"
                        title="КубГУ"
                      />
                      <area
                        shape="circle"
                        coords="200,120,30"
                        href="https://kubsu.ru/en"
                        alt="Круглая область"
                        title="English version"
                      />
                    </map>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Link href="https://kubsu.ru" rel="nofollow">
                      Ссылка без перехода поисковиками
                    </Link>
                  </li>

                  <li style={{ marginBottom: '8px' }}>
                    <Space direction="vertical">
                      <Link href="https://kubsu.ru" target="_blank">
                        КубГУ
                      </Link>
                      <Link href="https://kubsu.ru/en" target="_blank">
                        KubSU English version
                      </Link>
                    </Space>
                  </li>
                </ul>
              </Space>

              <Divider />

              <Title level={4} id="fragment">Фрагмент страницы</Title>
              <Text>Это фрагмент страницы, на который ведет одна из ссылок выше.</Text>
            </Card>
          </Col>

          {/* Форма - всегда третья */}
          <Col xs={24} lg={24} style={{ order: 3 }}>
            <Card title="Форма" bordered={false}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="ФИО"
                      name="name"
                      rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Иванов Иван Иванович"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Номер телефона"
                      name="phone"
                      rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
                    >
                      <Input
                        prefix={<PhoneOutlined />}
                        placeholder="+71234567890"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Пожалуйста, введите email' },
                        { type: 'email', message: 'Некорректный email' }
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Введите вашу почту"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Дата"
                      name="date"
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Пол"
                  name="gender"
                >
                  <Radio.Group>
                    <Radio value="male">Мужской</Radio>
                    <Radio value="female">Женский</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Любимый язык программирования"
                  name="languages"
                >
                  <Select mode="multiple" placeholder="Выберите языки">
                    <Option value="pascal">Pascal</Option>
                    <Option value="c">C</Option>
                    <Option value="cpp">C++</Option>
                    <Option value="javascript">JavaScript</Option>
                    <Option value="php">PHP</Option>
                    <Option value="python">Python</Option>
                    <Option value="java">Java</Option>
                    <Option value="haskel">Haskel</Option>
                    <Option value="clojure">Clojure</Option>
                    <Option value="prolog">Prolog</Option>
                    <Option value="scala">Scala</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Биография"
                  name="biography"
                >
                  <TextArea rows={4} placeholder="Расскажите о себе" />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[{ required: true, message: 'Необходимо согласие с контрактом' }]}
                >
                  <Checkbox>С контрактом ознакомлен(а)</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Сохранить
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white' }}>
        © 2025 Сергей Волков. Все права защищены.
      </Footer>
      
      {/* Стили для адаптивности */}
      <style>{`
        .site-header {
          background: #001529;
          padding: 15px;
          width: 100%;
        }

        .header-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .logo-section {
          display: flex;
          justify-content: space-between
        }

        .site-title {
          color: white !important;
          font-size: 20px;
        }

        /* Навигация */
        .site-navigation {
          display: flex;
          flex-direction: column;
          gap: 10px;

        }

        .nav-link {
          color: white !important;
          text-decoration: none;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          transition: all 0.3s;
          text-align: center;
          width: 100%;
          max-width: 200px;
        }

         /* Десктоп стили */
        @media (min-width: 768px) {
          .header-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .logo-section {
            display: flex;
            gap: 15px;
            align-items: center;
          }

          .site-navigation {
            flex-direction: row;
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            padding: 15px;
          }

          .nav-link {
            width: auto;
            border: none;
            padding: 8px 16px;
          }
        
        /* Меняем порядок на десктопе */
        @media (min-width: 768px) {
          .ant-col-lg-24:nth-child(1) {
            order: 2 !important;
          }
          .ant-col-lg-24:nth-child(2) {
            order: 1 !important;
          }
          .ant-col-lg-24:nth-child(3) {
            order: 3 !important;
          }
        }
        
        /* Центрируем контент на десктопе */
        @media (min-width: 768px) {
          .ant-row {
            max-width: 960px !important;
            margin: 0 auto !important;
          }
        }
        
        /* Стили для таблицы */
        .table-row-even {
          background-color: #f8f9fa !important;
        }
        .table-row-odd {
          background-color: #ffffff !important;
        }
        .table-row-even:hover,
        .table-row-odd:hover {
          background-color: #e6f7ff !important;
        }
      `}</style>
    </Layout>
  );
};

export default App;