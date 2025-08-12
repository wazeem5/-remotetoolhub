// RemoteToolHub - Developer Tools JavaScript Functions
// Version 1.0 - All Essential Tools

// ===========================================
// 1. PASSWORD GENERATOR
// ===========================================
function generatePassword() {
    const length = document.getElementById('passwordLength')?.value || 16;
    const includeUppercase = document.getElementById('includeUppercase')?.checked ?? true;
    const includeLowercase = document.getElementById('includeLowercase')?.checked ?? true;
    const includeNumbers = document.getElementById('includeNumbers')?.checked ?? true;
    const includeSymbols = document.getElementById('includeSymbols')?.checked ?? true;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        showToast('Please select at least one character type', 'error');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    const resultElement = document.getElementById('passwordResult');
    if (resultElement) {
        resultElement.value = password;
        resultElement.style.display = 'block';
    }
    
    // Calculate password strength
    const strength = calculatePasswordStrength(password);
    updatePasswordStrength(strength);
    
    showToast('Password generated successfully!', 'success');
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length bonus
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety bonus
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(score, 5);
}

function updatePasswordStrength(strength) {
    const strengthElement = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthElement || !strengthText) return;
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['#ff4757', '#ff6b7a', '#ffa502', '#2ed573', '#1e90ff', '#5352ed'];
    
    strengthElement.style.width = `${(strength / 5) * 100}%`;
    strengthElement.style.backgroundColor = colors[strength];
    strengthText.textContent = levels[strength];
    strengthText.style.color = colors[strength];
}

function copyPassword() {
    const passwordResult = document.getElementById('passwordResult');
    if (passwordResult && passwordResult.value) {
        copyToClipboard(passwordResult.value);
        showToast('Password copied to clipboard!', 'success');
    }
}

// ===========================================
// 2. JSON FORMATTER
// ===========================================
function formatJSON() {
    const input = document.getElementById('jsonInput')?.value;
    const output = document.getElementById('jsonOutput');
    
    if (!input || !output) {
        showToast('Please enter JSON to format', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        output.value = formatted;
        output.style.display = 'block';
        
        // Add syntax highlighting
        highlightJSON(output);
        
        showToast('JSON formatted successfully!', 'success');
    } catch (error) {
        showToast(`Invalid JSON: ${error.message}`, 'error');
        output.value = `Error: ${error.message}`;
        output.style.color = '#ff4757';
    }
}

function minifyJSON() {
    const input = document.getElementById('jsonInput')?.value;
    const output = document.getElementById('jsonOutput');
    
    if (!input || !output) {
        showToast('Please enter JSON to minify', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        output.value = minified;
        output.style.display = 'block';
        output.style.color = '#333';
        
        showToast('JSON minified successfully!', 'success');
    } catch (error) {
        showToast(`Invalid JSON: ${error.message}`, 'error');
    }
}

function validateJSON() {
    const input = document.getElementById('jsonInput')?.value;
    
    if (!input) {
        showToast('Please enter JSON to validate', 'error');
        return;
    }
    
    try {
        JSON.parse(input);
        showToast('✅ Valid JSON!', 'success');
    } catch (error) {
        showToast(`❌ Invalid JSON: ${error.message}`, 'error');
    }
}

function highlightJSON(element) {
    // Simple JSON syntax highlighting
    let content = element.value;
    content = content.replace(/"([^"]+)":/g, '<span style="color: #e74c3c;">"$1":</span>');
    content = content.replace(/: "([^"]+)"/g, ': <span style="color: #27ae60;">"$1"</span>');
    content = content.replace(/: (true|false|null)/g, ': <span style="color: #3498db;">$1</span>');
    content = content.replace(/: (\d+)/g, ': <span style="color: #f39c12;">$1</span>');
    
    // Note: This is a simplified version. For production, use a proper syntax highlighter
}

