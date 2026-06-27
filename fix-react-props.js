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

const replacements = {
  'fetchpriority=': 'fetchPriority=',
  'stroke-miterlimit=': 'strokeMiterlimit=',
  'stroke-width=': 'strokeWidth=',
  'stroke-linecap=': 'strokeLinecap=',
  'stroke-linejoin=': 'strokeLinejoin=',
  'fill-rule=': 'fillRule=',
  'clip-rule=': 'clipRule=',
  'clip-path=': 'clipPath=',
  'fill-opacity=': 'fillOpacity=',
  'stroke-dasharray=': 'strokeDasharray=',
  'stroke-dashoffset=': 'strokeDashoffset=',
  'stop-color=': 'stopColor=',
  'stop-opacity=': 'stopOpacity='
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  for (const [key, value] of Object.entries(replacements)) {
    // case-insensitive replace just in case
    const regex = new RegExp(key, 'gi');
    newContent = newContent.replace(regex, value);
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
  }
});
