@echo off
REM 启动后端服务器的批处理脚本
echo 正在启动后端服务器...

REM 检查依赖是否已安装
if not exist "node_modules" (
    echo ⚠️  未找到 node_modules，请先运行: node node_modules\npm\bin\npm-cli.js install
    pause
    exit /b 1
)

REM 检查是否有 nodemon（开发模式）
if exist "node_modules\nodemon" (
    echo ✅ 使用 nodemon 启动（开发模式，自动重启）
    node node_modules\nodemon\bin\nodemon.js server.js
) else (
    echo ✅ 使用 node 启动（生产模式）
    node server.js
)

pause


