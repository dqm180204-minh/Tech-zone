@echo off
title TechZone Phone Store Full-Stack (Frontend + MySQL Backend)
echo ====================================================
echo  Dang khoi dong TechZone Phone Store tren o D:...
echo  Backend Server: http://localhost:5000/api
echo  Frontend UI:    http://localhost:3000
echo  Admin Portal:   http://localhost:3000/admin
echo ====================================================

cd /d "D:\techzone-phone-store"

:: Khoi dong Backend API Server trong cua so rieng
start "TechZone MySQL Backend API" cmd /k "cd server && npm start"

:: Khoi dong Frontend Vite Server
npm run dev

pause
