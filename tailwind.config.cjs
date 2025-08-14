const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx,html}')
  ],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
};