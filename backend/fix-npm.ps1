# 修复 npm 配置的脚本
# 问题：npm 配置指向了错误的路径 E:\ss\node_modules\npm

Write-Host "🔧 正在修复 npm 配置..." -ForegroundColor Yellow

# 方法1：找到正确的 npm 路径
$nodePath = (Get-Command node).Source
$nodeDir = Split-Path $nodePath
$npmPath = Join-Path $nodeDir "node_modules\npm\bin\npm-cli.js"

Write-Host "Node.js 路径: $nodePath" -ForegroundColor Cyan
Write-Host "npm 应该在: $npmPath" -ForegroundColor Cyan

if (Test-Path $npmPath) {
    Write-Host "✅ 找到 npm，路径正确" -ForegroundColor Green
    
    # 设置 npm 前缀（如果需要）
    $npmPrefix = Split-Path $nodeDir
    Write-Host "设置 npm prefix 为: $npmPrefix" -ForegroundColor Cyan
    
    # 使用 node 直接运行 npm 命令来修复配置
    node $npmPath config set prefix $npmPrefix --global
    
    Write-Host "✅ npm 配置已修复！" -ForegroundColor Green
    Write-Host "现在可以尝试运行: npm --version" -ForegroundColor Green
} else {
    Write-Host "❌ 未找到 npm，可能需要重新安装 Node.js" -ForegroundColor Red
    Write-Host "或者使用以下方法启动服务器：" -ForegroundColor Yellow
    Write-Host "  node server.js" -ForegroundColor Cyan
    Write-Host "  或运行: .\start-server.ps1" -ForegroundColor Cyan
}


