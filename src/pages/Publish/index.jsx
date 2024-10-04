import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getChannelAPI } from '@/api/article'
import { createAriticleAPI } from '@/api/article'


const { Option } = Select
const Publish = () => {
  //get channel list 
  const [channelList, setChannelList] = useState([])

  useEffect(() => {
    // encap function
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])

  // Sumbit form
  const onFinish = (formData) => {
    console.log(formData);
    const { title, content, channel_id } = formData
    // 1. Format form data to match with API body format
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        images: []
      },
      channel_id
    }
    // 2. Call API
    createAriticleAPI(reqData)
  }

  // Upload image callback
  const [imageList, setImageList] = useState()
  const handleChange = (value) => {
    console.log('uploading', value);
    setImageList(value.fileList)
  }

  // Image type change callback
  const [uploadImageType, setUploadImageType] = useState(0)
  const handleTypeChange = (e) => {
    console.log('cover type changed', e.target.value);
    setUploadImageType(e.target.value)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value stores channel that selected by the user */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>
              )}
            </Select>
          </Form.Item>


          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={handleTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
            *listType: picture upload box style
            *showUploadList: control upload list
            * After setting up action and name , it will upload and triger handleChange callback function
            * image will upload as a key "image" to the server 
            * */}

            { uploadImageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={handleChange}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* textbox editor */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish