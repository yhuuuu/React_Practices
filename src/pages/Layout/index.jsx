import { useEffect } from 'react'
import { request } from '@/utils'
import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/user'
import { clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout
const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]
const GeekLayout = () => {
  const navigate = useNavigate()

  // redirect to page component based on item.key(path)
  const onMenuClick = (item) => {
    const path = item.key
    console.log('Clicked', path);
    navigate(path)
  }
  // highlight menu btn when is clicked
  const location = useLocation()
  const selectedKey = location.pathname
  console.log('current location', location.pathname);

  // show personal info and avtive action
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch action from redux
    dispatch(fetchUserInfo())
  }, [dispatch])

  // selector data from redux
  const name = useSelector(state => state.user.userInfo.name)

  const onConfirm = () => {
    dispatch(
      clearUserInfo()
    )
    navigate('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={onMenuClick}>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* Secondary route */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout