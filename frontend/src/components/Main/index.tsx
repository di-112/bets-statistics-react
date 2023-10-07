import React, { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import classnames from 'classnames/bind'
import { observer } from 'mobx-react-lite'
import Loader from '@common/ui/Loader';
import { useStore } from '@store/provider';
import { AppRoutes } from '../../types';
import Content from './components/Content';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import styles from './style.less'

const cn = classnames.bind(styles)

const router = createBrowserRouter([
    {
        path: AppRoutes.MAIN,
        element: <Content />,
    }, {
        path: AppRoutes.AUTH,
        element: <LoginForm />,
    },
    {
        path: AppRoutes.REGISTRATION,
        element: <RegistrationForm />,
    },
]);

const MainContent: FC = observer(() => {
    const {
        isLoading,
        isOpenMenu,
    } = useStore()

    return (
        <Loader isLoading={isLoading}>
            <div className={cn('main', { blur: isOpenMenu })}>
                <RouterProvider router={router} />
            </div>
        </Loader>
    )
})

export default MainContent
