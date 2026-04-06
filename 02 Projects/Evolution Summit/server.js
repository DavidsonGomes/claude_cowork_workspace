const http = require('http');
const fs = require('fs');
const path = require('path');
const BASE = __dirname;
const PORT = 3000;

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.json': 'application/json', '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // API: Upload image
  if (req.method === 'POST' && req.url === '/api/upload') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(body);
        // Parse multipart manually or use simple JSON with base64
        const text = raw.toString();
        const data = JSON.parse(text);
        // data = { day, time, channel, phase, filename, base64 }
        const dayDir = path.join(BASE, 'imagens', 'dia-' + String(data.day).padStart(2, '0'));
        if (!fs.existsSync(dayDir)) fs.mkdirSync(dayDir, { recursive: true });

        const ext = path.extname(data.filename) || '.png';
        const timeSafe = data.time.replace(':', '');
        const channelShort = {
          'instagram-feed': 'ig-feed', 'instagram-stories': 'ig-stories',
          'linkedin': 'linkedin', 'email': 'email', 'email-aquecimento': 'email-aquec',
          'whatsapp-comunidade': 'wa-comunidade', 'whatsapp-inscritos': 'wa-inscritos',
          'discord': 'discord', 'youtube': 'youtube'
        }[data.channel] || data.channel;
        const phaseShort = { captura: 'cap', aquecimento: 'aquec', evento: 'evento', venda: 'venda' }[data.phase] || data.phase;

        // Find next available index
        const existing = fs.readdirSync(dayDir).filter(f => f.startsWith(timeSafe + '_' + channelShort + '_' + phaseShort));
        const idx = existing.length + 1;
        const newName = timeSafe + '_' + channelShort + '_' + phaseShort + '_' + idx + ext;
        const newPath = path.join(dayDir, newName);
        const relativePath = 'imagens/dia-' + String(data.day).padStart(2, '0') + '/' + newName;

        // Decode base64 and save
        const imgBuffer = Buffer.from(data.base64, 'base64');
        fs.writeFileSync(newPath, imgBuffer);

        // Update data.js: add image to the post
        let dataContent = fs.readFileSync(path.join(BASE, 'data.js'), 'utf8');
        const postId = data.postId;
        const idStr = 'id: "' + postId + '"';
        const idIdx = dataContent.indexOf(idStr);
        if (idIdx !== -1) {
          // Find images: [...] for this post
          const imagesIdx = dataContent.indexOf('images:', idIdx);
          const bracketStart = dataContent.indexOf('[', imagesIdx);
          let depth = 0, bracketEnd = bracketStart;
          for (let i = bracketStart; i < dataContent.length; i++) {
            if (dataContent[i] === '[') depth++;
            if (dataContent[i] === ']') { depth--; if (depth === 0) { bracketEnd = i; break; } }
          }
          const currentArr = dataContent.substring(bracketStart, bracketEnd + 1);
          const currentImages = JSON.parse(currentArr);
          currentImages.push(relativePath);
          dataContent = dataContent.substring(0, bracketStart) + JSON.stringify(currentImages) + dataContent.substring(bracketEnd + 1);
          fs.writeFileSync(path.join(BASE, 'data.js'), dataContent);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, path: relativePath }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // API: Update text field
  if (req.method === 'POST' && req.url === '/api/update-field') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(Buffer.concat(body).toString());
        // data = { postId, field, value }
        let dataContent = fs.readFileSync(path.join(BASE, 'data.js'), 'utf8');
        const idStr = 'id: "' + data.postId + '"';
        const idIdx = dataContent.indexOf(idStr);
        if (idIdx === -1) throw new Error('Post not found: ' + data.postId);

        // Find the field within this post (between this id and the next closing })
        const postEnd = dataContent.indexOf('\n  }', idIdx);
        const fieldStr = data.field + ': ';
        const fieldIdx = dataContent.indexOf(fieldStr, idIdx);
        if (fieldIdx === -1 || fieldIdx > postEnd) throw new Error('Field not found: ' + data.field);

        // Find the value: it's a JSON string from after fieldStr to the next comma+newline or newline
        const valueStart = fieldIdx + fieldStr.length;
        // The value is a JSON-encoded string (starts with " and ends with ",\n or "\n for images)
        // We need to find the end - it's the last char before ,\n or \n that closes this value
        let valueEnd;
        if (data.field === 'images') {
          // array value - find matching ]
          const bracketStart = dataContent.indexOf('[', valueStart);
          let depth = 0;
          for (let i = bracketStart; i < dataContent.length; i++) {
            if (dataContent[i] === '[') depth++;
            if (dataContent[i] === ']') { depth--; if (depth === 0) { valueEnd = i + 1; break; } }
          }
        } else {
          // string value - find the closing quote, handling escaped quotes
          let inString = false;
          let escaped = false;
          for (let i = valueStart; i < dataContent.length; i++) {
            const ch = dataContent[i];
            if (escaped) { escaped = false; continue; }
            if (ch === '\\\\') { escaped = true; continue; }
            if (ch === '"' && !inString) { inString = true; continue; }
            if (ch === '"' && inString) { valueEnd = i + 1; break; }
          }
        }

        const newValue = JSON.stringify(data.value);
        dataContent = dataContent.substring(0, valueStart) + newValue + dataContent.substring(valueEnd);
        fs.writeFileSync(path.join(BASE, 'data.js'), dataContent);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // API: Delete image
  if (req.method === 'DELETE' && req.url.startsWith('/api/image?')) {
    try {
      const params = new URLSearchParams(req.url.split('?')[1]);
      const imgPath = params.get('path');
      const postId = params.get('postId');
      const fullPath = path.join(BASE, imgPath);

      // Delete file
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

      // Update data.js: remove image from post
      let dataContent = fs.readFileSync(path.join(BASE, 'data.js'), 'utf8');
      const idStr = 'id: "' + postId + '"';
      const idIdx = dataContent.indexOf(idStr);
      if (idIdx !== -1) {
        const imagesIdx = dataContent.indexOf('images:', idIdx);
        const bracketStart = dataContent.indexOf('[', imagesIdx);
        let depth = 0, bracketEnd = bracketStart;
        for (let i = bracketStart; i < dataContent.length; i++) {
          if (dataContent[i] === '[') depth++;
          if (dataContent[i] === ']') { depth--; if (depth === 0) { bracketEnd = i; break; } }
        }
        const currentArr = dataContent.substring(bracketStart, bracketEnd + 1);
        const currentImages = JSON.parse(currentArr).filter(p => p !== imgPath);
        dataContent = dataContent.substring(0, bracketStart) + JSON.stringify(currentImages) + dataContent.substring(bracketEnd + 1);
        fs.writeFileSync(path.join(BASE, 'data.js'), dataContent);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
    return;
  }

  // Static file server
  const urlPath = req.url.split('?')[0]; // strip query string
  let filePath = path.join(BASE, urlPath === '/' ? 'index.html' : decodeURIComponent(urlPath));
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('\n  Evolution Summit Content Calendar');
  console.log('  Rodando em: http://localhost:' + PORT);
  console.log('  Ctrl+C para parar\n');
});
