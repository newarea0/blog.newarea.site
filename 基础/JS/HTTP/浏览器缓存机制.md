# 浏览器缓存机制

[no-cache,max-age=0,nostore区别及304原理](https://www.zhoulujun.cn/html/theory/ComputerScienceTechnology/network/2018_0306_8078.html)

[no-cache,max-age=0,nostore区别及304原理](https://blog.csdn.net/kkdelta/article/details/100576096)（重点）对缓存有个整体的概念

[彻底理解浏览器的缓存机制（http缓存机制）](https://www.cnblogs.com/chengxs/p/10396066.html)（重点）介绍了强制缓存和协商缓存，以及控制强制缓存的Cache-Conctrol vs Expires，控制协商缓存的 Last-Modified/If-Modified-Since vs Etag/If-None-Match

https://blog.csdn.net/i13738612458/article/details/80383390

https://blog.csdn.net/zouzixuan/article/details/84677548

https://www.cnblogs.com/echolun/p/9419517.html

https://www.jianshu.com/p/54cc04190252

![03](https://image.newarea.site/20230724/03.png)

“之前缓存是否过期”涉及到强制缓存，“文件是否有修改”涉及到协商缓存。

控制强制缓存的字段分别是 Cache-Control 和 Expires，其中 Cache-Conctrol 的优先级比 Expires 高。

控制协商缓存的字段分别有：Etag/If-None-Match 和 Last-Modified/If-Modified-Since，其中 Etag/If-None-Match 的优先级比 Last-Modified/If-Modified-Since 高。
