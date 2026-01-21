import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { Copy, Check } from 'lucide-react';
import './CodeBlock.css';

interface CodeBlockProps {
    value: {
        code: string;
        language?: string;
        filename?: string;
    };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value }) => {
    const [copied, setCopied] = useState(false);
    const { code, language, filename } = value;

    if (!code) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy functionality', err);
        }
    };

    return (
        <div className="code-block-container">
            <div className="code-header">
                <span className="code-language">
                    {filename || language || 'Code'}
                </span>
                <button
                    onClick={handleCopy}
                    className="copy-button"
                    aria-label="Copy code"
                    title="Copy code"
                >
                    {copied ? <Check /> : <Copy />}
                </button>
            </div>
            <SyntaxHighlighter
                language={language || 'text'}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    backgroundColor: '#1e1e1e', // Match container
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                }}
                showLineNumbers={false}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
