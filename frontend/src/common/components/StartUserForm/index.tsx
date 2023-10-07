import React, { FC } from 'react';
import { Form as AntForm, FormItemProps } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Callbacks } from 'rc-field-form/lib/interface';
import styles from './style.less';

export type IField = (FormItemProps & { element: React.ReactNode })

interface IForm<Values = unknown> {
    onFinish: Callbacks<Values>['onFinish'],
    fields: IField[],
    footer: React.ReactNode
}

const StartUserForm: FC<IForm> = ({
    onFinish,
    fields,
    footer = <div />,
}) => (
    <AntForm
        className={styles.form}
        name="bets_login"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelAlign="right"
    >
        {fields.map(({ element, ...rest }, index) => (
            <AntForm.Item
                key={index}
                {...rest}
            >
                {element}
            </AntForm.Item>
        ))}
        <AntForm.Item
            wrapperCol={{ span: 24 }}
            className={styles.buttonWrapper}
        >
            {footer}
        </AntForm.Item>
    </AntForm>
);

export default StartUserForm;
