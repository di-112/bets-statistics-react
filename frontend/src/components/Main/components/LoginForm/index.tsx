import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd'
import api from '@api';
import { useStore } from '@store/provider';
import styles from './style.less'

interface ILoginFormValues {
  email: string,
  password: string
}

const LoginForm = () => {
  const { setUser } = useStore()

  const navigate = useNavigate()

  const onFinish = async (values: ILoginFormValues) => {
    const user = await api.login(values)

    if (user) {
      setUser(user)
      navigate('/')
    }
  };

  return (
    <Form
      className={styles.form}
      name="bets_login"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      labelAlign="right"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 24 }}
        className={styles.buttonWrapper}
      >
        <Button
          type="link"
          onClick={() => navigate('/registration')}
        >
          Создать аккаунт
        </Button>
        <Button
          type="primary"
          htmlType="submit"
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
