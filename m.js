const fs = require('fs');

function addDebugLogs(fileName) {
    fs.readFile(fileName, 'utf8', (err, code) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

        const functionPattern = /(function\s+(\w+)\s*\([^)]*\)\s*\{)|(const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{)|(let\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{)|(var\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{)/g;

        const modifiedCode = code.replace(functionPattern, (match, p1, p2, p3, p4, p5, p6, p7, p8) => {
            let functionName = 'anonymous';
            if (p2) functionName = p2;
            else if (p4) functionName = p4;
            else if (p6) functionName = p6;
            else if (p8) functionName = p8;
            const debugLog = `console.log('debug ${functionName}');\n`;
            return match + debugLog;
        });

        fs.writeFile(fileName, modifiedCode, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
                return;
            }
            console.log(`Debug logs added to ${fileName}`);
        });
    });
}

// Specify your JavaScript file name
const fileName = 'plotly-2.33.0_m1.js';
addDebugLogs(fileName);
