const axios = require('axios');

async function testFigmaFetch() {
    const mcpServerUrl = 'http://localhost:3334';
    const fileId = 'aTNOVObmIMrHeiBVZTPNu8';
    const nodeId = '6-171';
    
    try {
        console.log('Testing Figma MCP Server...');
        
        // Test 1: Get file information
        console.log('\n1. Fetching file information...');
        const fileResponse = await axios.post(`${mcpServerUrl}/messages`, {
            method: 'tools/call',
            params: {
                name: 'get_file',
                arguments: {
                    file_id: fileId
                }
            }
        });
        
        console.log('File data received:', JSON.stringify(fileResponse.data, null, 2));
        
        // Test 2: Get specific node information
        console.log('\n2. Fetching node information...');
        const nodeResponse = await axios.post(`${mcpServerUrl}/messages`, {
            method: 'tools/call',
            params: {
                name: 'get_file_nodes',
                arguments: {
                    file_id: fileId,
                    node_ids: [nodeId]
                }
            }
        });
        
        console.log('Node data received:', JSON.stringify(nodeResponse.data, null, 2));
        
        // Test 3: List available tools
        console.log('\n3. Listing available tools...');
        const toolsResponse = await axios.post(`${mcpServerUrl}/messages`, {
            method: 'tools/list'
        });
        
        console.log('Available tools:', JSON.stringify(toolsResponse.data, null, 2));
        
    } catch (error) {
        console.error('Error fetching from Figma:', error.response?.data || error.message);
    }
}

testFigmaFetch();
