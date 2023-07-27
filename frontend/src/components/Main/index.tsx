import React, { FC, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spin } from 'antd'
import classnames from 'classnames/bind'
import { observer } from 'mobx-react-lite'
import { LoadingOutlined } from '@ant-design/icons'
import { useStore } from '@store/provider';
import { IBet } from '@types';
import Content from './components/Content';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import styles from './style.less'

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 24 }}
    spin
  />
)

const cn = classnames.bind(styles)

interface IMainContent {
  isOpenMenu: boolean
}

const MainContent: FC<IMainContent> = observer(({ isOpenMenu }) => {
  const [selected, setSelected] = useState<IBet[]>([])

  const { isLoading } = useStore()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Content
        selected={selected}
        setSelected={setSelected}
      />,
    }, {
      path: '/auth',
      element: <LoginForm />,
    },
    {
      path: '/registration',
      element: <RegistrationForm />,
    },
  ]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Spin
      indicator={antIcon}
      spinning={isLoading}
    >
      <div className={cn('main', { blur: isOpenMenu })}>
        <RouterProvider router={router} />
      </div>
    </Spin>
  )
})

export default MainContent
