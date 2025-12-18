@echo off
echo Starting deployment process...

echo.
echo Step 1: Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Installing frontend dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    pause
    exit /b 1
)

cd ..
echo.
echo ✅ Local build completed successfully!
echo.
echo Next steps for Render deployment:
echo 1. Push your code to GitHub
echo 2. Connect your GitHub repo to Render
echo 3. Render will automatically use the render.yaml configuration
echo.
pause