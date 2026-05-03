const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Beautiful HTML Response for Web
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>✨ MISS ALIYA EDITING TOOL ✨</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Poppins', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            
            .container {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 30px;
                padding: 40px;
                max-width: 800px;
                width: 100%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: fadeIn 0.8s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .header h1 {
                font-size: 2.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 10px;
            }
            
            .header .badge {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                padding: 5px 15px;
                border-radius: 50px;
                display: inline-block;
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .image-preview {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 20px;
            }
            
            .image-preview img {
                max-width: 100%;
                max-height: 300px;
                border-radius: 15px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            }
            
            .placeholder {
                width: 100%;
                height: 200px;
                background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #999;
                font-size: 0.9rem;
            }
            
            .feature-box {
                background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                padding: 20px;
                border-radius: 20px;
                margin-bottom: 25px;
            }
            
            .feature-title {
                font-weight: 800;
                font-size: 1.2rem;
                margin-bottom: 15px;
                color: #333;
            }
            
            .feature-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 10px;
                margin-top: 10px;
            }
            
            .feature-item {
                background: white;
                padding: 8px 12px;
                border-radius: 10px;
                font-size: 0.85rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                border: 1px solid #ddd;
            }
            
            .feature-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                border-color: #667eea;
            }
            
            input, textarea {
                width: 100%;
                padding: 15px;
                border: 2px solid #e0e0e0;
                border-radius: 15px;
                font-size: 1rem;
                font-family: 'Poppins', sans-serif;
                transition: all 0.3s;
                margin-bottom: 15px;
            }
            
            input:focus, textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
            }
            
            button {
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 15px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(102,126,234,0.4);
            }
            
            button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            .result {
                margin-top: 25px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 20px;
                display: none;
            }
            
            .result img {
                max-width: 100%;
                border-radius: 15px;
                margin-top: 15px;
            }
            
            .loading {
                display: none;
                text-align: center;
                margin-top: 20px;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .url-input-group {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .url-input-group input {
                flex: 1;
                margin-bottom: 0;
            }
            
            .url-input-group button {
                width: auto;
                padding: 0 20px;
                background: #4CAF50;
            }
            
            @media (max-width: 600px) {
                .container { padding: 20px; }
                .header h1 { font-size: 1.8rem; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>👑 MISS ALIYA EDITING TOOL 👑</h1>
                <div class="badge">⚡ Professional Photo Editor ⚡</div>
            </div>
            
            <div class="image-preview">
                <div id="previewArea">
                    <div class="placeholder">📸 Your edited image will appear here</div>
                </div>
            </div>
            
            <div class="feature-box">
                <div class="feature-title">✨ WHAT CAN I DO?</div>
                <div class="feature-grid">
                    <div class="feature-item" onclick="setPrompt('make this person look like a handsome boy')">👦 BOY BANAYE</div>
                    <div class="feature-item" onclick="setPrompt('make this person look like a beautiful girl')">👧 GIRL BANAYE</div>
                    <div class="feature-item" onclick="setPrompt('remove text from this image')">📝 NAAM/NUMBER HATAYE</div>
                    <div class="feature-item" onclick="setPrompt('make this person look younger')">👶 YOUNG KARE</div>
                    <div class="feature-item" onclick="setPrompt('make this person look older')">👴 OLD KARE</div>
                    <div class="feature-item" onclick="setPrompt('add sunglasses to this person')">🕶️ SUNGLASSES LAGAYE</div>
                    <div class="feature-item" onclick="setPrompt('change background to beach')">🏖️ BACKGROUND BADLE</div>
                    <div class="feature-item" onclick="setPrompt('make this black and white photo colorful')">🎨 COLOR KARE</div>
                </div>
            </div>
            
            <div class="url-input-group">
                <input type="text" id="imageUrl" placeholder="📷 Paste image URL here...">
                <button onclick="loadFromUrl()">LOAD</button>
            </div>
            
            <textarea id="prompt" rows="3" placeholder="✏️ Type your edit command here...&#10;&#10;Example: make this person look like a boy or remove the name from shirt"></textarea>
            
            <button onclick="editImage()" id="editBtn">✨ START EDITING ✨</button>
            
            <div class="loading" id="loading">
                <div class="spinner"></div>
                <p style="margin-top: 10px;">🎨 MISS ALIYA IS EDITING YOUR IMAGE...</p>
                <p style="font-size: 0.85rem; color: #666;">Please wait 10-30 seconds</p>
            </div>
            
            <div class="result" id="result"></div>
        </div>
        
        <script>
            let currentImageUrl = '';
            
            function setPrompt(text) {
                document.getElementById('prompt').value = text;
            }
            
            function loadFromUrl() {
                const url = document.getElementById('imageUrl').value;
                if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                    currentImageUrl = url;
                    document.getElementById('previewArea').innerHTML = \`<img src="\${url}" alt="Preview">\`;
                } else {
                    alert('Please enter a valid image URL starting with http:// or https://');
                }
            }
            
            async function editImage() {
                const prompt = document.getElementById('prompt').value;
                let imageUrl = currentImageUrl || document.getElementById('imageUrl').value;
                
                if (!prompt) {
                    alert('❌ Please enter an edit command!');
                    return;
                }
                
                if (!imageUrl || !imageUrl.startsWith('http')) {
                    alert('❌ Please load an image first (paste URL and click LOAD)');
                    return;
                }
                
                document.getElementById('editBtn').disabled = true;
                document.getElementById('loading').style.display = 'block';
                document.getElementById('result').style.display = 'none';
                
                try {
                    const response = await fetch('/edit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: prompt, imageUrl: imageUrl })
                    });
                    
                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.error || 'Something went wrong');
                    }
                    
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    
                    document.getElementById('result').innerHTML = \`
                        <h3 style="margin-bottom: 15px;">✅ EDITING COMPLETE!</h3>
                        <p>📝 Command: <strong>\${prompt}</strong></p>
                        <img src="\${url}" alt="Edited Image">
                        <a href="\${url}" download="miss_aliya_edited.png" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 10px;">💾 DOWNLOAD IMAGE</a>
                    \`;
                    document.getElementById('result').style.display = 'block';
                    
                } catch (error) {
                    alert('❌ Error: ' + error.message + '\\n\\nPlease try again!');
                } finally {
                    document.getElementById('editBtn').disabled = false;
                    document.getElementById('loading').style.display = 'none';
                }
            }
        </script>
    </body>
    </html>
    `);
});

// Image editing endpoint (same working API)
app.post('/edit', async (req, res) => {
    try {
        const { prompt, imageUrl } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        
        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }
        
        // Aapki original API key aur cookie yahi same hai
        const cookie = "AEC=AVh_V2iyBHpOrwnn7CeXoAiedfWn9aarNoKT20Br2UX9Td9K-RAeS_o7Sg; HSID=Ao0szVfkYnMchTVfk; SSID=AGahZP8H4ni4UpnFV; APISID=SD-Q2DJLGdmZcxlA/AS8N0Gkp_b9sJC84f; SAPISID=9BY2tOwgEz4dK4dY/Acpw5_--fM7PV-aw4; __Secure-1PAPISID=9BY2tOwgEz4dK4dY/Acpw5_--fM7PV-aw4; __Secure-3PAPISID=9BY2tOwgEz4dK4dY/Acpw5_--fM7PV-aw4; SEARCH_SAMESITE=CgQI354B; SID=g.a0002wiVPDeqp9Z41WGZdsMDSNVWFaxa7cmenLYb7jwJzpe0kW3bZzx09pPfc201wUcRVKfh-wACgYKAXUSARMSFQHGX2MiU_dnPuMOs-717cJlLCeWOBoVAUF8yKpYTllPAbVgYQ0Mr_GyeXxV0076; __Secure-1PSID=g.a0002wiVPDeqp9Z41WGZdsMDSNVWFaxa7cmenLYb7jwJzpe0kW3b_Pt9L1eqcIAVeh7ZdRBOXgACgYKAYESARMSFQHGX2MicAK_Acu_-NCkzEz2wjCHmxoVAUF8yKp9xk8gQ82f-Ob76ysTXojB0076; __Secure-3PSID=g.a0002wiVPDeqp9Z41WGZdsMDSNVWFaxa7cmenLYb7jwJzpe0kW3bUudZTunPKtKbLRSoGKl1dAACgYKAYISARMSFQHGX2MimdzCEq63UmiyGU-3eyZx9RoVAUF8yKrc4ycLY7LGaJUyDXk_7u7M0076";
        
        const apiUrl = `https://anabot.my.id/api/ai/geminiOption?prompt=${encodeURIComponent(prompt)}&type=NanoBanana&imageUrl=${encodeURIComponent(imageUrl)}&cookie=${encodeURIComponent(cookie)}&apikey=freeApikey`;
        
        console.log('🖼️ Editing image with prompt:', prompt);
        
        const response = await axios.get(apiUrl, {
            headers: { 'Accept': 'application/json' },
            timeout: 90000
        });
        
        if (!response.data || !response.data.success) {
            throw new Error(response.data?.message || "API request failed");
        }
        
        const resultUrl = response.data.data.result.url;
        
        const imageResponse = await axios({
            url: resultUrl,
            method: 'GET',
            responseType: 'arraybuffer',
            timeout: 90000
        });
        
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(imageResponse.data);
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║    👑 MISS ALIYA EDITING TOOL 👑       ║
    ║    ✨ Professional Photo Editor ✨      ║
    ╠═══════════════════════════════════════╣
    ║    Server Running on Port: ${PORT}      ║
    ║    Ready to Edit Images!               ║
    ╚═══════════════════════════════════════╝
    `);
});
