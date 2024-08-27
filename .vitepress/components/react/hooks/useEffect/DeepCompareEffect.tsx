import { useEffect, useState } from 'react'
// @ts-ignore
import { Button, Card, Space, message } from 'antd'
import useDeepCompareEffect from './useDeepCompareEffect'

function App() {
  const [useInfo, setUserInfo] = useState({ name: 'John', age: 25 })

  useEffect(() => {
    message.info('useEffect has run due to userInfo object value change.')
  }, [useInfo])

  useEffect(() => {
    message.info(
      'useEffect JSON.stringify has run due to userInfo object value change.',
    )
  }, [JSON.stringify(useInfo)])

  useDeepCompareEffect(() => {
    message.info(
      'useDeepCompareEffect has run due to userInfo object value change.',
    )
  }, [useInfo])

  const handleChangeUserInfo = () => {
    setUserInfo({ ...useInfo })
  }

  const handleChangeAge = () => {
    setUserInfo({ ...useInfo, age: useInfo.age + 1 })
  }

  return (
    <Card title="案例 demo">
      <pre>{JSON.stringify(useInfo, null, 2)}</pre>
      <Space>
        <Button onClick={handleChangeUserInfo} type="primary">
          深拷贝useInfo
        </Button>
        <Button onClick={handleChangeAge} type="primary">
          age+1
        </Button>
      </Space>
    </Card>
  )
}

export default App
