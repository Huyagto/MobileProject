// src/debug-test.ts - Sửa với absolute paths
console.log('=== DEBUG START ===');

const path = require('path');
const baseDir = __dirname;

console.log('Base directory:', baseDir);
console.log('Files in modules directory:');

try {
  const modulesDir = path.join(baseDir, 'modules');
  const fs = require('fs');
  
  if (fs.existsSync(modulesDir)) {
    const files = fs.readdirSync(modulesDir);
    console.log('Modules found:', files);
    
    // Kiểm tra users folder
    const usersDir = path.join(modulesDir, 'users');
    if (fs.existsSync(usersDir)) {
      console.log('Users folder exists, files:', fs.readdirSync(usersDir));
    } else {
      console.log('NO users folder! Checking for user (singular)...');
      const userDir = path.join(modulesDir, 'user');
      if (fs.existsSync(userDir)) {
        console.log('user (singular) folder exists, files:', fs.readdirSync(userDir));
      }
    }
  } else {
    console.log('modules directory does not exist!');
  }
} catch (error) {
  console.log('Error reading directory:', error.message);
}

console.log('=== DEBUG END ===');