# 几种获取表单数据的方式

## 方式一

Button（htmlType 属性为 `submit`） 在 Form 内部，通过监听 Form 的 onFinishsh 事件来获取表单数据。

```tsx
import React from 'react'
import { Button, Form, Input } from 'antd'

const MyForm: React.FC = () => {
  function onFinish(values) {
    console.log(values)
  }

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Username" name="username">
          <Input></Input>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default MyForm
```

初始时，点击按钮，控制台输出：

```
{username: undefined}
```

在输入框输入 `hello`，点击按钮，输出：

```
{username: 'hello'}
```

清空输入框，点击按钮，输出：

```
{username: ''}
```

## 方式二

Button 在 Form 外，监听 Button 的点击事件，通过 `Form.useForm` 对表单数据域进行交互。

```tsx
import React from 'react'
import { Button, Form, Input } from 'antd'

const MyForm: React.FC = () => {
  // form 为表单实例，https://ant-design.antgroup.com/components/form-cn#forminstance
  const [form] = Form.useForm<{ username: string }>()

  function handleClick() {
    console.log(form.getFieldsValue())
  }

  return (
    <>
      <Form form={form}>
        <Form.Item label="Username" name="username">
          <Input></Input>
        </Form.Item>
      </Form>

      <Button onClick={handleClick}>Submit</Button>
    </>
  )
}

export default MyForm
```
