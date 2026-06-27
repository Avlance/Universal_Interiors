const fs = require('fs');
const file = 'd:/AVLANCE/universal-interiors/universal-interiors-v2/src/components/layout/Header.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add "use client"
content = '"use client";\n' + content;

// 2. Mock react-router-dom
content = content.replace(/['"`]react-router-dom['"`]/g, "'@/utils/react-router-dom'");

// 3. Fix routes alias
content = content.replace(/\.\.\/\.\.\/routes\//g, "@/_old_routes/");

// 4. Fix window SSR bug
content = content.replace(/useState\(window\.innerWidth > 1024\)/g, "useState(typeof window !== 'undefined' ? window.innerWidth > 1024 : true)");

fs.writeFileSync(file, content);
