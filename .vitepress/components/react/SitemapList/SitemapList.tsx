/**
 * 网址一栏表
 */
import React from 'react'
import { Button, Table, message } from 'antd'
import type { TableColumnType } from 'antd'
import days from 'dayjs'
import { useMount, useSetState } from 'ahooks'
import {
  queryBaiduBatchCommit,
  queryBingBatchCommit,
  querySitemapUrlList,
} from './service'

interface SitemapList {
  url: string
  lastmod: string
  sitemapTime: string
}

function SitemapList() {
  const [state, setState] = useSetState<{
    sitemapList: SitemapList[]
    sitemapLoading: boolean
    selectedUrlKeys: React.Key[]
    bingSubmitLoading?: boolean
    baiduSubmitLoading?: boolean
  }>({
    sitemapList: [],
    sitemapLoading: false,
    selectedUrlKeys: [],
    bingSubmitLoading: false,
    baiduSubmitLoading: false,
  })
  const {
    sitemapList,
    sitemapLoading,
    selectedUrlKeys,
    bingSubmitLoading,
    baiduSubmitLoading,
  } = state

  const fetchSitemapUrlList = async () => {
    setState({ sitemapLoading: true })
    const { data } = await querySitemapUrlList()
    if (Array.isArray(data) && data.length) {
      const list = data.map(item => ({
        url: `https://www.skillgroup.cn/${item.url}`,
        lastmod: item.lastmod,
        sitemapTime: item.sitemapTime,
      }))
      setState({
        sitemapList: list,
        sitemapLoading: false,
      })
    }
    else {
      setState({ sitemapLoading: false })
    }
  }

  useMount(() => {
    fetchSitemapUrlList()
  })

  const columns: TableColumnType<any>[] = [
    {
      title: '网 址',
      dataIndex: 'url',
      className: 'text-blue-500',
      ellipsis: true,
      render: text => (
        <a href={text} target="_blank">
          {text.replace('https://www.skillgroup.cn/', '')}
        </a>
      ),
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastmod',
      className: 'display-none lg:display-table-cell',
      sorter: (a, b) => days(a.lastmod).unix() - days(b.lastmod).unix(),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
      render: text => days(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'sitemap时间',
      dataIndex: 'sitemapTime',
      className: 'display-none lg:display-table-cell',
      sorter: (a, b) => days(a.sitemapTime).unix() - days(b.sitemapTime).unix(),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
    },
  ]

  const rowSelection = {
    selectedRowKeys: selectedUrlKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setState({ selectedUrlKeys: selectedRowKeys })
    },
  }

  // Baidu Search Commit
  const baiduSearchCommit = async () => {
    setState({ baiduSubmitLoading: true })
    const reponse = await queryBaiduBatchCommit(selectedUrlKeys.join('\n'))
    if (reponse.status === 200) {
      message.success('操作成功', 4)
      setState({ selectedUrlKeys: [], baiduSubmitLoading: false })
    }
    else {
      setState({ baiduSubmitLoading: false })
    }
  }

  // Bing Search Commit
  const bingSearchCommit = async () => {
    setState({ bingSubmitLoading: true })
    const reponse = await queryBingBatchCommit({
      host: 'https://www.skillgroup.cn',
      key: '73f89fc2fa4646d1a4ab18b23108bf26',
      keyLocation:
        'https://www.skillgroup.cn/73f89fc2fa4646d1a4ab18b23108bf26.txt',
      urlList: selectedUrlKeys,
    })
    if (reponse.status === 200) {
      message.success(
        <span>
          <span>操作成功</span>
          <a
            m="l-6"
            text="blue"
            href="https://www.bing.com/webmasters/indexnow?siteUrl=https://www.skillgroup.cn/"
            target="_blank"
          >
            去查看
          </a>
        </span>,
        4,
      )
      setState({ selectedUrlKeys: [], bingSubmitLoading: false })
    }
    else {
      setState({ bingSubmitLoading: false })
    }
  }

  return (
    <div bg="white" m="12" p="8" lg:m="36" border="rounded-[12px]">
      <div font="bold" m="b-12 t-12 l-8" text="18 dark">
        站点网址一栏表
      </div>
      <div m="b-12 l-8">
        <Button
          type="primary"
          onClick={bingSearchCommit}
          loading={bingSubmitLoading}
          disabled={selectedUrlKeys.length === 0}
        >
          Bing
        </Button>
        <Button
          className="m-l-12"
          type="primary"
          onClick={baiduSearchCommit}
          loading={baiduSubmitLoading}
          disabled={selectedUrlKeys.length === 0}
        >
          百 度
        </Button>
      </div>
      <Table
        rowKey="url"
        dataSource={sitemapList}
        columns={columns}
        size="small"
        loading={sitemapLoading}
        pagination={{
          showTotal: total => `共 ${total} 条`,
        }}
        rowSelection={rowSelection}
      />
    </div>
  )
}

export default SitemapList
