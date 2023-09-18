import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api';
import StartUserForm from '@common/components/StartUserForm';
import Button from '@common/ui/Button';
import { useStore } from '@store/provider';
import { fields } from './resources/fields';

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
        <StartUserForm
            onFinish={onFinish}
            fields={fields}
            footer={(
                <>
                    <Button
                        type="link"
                        onClick={() => navigate('/registration')}
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
