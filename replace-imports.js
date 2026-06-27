const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:/AVLANCE/universal-interiors/universal-interiors-v2/src')
  .filter(f => f.endsWith('.js') || f.endsWith('.jsx'));

files.forEach(file => {
  if (file.includes('react-router-dom.js')) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('react-router-dom')) {
    content = content.replace(/['"`]react-router-dom['"`]/g, "'@/utils/react-router-dom'");
    fs.writeFileSync(file, content);
  }
});
