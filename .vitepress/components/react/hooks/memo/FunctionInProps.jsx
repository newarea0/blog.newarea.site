import { memo, useState } from 'react'

function ChildComponent(props) {
  const { getText } = props
  console.log('ChildComponent render')
  return <p>{getText()}</p>
}

const MemoizedChildComponent = memo(ChildComponent)

function ParentComponent() {
  const [count, setCount] = useState(0)

  const getText = () => {
    return '我是子组件，请在控制台查看打印结果！'
  }

  return (
    <Card title="案例 demo">
      <p>
        Current count:
        {count}
      </p>
      <Button onClick={() => setCount(count + 1)} type="primary">
        Increment
      </Button>
      <MemoizedChildComponent getText={getText} />
    </Card>
  )
}

export default ParentComponent
