const https = require('https');

const FIGMA_API_KEY = 'figd_SEogBJcBXJKqR8978JJiV0MST6muNFD-6JeidCqS';
const fileId = 'aTNOVObmIMrHeiBVZTPNu8';
const nodeId = '6-171';

async function fetchFigmaDesign() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.figma.com',
            path: `/v1/files/${fileId}`,
            method: 'GET',
            headers: {
                'X-Figma-Token': FIGMA_API_KEY
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

async function fetchSpecificNode() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.figma.com',
            path: `/v1/files/${fileId}/nodes?ids=${nodeId}`,
            method: 'GET',
            headers: {
                'X-Figma-Token': FIGMA_API_KEY
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

async function main() {
    try {
        console.log('🎨 Fetching Figma design data...\n');
        
        console.log('📄 File Information:');
        const fileData = await fetchFigmaDesign();
        console.log(`- Name: ${fileData.name}`);
        console.log(`- Last Modified: ${fileData.lastModified}`);
        console.log(`- Version: ${fileData.version}`);
        console.log(`- Pages: ${fileData.document.children.length}`);
        
        console.log('\n🎯 Specific Node Information:');
        const nodeData = await fetchSpecificNode();
        console.log(JSON.stringify(nodeData, null, 2));
        
        // Save the data to a file for further inspection
        const fs = require('fs');
        fs.writeFileSync('./figma_data.json', JSON.stringify({
            file: fileData,
            node: nodeData
        }, null, 2));
        
        console.log('\n✅ Data saved to figma_data.json');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main();