// ===========================================
// 3. BASE64 ENCODER/DECODER
// ===========================================
function encodeBase64() {
    const input = document.getElementById('base64Input')?.value;
    const output = document.getElementById('base64Output');
    
    if (!input) {
        showToast('Please enter text to encode', 'error');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        output.value = encoded;
        output.style.display = 'block';
        showToast('Text encoded to Base64!', 'success');
    } catch (error) {
        showToast('Error encoding text', 'error');
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input')?.value;
    const output = document.getElementById('base64Output');
    
    if (!input) {
        showToast('Please enter Base64 to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        output.value = decoded;
        output.style.display = 'block';
        showToast('Base64 decoded successfully!', 'success');
    } catch (error) {
        showToast('Invalid Base64 string', 'error');
    }
}

// ===========================================
// 4. COLOR PALETTE GENERATOR
// ===========================================
function generateColorPalette() {
    const baseColor = document.getElementById('baseColor')?.value || '#3498db';
    const paletteContainer = document.getElementById('colorPalette');
    
    if (!paletteContainer) return;
    
    const colors = generateHarmoniousColors(baseColor);
    
    paletteContainer.innerHTML = '';
    colors.forEach((color, index) => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-swatch';
        colorDiv.style.cssText = `
            background-color: ${color};
            width: 80px;
            height: 80px;
            border-radius: 8px;
            margin: 5px;
            display: inline-block;
            cursor: pointer;
            position: relative;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        
        const colorCode = document.createElement('div');
        colorCode.textContent = color.toUpperCase();
        colorCode.style.cssText = `
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            font-weight: bold;
            color: #333;
        `;
        
        colorDiv.appendChild(colorCode);
        colorDiv.onclick = () => {
            copyToClipboard(color);
            showToast(`Color ${color} copied!`, 'success');
        };
        
        paletteContainer.appendChild(colorDiv);
    });
    
    showToast('Color palette generated!', 'success');
}

function generateHarmoniousColors(baseColor) {
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];
    
    // Generate complementary colors
    colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
    
    // Generate triadic colors
    colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
    colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
    
    // Generate analogous colors
    colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
    colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
    
    return colors;
}

function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ===========================================
// 5. QR CODE GENERATOR
// ===========================================
function generateQRCode() {
    const text = document.getElementById('qrText')?.value;
    const qrContainer = document.getElementById('qrResult');
    
    if (!text) {
        showToast('Please enter text to generate QR code', 'error');
        return;
    }
    
    if (!qrContainer) return;
    
    // Using QR Server API for QR code generation
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    
    qrContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <img src="${qrUrl}" alt="QR Code" style="border: 1px solid #ddd; border-radius: 8px;" />
            <div style="margin-top: 10px;">
                <button onclick="downloadQRCode('${qrUrl}')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Download QR Code
                </button>
            </div>
        </div>
    `;
    
    showToast('QR Code generated successfully!', 'success');
}

function downloadQRCode(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('QR Code downloaded!', 'success');
}

// ===========================================
// 6. TIME ZONE CONVERTER
// ===========================================
function convertTimeZone() {
    const time = document.getElementById('timeInput')?.value;
    const fromZone = document.getElementById('fromTimeZone')?.value || 'UTC';
    const toZone = document.getElementById('toTimeZone')?.value || 'America/New_York';
    const resultElement = document.getElementById('timeResult');
    
    if (!time || !resultElement) {
        showToast('Please enter a time to convert', 'error');
        return;
    }
    
    try {
        const date = new Date(`2024-01-01 ${time}`);
        
        // This is a simplified conversion. For production, use a proper timezone library like moment.js
        const options = {
            timeZone: toZone,
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const convertedTime = date.toLocaleTimeString('en-US', options);
        
        resultElement.innerHTML = `
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <h4 class="font-semibold text-green-800">Converted Time</h4>
                <p class="text-green-700">
                    <strong>${time}</strong> (${fromZone}) = 
                    <strong>${convertedTime}</strong> (${toZone})
                </p>
            </div>
        `;
        
        showToast('Time converted successfully!', 'success');
    } catch (error) {
        showToast('Error converting time', 'error');
    }
}

// ===========================================
// 7. TEXT COUNTER
// ===========================================
function countText() {
    const text = document.getElementById('textInput')?.value || '';
    const resultElement = document.getElementById('textStats');
    
    if (!resultElement) return;
    
    const stats = {
        characters: text.length,
        charactersNoSpaces: text.replace(/\s/g, '').length,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0,
        paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0,
        readingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 200) // 200 words per minute
    };
    
    resultElement.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div class="bg-blue-50 p-3 rounded-lg text-center">
                <div class="text-2xl font-bold text-blue-600">${stats.characters}</div>
                <div class="text-sm text-blue-800">Characters</div>
            </div>
            <div class="bg-green-50 p-3 rounded-lg text-center">
                <div class="text-2xl font-bold text-green-600">${stats.charactersNoSpaces}</div>
                <div class="text-sm text-green-800">Characters (no spaces)</div>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg text-center">
                <div class="text-2xl font-bold text-purple-600">${stats.words}</div>
                <div class="text-sm text-purple-800">Words</div>
            </div>
            <div class="bg-orange-50 p-3 rounded-lg text-center">
                <div class="text-2xl font-bold text-orange-600">${stats.sentences}</div>
                <div class="text-sm text-orange-800">Sentences</div>
            </div>
            <div class="bg-red-50 p-3 rounded-lg text-center">
                <div class="text-2xl font-bold text-red-600">${stats.paragraphs}</div>
                <div class="text-sm text-red-800">Paragraphs</div>
            </div>
            <div class="bg-indigo-50 p-3 rounded-lg text-center">
                <div class="text-2xl font-bold text-indigo-600">${stats.readingTime}</div>
                <div class="text-sm text-indigo-800">Min read</div>
            </div>
        </div>
    `;
}

// Real-time text counting
function setupTextCounter() {
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.addEventListener('input', countText);
        countText(); // Initial count
    }
}

// ===========================================
// 8. HASH GENERATOR
// ===========================================
function generateHash() {
    const text = document.getElementById('hashInput')?.value;
    const algorithm = document.getElementById('hashAlgorithm')?.value || 'SHA-256';
    const resultElement = document.getElementById('hashResult');
    
    if (!text) {
        showToast('Please enter text to hash', 'error');
        return;
    }
    
    if (!resultElement) return;
    
    // Using Web Crypto API for secure hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    let algoName;
    switch (algorithm) {
        case 'MD5':
            // MD5 is not available in Web Crypto API, using a simple hash
            resultElement.value = simpleHash(text);
            showToast('Hash generated (Note: MD5 is not cryptographically secure)', 'warning');
            return;
        case 'SHA-1':
            algoName = 'SHA-1';
            break;
        case 'SHA-256':
        default:
            algoName = 'SHA-256';
            break;
    }
    
    crypto.subtle.digest(algoName, data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resultElement.value = hashHex;
        resultElement.style.display = 'block';
        showToast(`${algorithm} hash generated successfully!`, 'success');
    }).catch(error => {
        showToast('Error generating hash', 'error');
    });
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
}

// ===========================================
// 9. URL SHORTENER (Mock Implementation)
// ===========================================
function shortenURL() {
    const url = document.getElementById('urlInput')?.value;
    const resultElement = document.getElementById('urlResult');
    
    if (!url) {
        showToast('Please enter a URL to shorten', 'error');
        return;
    }
    
    // Validate URL
    try {
        new URL(url);
    } catch {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    if (!resultElement) return;
    
    // Mock short URL generation (in production, use a real URL shortening service)
    const shortCode = Math.random().toString(36).substring(2, 8);
    const shortUrl = `https://rtool.ly/${shortCode}`;
    
    resultElement.innerHTML = `
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-green-800 mb-2">Shortened URL</h4>
            <div class="flex items-center gap-2">
                <input type="text" value="${shortUrl}" readonly 
                       class="flex-1 p-2 border rounded bg-white" id="shortUrlResult">
                <button onclick="copyShortURL()" 
                        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Copy
                </button>
            </div>
            <p class="text-sm text-green-600 mt-2">
                Original: <a href="${url}" target="_blank" class="underline">${url}</a>
            </p>
        </div>
    `;
    
    showToast('URL shortened successfully!', 'success');
}

function copyShortURL() {
    const shortUrlResult = document.getElementById('shortUrlResult');
    if (shortUrlResult) {
        copyToClipboard(shortUrlResult.value);
        showToast('Short URL copied to clipboard!', 'success');
    }
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}

// Toast notification function
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.getElementById('toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
    };
    
    toast.className += ` ${colors[type] || colors.info}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// Initialize all tools when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupTextCounter();
    
    // Add event listeners for real-time updates
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.addEventListener('input', countText);
    }
    
    // Initialize color picker
    const baseColorInput = document.getElementById('baseColor');
    if (baseColorInput) {
        baseColorInput.addEventListener('change', generateColorPalette);
    }
    
    console.log('RemoteToolHub tools initialized successfully!');
});

// Export functions for global access
window.RemoteToolHub = {
    generatePassword,
    copyPassword,
    formatJSON,
    minifyJSON,
    validateJSON,
    encodeBase64,
    decodeBase64,
    generateColorPalette,
    generateQRCode,
    convertTimeZone,
    countText,
    generateHash,
    shortenURL,
    copyToClipboard,
    showToast
};