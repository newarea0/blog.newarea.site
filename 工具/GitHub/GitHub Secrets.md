# GitHub Secrets

GitHub Secrets（机密） 是 GitHub 中的一项功能，用于安全地存储敏感信息，以便在工作流和GitHub 操作中使用。机密是加密的，仅可由存储库中运行的工作流访问，以确保 API 密钥、令牌和密码等敏感数据的安全。

常用有两种：

- **Repository Secrets**：特定于某个存储库，可用于该存储库内的 GitHub Actions 工作流。
- **Environment Secrets**：与特定环境（例如，暂存、生产）相关，可用于管理不同部署环境的机密。在 GitHub Actions 中使用时先指定环境，然后再使用机密。

   ```yml
   runs-on: ubuntu-latest
   # 使用环境
   environment:
     name: production

   steps:
     # 部署到服务器
     - name: Upload to Deploy Server
       uses: appleboy/scp-action@master
       with:
         # 服务器域名
         host: ${{ secrets.SERVER_HOST }}
         # 服务器用户名
         username: ${{ secrets.SERVER_USERNAME }}
         # 服务器密码
         password: ${{ secrets.SERVER_PASSWORD }}
         # 服务器端口
         port: ${{ secrets.SERVER_PORT }}
         # 指定上传的文件目录(项目配置的打包目录名称)
         source: './dist/*'
         # 指定上传服务器目录
         target: '/www/wwwroot/blog.newarea.site
   ```
