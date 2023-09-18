import React from 'react';
import { Input } from 'antd'
import { IField } from '@common/components/StartUserForm';

export const fields: IField[] = [
    {
        label: 'Логин',
        name: 'login',
        rules: [{ required: true, message: 'Пожалуйста, введите login' }],
        element: <Input />,
    },
    {
        label: 'Email',
        name: 'email',
        rules: [{ required: true, message: 'Пожалуйста, введите email' }],
        element: <Input />,
    },
    {
        label: 'Пароль',
        name: 'password',
        rules: [{ required: true, message: 'Пожалуйста, введите пароль' }],
        element: <Input.Password />,
    },
]
