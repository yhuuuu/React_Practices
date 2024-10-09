import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm,message } from 'antd'
//import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import useChannel from '@/hooks/useChannel'
import { getArticleListAPI, deleteArticleAPI } from '@/api/article'
import { useEffect, useState } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
  // 准备列数据
  const status = {
    1: <Tag color="yellow">审核中</Tag>,
    2: <Tag color="green">审核通过</Tag>
  }

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // render: data => data === 1 ? <Tag color="yellow">审核中</Tag>:<Tag color="green">审核通过</Tag>
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this aricle?"
              onConfirm={() => confirm(data)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: [],
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]
  const confirm = async(e) => {
    //console.log(e);
    //console.log('deleting', e.id)
    await deleteArticleAPI(e.id)
    setReqData({
      ...reqData
    })
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  const { channelList } = useChannel()

  // Get article list
  const [articleList, setArticleList] = useState([])
  const [articleCount, setArticleCount] = useState(0)

  // Filter feature
  // 1. Prepare params
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 10
  })

  useEffect(() => {
    async function getArticleList() {
      const res = await getArticleListAPI(reqData)
      setArticleList(res.data.results)
      setArticleCount(res.data.total_count)
    }
    getArticleList()
  }, [reqData])

  // 2. get selected filters
  const onFinish = (formValue) => {
    console.log(formValue)
    //3 put formValue in the params 
    setReqData({
      ...reqData,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD')
    })

    //4. re-render new table data with selected filter
    // rerender list based on reqData using useEffect
    // one reqData change, data list re-render
  }
  const handlePageChange = (page) => {
    console.log(page);
    //re-render base on page change
    setReqData({
      ...reqData,
      page: page //page standalone
    })
  }
  return (
    <div>
      {/* Article filter section */}
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            {/* locale={locale} */}
            <RangePicker ></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Article list section */}
      <Card title={`根据筛选条件共查询到 ${articleCount} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
          total: articleCount,
          pageSize: reqData.per_page,
          onChange: handlePageChange
        }} />
      </Card>
    </div>
  )
}

export default Article