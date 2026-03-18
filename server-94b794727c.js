const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.static('.'));

// 生成随机激活码
function generateActivationCode() {
  const prefix = 'XHS';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}

// 模拟数据库（实际使用应该连接真实数据库）
let activationCodes = [
  { code: 'XHS999999', status: 'unused', createdAt: new Date() },
  { code: 'XHS888888', status: 'unused', createdAt: new Date() },
  { code: 'XHS777777', status: 'unused', createdAt: new Date() }
];

let usedCodes = new Set();

// API: 验证激活码
app.post('/api/verify-code', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.json({ success: false, message: '请输入激活码' });
  }

  // 检查是否已被使用
  if (usedCodes.has(code)) {
    return res.json({ success: false, message: '该激活码已被使用，每个激活码仅限使用一次' });
  }

  // 查找激活码
  const codeData = activationCodes.find(c => c.code === code);
  
  if (!codeData) {
    return res.json({ success: false, message: '激活码无效，请核对后重新输入' });
  }

  if (codeData.status === 'used') {
    return res.json({ success: false, message: '该激活码已被使用' });
  }

  // 标记为已使用
  codeData.status = 'used';
  codeData.usedAt = new Date();
  usedCodes.add(code);

  console.log(`激活码 ${code} 已使用，使用时间: ${codeData.usedAt}`);

  return res.json({ 
    success: true, 
    message: '激活码验证成功！',
    codeData: {
      code: codeData.code,
      usedAt: codeData.usedAt
    }
  });
});

// API: 生成新的激活码（管理功能）
app.post('/api/generate-codes', (req, res) => {
  const { count = 1 } = req.body;
  const newCodes = [];

  for (let i = 0; i < count; i++) {
    const code = generateActivationCode();
    const codeData = {
      code: code,
      status: 'unused',
      createdAt: new Date()
    };
    activationCodes.push(codeData);
    newCodes.push(codeData);
  }

  console.log(`生成了 ${count} 个新激活码`);

  return res.json({
    success: true,
    message: `成功生成 ${count} 个激活码`,
    codes: newCodes
  });
});

// API: 查看激活码状态
app.get('/api/codes-status', (req, res) => {
  return res.json({
    success: true,
    total: activationCodes.length,
    unused: activationCodes.filter(c => c.status === 'unused').length,
    used: activationCodes.filter(c => c.status === 'used').length,
    codes: activationCodes.map(c => ({
      code: c.code,
      status: c.status,
      createdAt: c.createdAt,
      usedAt: c.usedAt
    }))
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 主页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '宝宝取名定制系统.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`宝宝取名系统服务器运行在 http://localhost:${PORT}`);
});
