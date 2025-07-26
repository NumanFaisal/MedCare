'use client'

import { useState } from 'react';

export default function TestSignup() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testSignup = async () => {
        setLoading(true);
        setResult('');
        
        try {
            const response = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: 'Test',
                    lastName: 'User',
                    email: `test-${Date.now()}@example.com`,
                    password: 'password123',
                    role: 'PATIENT'
                })
            });

            const data = await response.json();
            setResult(`Status: ${response.status}, Data: ${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            setResult(`Error: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Signup Test Page</h1>
            <button 
                onClick={testSignup} 
                disabled={loading}
                style={{ 
                    padding: '10px 20px', 
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Testing...' : 'Test Signup'}
            </button>
            
            {result && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    whiteSpace: 'pre-wrap'
                }}>
                    <strong>Result:</strong><br />
                    {result}
                </div>
            )}
        </div>
    );
}