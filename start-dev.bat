@echo off
echo Starting Mobile Recharge Application...
echo.

echo Installing dependencies...
call npm run install-all

echo.
echo Starting development servers...
echo Backend will run on http://localhost:3001
echo Frontend will run on http://localhost:5173
echo.

start cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul
start cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Press any key to exit
pause > nul