# Daily Oracle 部署指南

> **版本**: v19 · final  
> **CloudStudio 公网**: https://16f931a2e31d4026a64cfc03ee5948d9.app.codebuddy.work  
> **新加坡服务器**: http://43.106.59.27（需安全组白名单 IP 才能 SSH）  

---

## CloudStudio 部署（当前可用）

- **链接**: https://16f931a2e31d4026a64cfc03ee5948d9.app.codebuddy.work
- **状态**: ✅ 在线，HTTP 200
- **自动 HTTPS**: 已启用

## 新加坡服务器部署（SSH 需白名单）

> ⚠️ 当前本机 IP 不在阿里云安全组白名单中，SSH 22 端口不通

### 服务器信息

| 项目 | 详情 |
|------|------|
| 线上地址 | http://43.106.59.27 |
| 服务器 | 阿里云 SWAS 新加坡 |
| SSH | root@43.106.59.27:22 |
| 密码 | Winkey567 |
| 部署路径 | /var/www/daily-oracle/ |

---

## 一键部署（SSH上去执行）

```bash
# 1. 上传 tar 包到服务器
scp "C:\Users\lanyikeji\WorkBuddy\2026-07-14-09-44-52\daily-oracle.tar.gz" root@43.106.59.27:/tmp/

# 2. SSH 进去
ssh root@43.106.59.27

# 3. 解压 + 重启
rm -rf /var/www/daily-oracle/*
tar xzf /tmp/daily-oracle.tar.gz -C /var/www/daily-oracle/
rm /tmp/daily-oracle.tar.gz
pkill -f "python3.11 -m http.server 80"
sleep 1
cd /var/www/daily-oracle && setsid python3.11 -m http.server 80 --bind 0.0.0.0 > /var/log/daily-oracle.log 2>&1 &

# 4. 验证
curl -s -o /dev/null -w "%{http_code}" http://localhost:80/
# 应返回: 200
```

---

## 注意事项

- **IP白名单**：阿里云安全组需放行本机 IP 的 22 端口，否则 SSH 连不上
- **端口 80**：HTTP 不需要额外放行，已开
- **宝塔面板**：https://43.106.59.27:8888 备用管理（账号 5e7e1523 / 密码 3464d9526257）

---

## 部署后验证清单

- [ ] `curl http://43.106.59.27` 返回 200
- [ ] 首页入场动画正常播放（有声）
- [ ] 点击"今日求卦"→ 算卦过程动画播放 → 跳转结果页
- [ ] 结果页卦象+解读左右并排显示
- [ ] 返回首页不重播入场动画
- [ ] 桌面端 OKX Wallet 可连接，存证上链到 X Layer 测试网

---

## 包含文件

```
index.html        (30KB, v19 — 求卦动画+声音+Fonts修复)
result.html       (45KB, v19 — 暖纸系重设计+左右并排)
history.html      (18KB, v16 — 导航修复)
oracle-core.js    (36KB, v16 — X Layer测试网链上存证)
manifest.json     (PWA)
素材/
  ├── 入场动画.mp4     (8.5MB)
  ├── 循环背景.mp4     (4.8MB)
  ├── 算卦过程.mp4     (4.4MB, 🆕新增)
  ├── 静态背景图.png   (5.7MB)
  ├── 背景logo.png
  ├── 背景底部文字.png
  ├── 钱包绑定.png
  ├── 算卦.png
  └── 历史.png
```
