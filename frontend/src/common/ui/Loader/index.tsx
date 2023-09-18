import React, { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface ILoader {
    children: React.ReactNode,
    isLoading: boolean
}

const Loader: FC<ILoader> = ({
    isLoading,
    children,
}) => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Spin
        indicator={(
            <LoadingOutlined
                style={{ fontSize: 24 }}
                spin
            />
        )}
        spinning={isLoading}
    >
        {children}
    </Spin>
);

export default Loader;
