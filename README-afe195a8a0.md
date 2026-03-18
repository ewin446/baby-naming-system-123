# 宝宝取名定制系统 - Vercel部署指南

## 📋 系统概述
这是一套完整的宝宝取名定制系统，包含卡密验证功能，支持通过GitHub部署到Vercel。

## 🚀 快速部署到Vercel

### 步骤1：准备GitHub仓库
1. 在GitHub上创建一个新的仓库（例如：baby-name-system）
2. 将以下文件上传到仓库：
   - `package.json`
   - `server.js`
   - `index.html`
   - `README.md`（本文件）

### 步骤2：连接Vercel
1. 登录 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 选择刚才创建的GitHub仓库
4. Vercel会自动识别项目配置

### 步骤3：配置项目设置
在Vercel项目设置中，确保以下配置：

**Framework Preset**: Other
**Build Command**: 留空（Node.js应用无需构建）
**Output Directory**: 留空
**Install Command**: `npm install`

### 步骤4：环境变量（可选）
如果需要，可以设置以下环境变量：
- `PORT`: 应用端口（默认3000）

### 步骤5：部署
点击 "Deploy" 按钮，Vercel会自动部署您的应用。

## 🎯 卡密功能说明

### 系统内置激活码
系统内置了3个测试激活码：
- `XHS999999`
- `XHS888888`  
- `XHS777777`

### 激活码管理API
部署后，您可以通过以下API管理激活码：

#### 1. 生成新激活码
```bash
POST /api/generate-codes
Content-Type: application/json

{
  "count": 5  // 生成5个新激活码
}
```

#### 2. 查看激活码状态
```bash
GET /api/codes-status
```

#### 3. 验证激活码（用户使用）
```bash
POST /api/verify-code
Content-Type: application/json

{
  "code": "XHS999999"
}
```

## 🔧 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用。

## 📱 功能特点

### 核心功能
- ✅ 卡密验证系统（基于后端API）
- ✅ 按姓氏/性别/风格生成名字
- ✅ 500+高分名字推荐
- ✅ 名字收藏功能
- ✅ 详细的名字解析和寓意
- ✅ 响应式设计，支持移动端

### 安全特性
- 🔒 后端验证激活码，防止前端绕过
- 🔒 激活码一次性使用限制
- 🔒 实时记录使用情况

## 🎨 界面设计
采用小红书风格的粉色调设计，界面温馨可爱，适合母婴产品定位。

## 📊 技术架构

### 前端
- HTML5 + CSS3 + JavaScript
- 响应式设计
- 原生JavaScript，无框架依赖

### 后端
- Node.js + Express
- RESTful API设计
- 内存数据存储（生产环境建议使用数据库）

### 部署平台
- Vercel Serverless Functions
- 自动HTTPS
- 全球CDN加速

## 🛠️ 生产环境建议

### 1. 数据库升级
当前系统使用内存存储激活码，建议在生产环境中升级为：
- MongoDB
- PostgreSQL
- Redis

### 2. 用户认证
可以添加用户登录功能：
- JWT Token认证
- 第三方登录（微信/支付宝）

### 3. 支付集成
接入支付系统实现自动发卡：
- 微信支付
- 支付宝

### 4. 管理后台
开发专门的管理后台：
- 激活码批量生成
- 使用情况统计
- 用户管理

## 📈 性能优化

### 1. 缓存策略
- 对常用名字数据进行缓存
- 激活码验证结果缓存

### 2. 数据压缩
- 启用Gzip压缩
- 优化静态资源加载

## 🔒 安全建议

### 1. API安全
- 添加请求频率限制
- 实现API密钥认证

### 2. 数据加密
- 敏感数据加密存储
- HTTPS强制跳转

### 3. 防护措施
- SQL注入防护
- XSS攻击防护

## 📞 技术支持

如遇到部署问题，请检查：
1. Node.js版本是否正确（>=14.x）
2. 依赖包是否正确安装
3. Vercel配置是否正确
4. 网络连接是否正常

## 📄 许可证
本项目仅供学习和个人使用，商业使用请确保符合相关法律法规。

---

**部署成功后，您将拥有一个功能完整的宝宝取名系统，包含安全的卡密验证功能！**