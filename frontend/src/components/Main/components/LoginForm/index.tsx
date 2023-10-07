import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api';
import StartUserForm from '@common/components/StartUserForm';
import Button from '@common/ui/Button';
import { useStore } from '@store/provider';
import { AppRoutes } from '../../../../types';
import { fields } from './resources/fields';

interface LoginFormValues {
    email: string,
    password: string
}

const LoginForm = () => {
    const { setUser } = useStore()

    const navigate = useNavigate()

    const onFinish = async (values: LoginFormValues) => {
        const user = await api.login(values)

        if (user) {
            setUser(user)
            navigate('/')
        }
    };

    return (
        <StartUserForm
            onFinish={onFinish}
            fields={fields}
            footer={(
                <>
                    <Button
                        type="link"
                        onClick={() => navigate(AppRoutes.REGISTRATION)}
                    >
                        Создать аккаунт
                    </Button>
                    <Button
                        htmlType="submit"
                    >
                        Войти
                    </Button>
                </>
            )}
        />
    );
};

export default LoginForm;
