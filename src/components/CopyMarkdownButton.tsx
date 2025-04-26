"use client"

import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

const CopyMarkdownButton = ({ content }: { content: string }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <Button
            onClick={copyToClipboard}
            disabled={!content}
            variant={copied ? "outline" : "default"}
            className="gap-2"
        >
            {copied ? (
                <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4" />
                    Copy Markdown
                </>
            )}
        </Button>
    );
};

export default CopyMarkdownButton;