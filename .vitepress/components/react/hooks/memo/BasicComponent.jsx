import { useState } from 'react'

function ChildComponent(props) {
  console.log('ChildComponent render')
  return <p>{props.text}</p>
}

function ParentComponent() {
  const [count, setCount] = useState(0)

  return (
    <Card title="案例 demo">
      <p>
        Current count:
        {count}
      </p>
      <Button onClick={() => setCount(count + 1)} type="primary">
        Increment
      </Button>
      <ChildComponent text="我是子组件，请在控制台查看打印结果！" />
    </Card>
  )
}

export default ParentComponent
