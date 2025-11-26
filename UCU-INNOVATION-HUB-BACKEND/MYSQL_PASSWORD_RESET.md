# Reset MySQL Root Password on Windows

## Option 1: Using MySQL Workbench (Easiest)

1. Open **MySQL Workbench**
2. Click on your local MySQL connection
3. Go to **Server** → **Users and Privileges**
4. Select the `root@localhost` user
5. Click **"Change Password"**
6. Enter a new password (e.g., `password123`)
7. Click **Apply**

Then update your `.env` file:
```env
DB_PASSWORD=password123
```

---

## Option 2: Using Command Line

### Step 1: Stop MySQL Service

Open PowerShell as Administrator and run:
```powershell
Stop-Service MySQL80
```

### Step 2: Start MySQL in Safe Mode

```powershell
# Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"

# Start MySQL without grant tables
.\mysqld.exe --skip-grant-tables --skip-networking
```

Keep this window open.

### Step 3: Connect and Reset Password

Open a NEW PowerShell window as Administrator:

```powershell
# Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"

# Connect to MySQL (no password needed)
.\mysql.exe -u root

# In the MySQL prompt, run:
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password123';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Restart MySQL Normally

Go back to the first PowerShell window and press `Ctrl+C` to stop the safe mode server.

Then restart MySQL normally:
```powershell
Start-Service MySQL80
```

### Step 5: Update .env File

Edit your `.env` file and set:
```env
DB_PASSWORD=password123
```

---

## Option 3: Create New MySQL User (Alternative)

If you don't want to reset root password, create a new user:

1. Open MySQL Workbench or command line with root access
2. Run these commands:

```sql
CREATE USER 'ucuadmin'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON *.* TO 'ucuadmin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

3. Update your `.env` file:
```env
DB_USER=ucuadmin
DB_PASSWORD=password123
```

---

## After Setting Password

Once you've set a password using any method above:

1. **Update `.env` file** with the new password
2. **Test the connection**:
   ```bash
   node create-db.js
   ```
3. **Seed the database**:
   ```bash
   npm run seed
   ```
4. **Start the server**:
   ```bash
   npm start
   ```

---

## Quick Test

To verify your MySQL credentials work, run:
```bash
node create-db.js
```

If successful, you'll see:
```
✓ Connected to MySQL server
✓ Database 'ucu_innovation_hub' created or already exists
✅ Database setup complete!
```
