# 启动后端服务器的 PowerShell 脚本
# 如果 npm 有问题，直接使用 node 运行

Write-Host "正在启动后端服务器..." -ForegroundColor Green

# 检查依赖是否已安装
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  未找到 node_modules，正在安装依赖..." -ForegroundColor Yellow
    # 尝试使用 node 直接运行 npm（如果 npm 配置有问题）
    $nodePath = (Get-Command node).Source
    $npmPath = Join-Path (Split-Path (Split-Path $nodePath)) "node_modules\npm\bin\npm-cli.js"
    
    if (Test-Path $npmPath) {
        node $npmPath install
    } else {
        Write-Host "❌ 无法找到 npm，请手动安装依赖" -ForegroundColor Red
        exit 1
    }
}

# 检查是否有 nodemon（开发模式）
if (Test-Path "node_modules\nodemon") {
    Write-Host "✅ 使用 nodemon 启动（开发模式，自动重启）" -ForegroundColor Green
    node node_modules\nodemon\bin\nodemon.js server.js
} else {
    Write-Host "✅ 使用 node 启动（生产模式）" -ForegroundColor Green
    node server.js
}

