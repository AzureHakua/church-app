const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the admin password to hash: ', (password) => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  const escapedHash = hash.replace(/\$/g, '\\$');
  console.log('Add this to your .env.local file:');
  console.log(`NEXT_PUBLIC_ADMIN_PASSWORD_HASH=${escapedHash}`);
  rl.close();
});