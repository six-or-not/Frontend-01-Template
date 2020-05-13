# 浏览器

- URL - HTTP
- HTML - parse
- DOM - css computing
- DOM with css - layout
- DOM with position - render
- Bitmap
- TCP与HTTP

# TCP

# URI

- scheme表示协议名，如http ftp https，后面必须追加://
- user:password@ 登陆主机的用户名密码，不推荐使用
- host:port 主机名和端口
- path 请求路径，标记资源位置
- query 查询字符串，使用key=value格式，多个直接使用&连接
- fragment 锚点，根据这个锚点跳转到相应的子资源
- 关键字：同源、同站、跨域、跨站

# HTTP

## 报文结构

### 请求报文

- 请求行 - 请求的方法、URI、HTTP版本

> 方法

- GET POST HEAD PUT DELETE TRACE OPTIONS

- HTTP 1.1/ HTTP 2.0 / HTTP 3.0

- 首部字段

- 其他

- CR + LF

### 响应报文

- 状态行 - HTTP版本、状态码、原因短语

> 状态码 
- 1XX 2XX 3XX 4XX 5XX

- 2XX 200 ok
- 3XX 304 Not Modifed
- 4XX 400 Bad Request / 404 Not Found

- 5XX Internal Server Error


## Cache-Control (通用首部字段)

no-cache 禁止缓存过期的资源，并返回全新的资源
no-store 完全禁止该资源的缓存
s-maxage 公共服务器的s-maxage
max-age 缓存最大时间


- Expires (实体首部字段)

Expires: Wed, 04 Jul 2012 08:26:05 GMT 告知客户端资源失效的日期，服务器在资源超过指定的日期前，都会以缓存来应答。


- 协商缓存

Last-Modified (实体首部字段) / If-Modified-Since (请求首部字段)

Last-Modifeid 资源的最终修改时间 If-Modified-Since 服务器在给定的日期后修改过才返回该资源，否则返回304. ```

ETag (响应首部字段) / If-None-Match (请求首部字段)

ETag 资源对应的唯一标识
If-None-Match 对于GET和HEAD请求，当且仅当服务器上没有任何与ETag相匹配的资源时，服务器才会返回资源。
类型/格式 支持

Transfer-Encoding (通用首部字段) 传输报文主体所采用的编码格式
Accept-Encoding (请求首部字段) 内容编码 gzip
Accept (请求首部字段) 媒体类型 application/json
Accept-Language (请求首部字段) 语言集
Accept-Charset (请求首部字段)
Cookie

Set-Cookie
NAME=VALUE Cookie的名和值

expires=DATE Cookie的有效期

Max-Age 失效前的秒数

path=PATH 服务器路径

domain=域名 服务器域名

Secure 只有https才能携带cookie

HttpOnly cookie只能通过HTTP协议传输，不能通过js访问，防止XSS攻击

SameSite - 预防CSRF攻击