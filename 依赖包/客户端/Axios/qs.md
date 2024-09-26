# application/x-www-form-urlencoded

使用 Axios 结合 qs 库发送 application/x-www-form-urlencoded 类型的 POST 请求时，不需要显式设置请求头的 Content-Type 为 `application/x-www-form-urlencoded`。

Axios 会根据发送的数据类型自动设置适当的 Content-Type 请求头。如果你使用 qs 库来序列化表单数据，并直接将序列化后的字符串作为 Axios 的请求体，Axios 将自动识别并设置请求头为 application/x-www-form-urlencoded。

```js
import qs from 'qs'
import axios from 'axios'

axios({
  url: 'https://example.com/api/post-endpoint',
  method: 'post',
  data: qs.stringify({ key1: 'value1', key2: 'value2' })
})

// 或者
// axios.post('https://example.com/api/post-endpoint', qs.stringify({ key1: 'value1', key2: 'value2' }))
```
