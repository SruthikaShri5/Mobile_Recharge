const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment setup...\n');

const checks = [
  {
    name: 'Backend package.json',
    path: './backend/package.json',
    required: true
  },
  {
    name: 'Frontend package.json', 
    path: './frontend/package.json',
    required: true
  },
  {
    name: 'Render configuration',
    path: './render.yaml',
    required: true
  },
  {
    name: 'Backend environment example',
    path: './backend/.env.example',
    required: true
  },
  {
    name: 'Frontend production env',
    path: './frontend/.env.production',
    required: true
  },
  {
    name: 'Git ignore file',
    path: './.gitignore',
    required: true
  }
];

let allGood = true;

checks.forEach(check => {
  const exists = fs.existsSync(check.path);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${check.name}`);
  
  if (!exists && check.required) {
    allGood = false;
  }
});

console.log('\n📋 Summary:');
if (allGood) {
  console.log('✅ All required files are present!');
  console.log('\n🚀 Ready for deployment to Render!');
  console.log('\nNext steps:');
  console.log('1. git init && git add . && git commit -m "Initial commit"');
  console.log('2. Push to GitHub');
  console.log('3. Connect to Render and deploy');
} else {
  console.log('❌ Some required files are missing. Please check the setup.');
}