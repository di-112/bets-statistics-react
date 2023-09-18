import React from 'react';
import { Button as AntdButton } from 'antd'
import { ButtonProps } from 'antd/lib/button/button';
import classnames from 'classnames/bind';
import styles from './style.less';

const cn = classnames.bind(styles)

type IButton = ButtonProps

function Button({
    children,
    type = 'primary',
    className,
    ...rest
}: IButton) {
    return (
        <AntdButton
            className={cn('button', className)}
            type={type}
            {...rest}
        >
            {children}
        </AntdButton>
    )
}

export default Button;
