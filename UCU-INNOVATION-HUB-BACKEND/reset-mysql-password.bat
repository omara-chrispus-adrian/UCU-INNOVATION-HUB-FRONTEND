@echo off
echo ========================================
echo MySQL Password Reset Helper
echo ========================================
echo.
echo This script will help you reset MySQL root password
echo.
echo STEP 1: Stop MySQL Service
echo ----------------------------------------
net stop MySQL80
echo.
echo STEP 2: Instructions
echo ----------------------------------------
echo.
echo 1. A new window will open with MySQL in safe mode
echo 2. Keep that window open
echo 3. Open MySQL Workbench or another command prompt
echo 4. Connect with: mysql -u root
echo 5. Run these commands:
echo.
echo    FLUSH PRIVILEGES;
echo    ALTER USER 'root'@'localhost' IDENTIFIED BY 'password123';
echo    FLUSH PRIVILEGES;
echo    EXIT;
echo.
echo 6. Close the safe mode window (Ctrl+C)
echo 7. Press any key here to restart MySQL normally
echo.
pause
echo.
echo STEP 3: Starting MySQL in Safe Mode
echo ----------------------------------------
start "MySQL Safe Mode" "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --skip-grant-tables --skip-networking
echo.
echo Safe mode started in new window.
echo Follow the instructions above, then press any key to continue...
pause
echo.
echo STEP 4: Restart MySQL Service
echo ----------------------------------------
net start MySQL80
echo.
echo ========================================
echo Done! MySQL should now be running with new password.
echo.
echo Update your .env file with:
echo DB_PASSWORD=password123
echo.
echo Then run: node create-db.js
echo ========================================
pause
