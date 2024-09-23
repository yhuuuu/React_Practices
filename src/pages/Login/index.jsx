import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'


const Login = () => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    console.log('Success:', values);

    //dispatch asynchronous action fetchlogin
    dispatch(fetchLogin(values))

  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },

              {
                pattern: /^1[3-9]\d{9}/,
                message: 'Please input the correct format'
              }
            ]}>
            <Input size="large" placeholder="mobile" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your code!'
              }
            ]}>
            <Input size="large" placeholder="code" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login