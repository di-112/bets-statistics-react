import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api';
import StartUserForm from '@common/components/StartUserForm';
import Button from '@common/ui/Button';
import { useStore } from '@store/provider';
import { AppRoutes } from '../../../../types';
import { fields } from './resources/fields';

interface ILoginFormValues {
    email: string,
    password: string
}

const RegistrationForm = () => {
    const { setUser } = useStore()

    const navigate = useNavigate()

    const onFinish = async (values: ILoginFormValues) => {
        const user = await api.createUser(values)

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
                        onClick={() => navigate(AppRoutes.AUTH)}
                    >
                        Войти
                    </Button>
                    <Button htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </>
            )}
        />
    )
};

export default RegistrationForm;
