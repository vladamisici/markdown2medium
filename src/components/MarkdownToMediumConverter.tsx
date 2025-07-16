"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import html2canvas from 'html2canvas';
import {
    AlertCircle,
    CheckCircle,
    Code2,
    Copy,
    Download,
    Eye,
    Github,
    HelpCircle,
    ImageIcon,
    Loader2,
    Maximize,
    Play,
    Rocket,
    Settings,
    Upload,
    X
} from 'lucide-react';
import { marked } from 'marked';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Define TypeScript interfaces
interface ConversionSettings {
    tableHandlingMethod: 'html' | 'image';
    codeHandlingMethod: 'html' | 'image';
    codeTheme: 'light' | 'dark';
    mermaidHandlingMethod: 'html' | 'image';
    mermaidTheme: 'light' | 'dark';
    addMediumClasses: boolean;
    imgbbApiKey?: string;
    uploadToImgBB: boolean;
}

interface ProcessedElement {
    id: string;
    type: 'table' | 'code' | 'mermaid';
    content: string;
    language?: string;
    placeholder: string;
}

const MarkdownToMediumConverter: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('');
    const [htmlOutput, setHtmlOutput] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('editor');
    const [darkMode] = useState<boolean>(false);
    const [wordCount, setWordCount] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);
    const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
    const [showQuickGuide, setShowQuickGuide] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const { toast } = useToast();
    
    // Conversion states
    const [isConverting, setIsConverting] = useState<boolean>(false);
    const [convertProgress, setConvertProgress] = useState<string>('');
    const [hasConverted, setHasConverted] = useState<boolean>(false);
    const highlighterRef = useRef<any>(null);
    
    // Settings state
    const [settings, setSettings] = useState<ConversionSettings>({
        tableHandlingMethod: 'image',
        codeHandlingMethod: 'html',
        codeTheme: 'light',
        mermaidHandlingMethod: 'image',
        mermaidTheme: 'light',
        addMediumClasses: true,
        imgbbApiKey: '',
        uploadToImgBB: false
    });

    const sampleMarkdown = `# Welcome to Markdown2Medium Converter!

## Getting Started

Here's a sample post to show you how it works:

### Features Highlight

- ✨ Clean editor with live preview
- 🎨 Medium-specific formatting
- 💾 Export to HTML file
- 📊 Table support (partial)

## Try These Elements

**Bold text** and *italic text*

> A meaningful blockquote

\`\`\`javascript
// Code block example
function hello() {
  return "Medium readers!";
}
\`\`\`

### Sample Table

| Feature | Description | Status |
| ------- | ----------- | ------ |
| Headings | H1, H2, H3 formatting | ✅ |
| Lists | Ordered and unordered lists | ✅ |
| Code | Syntax highlighting | ✅ |
| Tables | Properly formatted tables | ✅ |

### Another Code Example

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
    
print(greet("Medium"))
\`\`\`

### Another Table

| Name | Age | City |
| ---- | --- | ---- |
| John | 25 | NYC |
| Jane | 30 | LA |

### Sample Mermaid

\`\`\`mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
\`\`\`

![Sample Image](https://placehold.co/800x400)

## Happy Writing!

Start editing this text or paste your own Markdown content.
`;

    const openNewPagePreview = (): void => {
        const cleanHtml = htmlOutput.replace(/^<div>|<\/div>$/g, '');
        const htmlContent = `
      <!DOCTYPE html>
      <html class="${darkMode ? 'dark' : ''}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Medium Post Preview</title>
          <style>
            /* Medium-like styling */
            .graf--h1 { font-size: 2.5rem; line-height: 1.2; margin: 2rem 0; font-weight: 700; }
            .graf--h2 { font-size: 2rem; margin: 1.8rem 0; font-weight: 600; }
            .graf--p { font-size: 1.1rem; line-height: 1.7; margin: 1.5rem 0; color: #292929; }
            .graf--blockquote { border-left: 4px solid #e6e6e6; padding-left: 1.5rem; margin: 2rem 0; color: #666; }
            .graf--pre { background: #f8f8f8; padding: 1.5rem; border-radius: 4px; overflow: auto; }
            .graf--image { max-width: 100%; height: auto; margin: 2rem 0; border-radius: 4px; }
            .postList { list-style-type: disc; padding-left: 2rem; }
            body.dark { background: #1a1a1a; color: #e6e6e6; }
            body.dark .graf--p { color: #e6e6e6; }
            
            /* Beautiful table styling */
            table {
                border-collapse: collapse;
                width: 100%;
                margin: 2rem 0;
                font-size: 0.95rem;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            
            table th {
                background-color: #f7f7f7;
                color: #333;
                font-weight: 600;
                padding: 12px 16px;
                text-align: left;
                border-bottom: 2px solid #e0e0e0;
            }
            
            table td {
                padding: 12px 16px;
                border-bottom: 1px solid #e0e0e0;
            }
            
            table tr:last-child td {
                border-bottom: none;
            }
            
            table tr:hover {
                background-color: #f9f9f9;
            }
            
            /* Dark mode table */
            body.dark table {
                box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
            }
            
            body.dark table th {
                background-color: #2d2d2d;
                color: #e6e6e6;
                border-bottom-color: #444;
            }
            
            body.dark table td {
                border-bottom-color: #444;
            }
            
            body.dark table tr:hover {
                background-color: #2a2a2a;
            }
          </style>
        </head>
        <body class="${darkMode ? 'dark bg-gray-900' : 'bg-white'}">
          <main class="max-w-2xl mx-auto p-6">
            ${cleanHtml}
          </main>
        </body>
      </html>
    `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');

        if (newWindow) {
            newWindow.onload = () => URL.revokeObjectURL(url);
        }
    };

    // Initialize highlighter
    const initializeHighlighter = async () => {
        if (!highlighterRef.current) {
            const { createHighlighter } = await import('shiki');
            
            highlighterRef.current = await createHighlighter({
                themes: ['github-dark', 'github-light'],
                langs: ['javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'html', 'css', 'sql', 'bash', 'json', 'xml', 'yaml', 'markdown', 'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala', 'r', 'matlab', 'text']
            });
        }
        return highlighterRef.current;
    };

    // Extract and process all special elements (tables and code blocks)
    const extractSpecialElements = (markdownText: string): ProcessedElement[] => {
        const elements: ProcessedElement[] = [];
        let elementCounter = 0;
        
        // First, extract code blocks (they use triple backticks)
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const codeBlocks: Array<{match: string, language: string, content: string, index: number}> = [];
        let match;
        
        while ((match = codeBlockRegex.exec(markdownText)) !== null) {
            codeBlocks.push({
                match: match[0],
                language: match[1] || 'text',
                content: match[2],
                index: match.index
            });
        }
        
        // Then extract tables (lines with pipes, excluding code blocks)
        const lines = markdownText.split('\n');
        const tables: Array<{lines: string[], startIndex: number}> = [];
        let currentTable: string[] = [];
        let tableStartIndex = -1;
        let inCodeBlock = false;
        let currentIndex = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            currentIndex += line.length + 1; // +1 for newline
            
            // Check if we're entering/exiting a code block
            if (line.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                continue;
            }
            
            // Skip if we're inside a code block
            if (inCodeBlock) continue;
            
            // Check for table lines
            if (line.includes('|') && line.trim().length > 0) {
                if (currentTable.length === 0) {
                    tableStartIndex = currentIndex - line.length - 1;
                }
                currentTable.push(line);
            } else if (currentTable.length > 0) {
                // End of table
                if (currentTable.length >= 2) { // Valid table needs at least 2 lines
                    tables.push({
                        lines: [...currentTable],
                        startIndex: tableStartIndex
                    });
                }
                currentTable = [];
                tableStartIndex = -1;
            }
        }
        
        // Don't forget the last table
        if (currentTable.length >= 2) {
            tables.push({
                lines: [...currentTable],
                startIndex: tableStartIndex
            });
        }
        
        // Create elements array with proper ordering
        codeBlocks.forEach((block) => {
            const id = `element-${elementCounter++}`;
            const type = block.language === 'mermaid' ? 'mermaid' : 'code';
            elements.push({
                id,
                type,
                content: block.content,
                language: block.language,
                placeholder: `<!--PLACEHOLDER-${id}-->`
            });
        });
        
        tables.forEach((table) => {
            const id = `element-${elementCounter++}`;
            elements.push({
                id,
                type: 'table',
                content: table.lines.join('\n'),
                placeholder: `<!--PLACEHOLDER-${id}-->`
            });
        });
        
        return elements;
    };

    // Convert table to HTML
    const createTableHtml = (tableContent: string): string => {
        const lines = tableContent.split('\n').filter(line => line.trim().length > 0);
        if (lines.length < 2) return '';

        // Process header
        const headerCells = lines[0]
            .split('|')
            .map(cell => cell.trim())
            .filter(cell => cell.length > 0);

        // Check if second line is separator
        const isSeparator = /^[\s\-:|]+$/.test(lines[1].replace(/\|/g, ''));
        const dataStartIndex = isSeparator ? 2 : 1;

        // Use simple table structure for better Medium compatibility
        let html = '<table><thead><tr>';
        headerCells.forEach(cell => {
            html += `<th>${cell}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Process data rows
        for (let i = dataStartIndex; i < lines.length; i++) {
            const cells = lines[i]
                .split('|')
                .map(cell => cell.trim())
                .filter(cell => cell.length > 0);

            if (cells.length > 0) {
                html += '<tr>';
                cells.forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            }
        }

        html += '</tbody></table>';
        return html;
    };

    // ImgBB upload function
    const uploadToImgBB = async (base64Image: string, apiKey: string): Promise<string | null> => {
        try {
            // Remove data URL prefix if present
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
            
            const formData = new FormData();
            formData.append('image', base64Data);
            
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('ImgBB upload error:', errorData);
                throw new Error(errorData.error?.message || 'Upload failed');
            }
            
            const data = await response.json();
            return data.data.url;
        } catch (error) {
            console.error('Error uploading to ImgBB:', error);
            return null;
        }
    };

    // Add delay between uploads to avoid rate limiting
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Convert element to image
    const convertElementToImage = async (element: ProcessedElement): Promise<string | null> => {
        try {
            let container: HTMLDivElement;
            
            if (element.type === 'code' && settings.codeHandlingMethod === 'image') {
                const highlighter = await initializeHighlighter();
                
                const highlightedHtml = highlighter.codeToHtml(element.content, {
                    lang: element.language || 'text',
                    theme: settings.codeTheme === 'dark' ? 'github-dark' : 'github-light'
                });

                container = document.createElement('div');
                container.style.position = 'absolute';
                container.style.left = '-9999px';
                container.style.padding = '20px';
                container.style.background = settings.codeTheme === 'dark' ? '#0d1117' : '#ffffff';
                container.style.width = '800px';
                container.style.fontFamily = 'Monaco, "Fira Code", monospace';
                container.style.fontSize = '14px';
                container.style.lineHeight = '1.5';
                container.innerHTML = highlightedHtml;
                
            } else if (element.type === 'table' && settings.tableHandlingMethod === 'image') {
                const tableHtml = createTableHtml(element.content);
                
                container = document.createElement('div');
                container.style.position = 'absolute';
                container.style.left = '-9999px';
                container.style.padding = '20px';
                container.style.background = 'white';
                container.style.width = '800px';
                container.style.fontFamily = 'Arial, sans-serif';
                container.innerHTML = `
                    <style>
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; font-weight: bold; }
                        tr:nth-child(even) { background-color: #f9f9f9; }
                    </style>
                    ${tableHtml}
                `;
            } else if (element.type === 'mermaid' && settings.mermaidHandlingMethod === 'image') {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: settings.mermaidTheme === 'dark' ? 'dark' : 'default'
                });
                const { svg, bindFunctions } = await mermaid.render(`mermaid-${element.id}`, element.content);

                container = document.createElement('div');
                container.style.position = 'absolute';
                container.style.left = '-9999px';
                container.style.padding = '20px';
                container.style.background = settings.mermaidTheme === 'dark' ? '#1e1e1e' : '#ffffff';
                container.style.width = '800px';
                container.innerHTML = svg;
                if (bindFunctions) {
                    bindFunctions(container);
                }
            } else {
                return null;
            }

            document.body.appendChild(container);
            
            const canvas = await html2canvas(container, {
                backgroundColor: element.type === 'code' && settings.codeTheme === 'dark' ? '#0d1117' : element.type === 'mermaid' && settings.mermaidTheme === 'dark' ? '#1e1e1e' : '#ffffff',
                scale: 2
            });

            document.body.removeChild(container);
            return canvas.toDataURL('image/png');
            
        } catch (error) {
            console.error(`Error converting ${element.type} to image:`, error);
            return null;
        }
    };

    // Main conversion function
    const convertMarkdownToHtml = async () => {
        try {
            setIsConverting(true);
            setConvertProgress('Starting conversion...');
            
            if (!markdown) {
                setHtmlOutput('');
                setIsConverting(false);
                return;
            }

            // Validate ImgBB API key if uploads are enabled
            if (settings.uploadToImgBB && (settings.tableHandlingMethod === 'image' || settings.codeHandlingMethod === 'image' || settings.mermaidHandlingMethod === 'image')) {
                if (!settings.imgbbApiKey || settings.imgbbApiKey.trim().length < 20) {
                    toast({
                        title: "Invalid ImgBB API Key",
                        description: "Please add a valid ImgBB API key in settings or disable image uploads.",
                        variant: "destructive",
                        duration: 5000,
                    });
                    setIsConverting(false);
                    return;
                }
            }

            // Extract all special elements first
            setConvertProgress('Analyzing document structure...');
            const elements = extractSpecialElements(markdown);
            
            let uploadSuccessCount = 0;
            let uploadFailCount = 0;
            // Create a modified markdown with placeholders
            let modifiedMarkdown = markdown;
            
            // Replace code blocks with placeholders
            elements.filter(el => el.type === 'code' || el.type === 'mermaid').forEach(element => {
                const codeBlockPattern = new RegExp(
                    `\`\`\`${element.language}?\\n${element.content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\`\`\``,
                    'g'
                );
                modifiedMarkdown = modifiedMarkdown.replace(codeBlockPattern, element.placeholder);
            });
            
            // Replace tables with placeholders
            elements.filter(el => el.type === 'table').forEach(element => {
                modifiedMarkdown = modifiedMarkdown.replace(element.content, element.placeholder);
            });
            
            // Convert markdown to HTML
            setConvertProgress('Converting markdown to HTML...');
            let html = await marked.parse(modifiedMarkdown);
            
            // Process elements based on settings
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                setConvertProgress(`Processing ${element.type} ${i + 1} of ${elements.length}...`);
                
                if (element.type === 'code') {
                    if (settings.codeHandlingMethod === 'image') {
                        const imageDataUrl = await convertElementToImage(element);
                        if (imageDataUrl) {
                            // Try to upload to ImgBB if enabled
                            if (settings.uploadToImgBB && settings.imgbbApiKey) {
                                setConvertProgress(`Uploading code block ${i + 1} to ImgBB...`);
                                
                                // Add delay to avoid rate limiting (except for first upload)
                                if (i > 0) {
                                    await delay(500);
                                }
                                
                                const imgbbUrl = await uploadToImgBB(imageDataUrl, settings.imgbbApiKey);
                                
                                if (imgbbUrl) {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imgbbUrl}" alt="Code block" class="graf graf--image" />`
                                    );
                                    uploadSuccessCount++
                                } else {
                                    // Fallback to base64 if upload fails
                                    console.warn('ImgBB upload failed, using base64 fallback');
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imageDataUrl}" alt="Code block" class="graf graf--image" />`
                                    );
                                    toast({
                                        title: "Upload Warning",
                                        description: `Failed to upload code block ${i + 1} to ImgBB. Using base64 instead.`,
                                        variant: "destructive",
                                        duration: 5000,
                                    });
                                    uploadFailCount++
                                }
                            } else {
                                // Use base64 if ImgBB is not enabled
                                html = html.replace(
                                    element.placeholder,
                                    `<img src="${imageDataUrl}" alt="Code block" class="graf graf--image" />`
                                );
                            }
                        }
                    } else {
                        // Use HTML code block
                        const codeHtml = `<pre class="graf graf--pre"><code class="language-${element.language}">${element.content}</code></pre>`;
                        html = html.replace(element.placeholder, codeHtml);
                    }
                } else if (element.type === 'table') {
                    if (settings.tableHandlingMethod === 'image') {
                        const imageDataUrl = await convertElementToImage(element);
                        if (imageDataUrl) {
                            // Try to upload to ImgBB if enabled
                            if (settings.uploadToImgBB && settings.imgbbApiKey) {
                                setConvertProgress(`Uploading table ${i + 1} to ImgBB...`);
                                
                                // Add delay to avoid rate limiting (except for first upload)
                                if (i > 0) {
                                    await delay(500);
                                }
                                
                                const imgbbUrl = await uploadToImgBB(imageDataUrl, settings.imgbbApiKey);
                                
                                if (imgbbUrl) {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imgbbUrl}" alt="Table" class="graf graf--image" />`
                                    );
                                    uploadSuccessCount++;
                                } else {
                                    // Fallback to base64 if upload fails
                                    console.warn('ImgBB upload failed, using base64 fallback');
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imageDataUrl}" alt="Table" class="graf graf--image" />`
                                    );
                                    toast({
                                        title: "Upload Warning",
                                        description: `Failed to upload table ${i + 1} to ImgBB. Using base64 instead.`,
                                        variant: "destructive",
                                        duration: 5000,
                                    });
                                    uploadFailCount++;
                                }
                            } else {
                                // Use base64 if ImgBB is not enabled
                                html = html.replace(
                                    element.placeholder,
                                    `<img src="${imageDataUrl}" alt="Table" class="graf graf--image" />`
                                );
                            }
                        }
                    } else {
                        // Use HTML table
                        const tableHtml = createTableHtml(element.content);
                        html = html.replace(element.placeholder, tableHtml);
                    }
                } else if (element.type === 'mermaid') {
                    if (settings.mermaidHandlingMethod === 'image') {
                        const imageDataUrl = await convertElementToImage(element);
                        if (imageDataUrl) {
                            // Try to upload to ImgBB if enabled
                            if (settings.uploadToImgBB && settings.imgbbApiKey) {
                                setConvertProgress(`Uploading mermaid diagram ${i + 1} to ImgBB...`);
                                
                                // Add delay to avoid rate limiting (except for first upload)
                                if (i > 0) {
                                    await delay(500);
                                }
                                
                                const imgbbUrl = await uploadToImgBB(imageDataUrl, settings.imgbbApiKey);
                                
                                if (imgbbUrl) {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imgbbUrl}" alt="Mermaid diagram" class="graf graf--image" />`
                                    );
                                    uploadSuccessCount++;
                                } else {
                                    // Fallback to base64 if upload fails
                                    console.warn('ImgBB upload failed, using base64 fallback');
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imageDataUrl}" alt="Mermaid diagram" class="graf graf--image" />`
                                    );
                                    toast({
                                        title: "Upload Warning",
                                        description: `Failed to upload mermaid diagram ${i + 1} to ImgBB. Using base64 instead.`,
                                        variant: "destructive",
                                        duration: 5000,
                                    });
                                    uploadFailCount++;
                                }
                            } else {
                                // Use base64 if ImgBB is not enabled
                                html = html.replace(
                                    element.placeholder,
                                    `<img src="${imageDataUrl}" alt="Mermaid diagram" class="graf graf--image" />`
                                );
                            }
                        }
                    } else {
                        // Use HTML code block for mermaid
                        const mermaidHtml = `<pre class="graf graf--pre"><code class="language-mermaid">${element.content}</code></pre>`;
                        html = html.replace(element.placeholder, mermaidHtml);
                    }
                }
            }
            
            // Add Medium classes if enabled
            if (settings.addMediumClasses) {
                setConvertProgress('Adding Medium styling...');
                html = html
                    .replace(/<h1(?![^>]*class)/g, '<h1 class="graf graf--h1"')
                    .replace(/<h2(?![^>]*class)/g, '<h2 class="graf graf--h2"')
                    .replace(/<h3(?![^>]*class)/g, '<h3 class="graf graf--h3"')
                    .replace(/<p>/g, '<p class="graf graf--p">')
                    .replace(/<blockquote>/g, '<blockquote class="graf graf--blockquote graf--pullquote">')
                    .replace(/<ul>/g, '<ul class="postList">')
                    .replace(/<li>/g, '<li class="graf graf--li">')
                    .replace(/<strong>/g, '<strong class="markup--strong markup--p-strong">')
                    .replace(/<em>/g, '<em class="markup--em markup--p-em">')
                    .replace(/<img(?![^>]*class)/g, '<img class="graf graf--image"')
                    .replace(/<a /g, '<a class="markup--anchor markup--p-anchor" ');
                    
                // Keep pre tags without graf--pre for better compatibility
                if (settings.codeHandlingMethod === 'html' || settings.mermaidHandlingMethod === 'html') {
                    html = html.replace(/<pre>/g, '<pre class="graf--pre">');
                    html = html.replace(/<code(?![^>]*class)/g, '<code class="markup--code markup--pre-code"');
                }
            }
            
            // Clean up the HTML
            html = html
                .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive newlines
                .replace(/>\s+</g, '><') // Remove whitespace between tags
                .trim();
            
            // Skip DOMPurify for Medium compatibility - Medium has its own sanitization
            setHtmlOutput(html);
            setHasConverted(true);
            setConvertProgress('Conversion complete!');
            
            // Show appropriate success message
            let description = "Your markdown has been converted to Medium-friendly HTML";
            
            if (settings.uploadToImgBB && settings.imgbbApiKey && (uploadSuccessCount > 0 || uploadFailCount > 0)) {
                description = `Conversion complete. ${uploadSuccessCount} images uploaded to ImgBB.`;
                if (uploadFailCount > 0) {
                    description += ` ${uploadFailCount} uploads failed (using base64 fallback).`;
                }
            } else if ((settings.tableHandlingMethod === 'image' || settings.codeHandlingMethod === 'image' || settings.mermaidHandlingMethod === 'image') && 
                !settings.uploadToImgBB) {
                description += ". Note: Images are base64 encoded and won't work when pasted to Medium. Enable ImgBB in settings.";
            }
            
            toast({
                title: "Conversion finished!",
                description: description,
                duration: 5000,
                action: (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                ),
            });
            
        } catch (error) {
            console.error('Error converting markdown:', error);
            toast({
                title: "Conversion error",
                description: "There was an error converting your markdown",
                variant: "destructive",
                duration: 3000,
            });
        } finally {
            setIsConverting(false);
            setTimeout(() => setConvertProgress(''), 2000);
        }
    };

    // Update word and character count when markdown changes
    useEffect(() => {
        const words = markdown.trim() ? markdown.split(/\s+/).length : 0;
        setWordCount(words);
        setCharCount(markdown.length);
        setHasConverted(false);
    }, [markdown]);

    // Load settings from localStorage
    useEffect(() => {
        const firstVisit = localStorage.getItem('firstVisit') == null;
        if (firstVisit) {
            localStorage.setItem('firstVisit', 'false');
            setShowOnboarding(true);
            setMarkdown(sampleMarkdown);
        }

        const savedSettings = localStorage.getItem('conversionSettings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings(parsed);
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }, []);

    // Save settings to localStorage
    useEffect(() => {
        localStorage.setItem('conversionSettings', JSON.stringify(settings));
    }, [settings]);

    const downloadHtml = useCallback((): void => {
        // Create a complete HTML document for download
        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medium Post</title>
</head>
<body>
${htmlOutput}
</body>
</html>`;
        
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'medium-post.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [htmlOutput]);

    const loadSample = useCallback((): void => {
        setMarkdown(sampleMarkdown);
    }, [sampleMarkdown]);

    const clearEditor = useCallback((): void => {
        setMarkdown('');
        setHtmlOutput('');
        setHasConverted(false);
    }, []);

    const copyHtmlToClipboard = useCallback(async (): Promise<void> => {
        try {
            // Create a clean version without extra wrappers
            const cleanHtml = htmlOutput
                .replace(/^<div>|<\/div>$/g, '')
                .replace(/\n\s*\n/g, '\n') // Remove excessive newlines
                .trim();
            
            // Create both HTML and plain text versions for clipboard
            const blob = new Blob([cleanHtml], { type: 'text/html' });
            const plainText = cleanHtml.replace(/<[^>]*>/g, ''); // Strip HTML tags for plain text
            
            // Use the modern clipboard API with multiple formats
            if (navigator.clipboard && window.ClipboardItem) {
                const item = new ClipboardItem({
                    'text/html': blob,
                    'text/plain': new Blob([plainText], { type: 'text/plain' })
                });
                await navigator.clipboard.write([item]);
            } else {
                // Fallback for browsers that don't support ClipboardItem
                await navigator.clipboard.writeText(cleanHtml);
            }
            
            setCopied(true);
            toast({
                title: "HTML copied to clipboard",
                description: "You can now paste it into Medium's editor",
                duration: 3000,
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            // Fallback to old method
            navigator.clipboard.writeText(htmlOutput);
            setCopied(true);
            toast({
                title: "Copied to clipboard",
                description: "Content copied (fallback method)",
                duration: 3000,
            });
            setTimeout(() => setCopied(false), 2000);
        }
    }, [htmlOutput, toast]);

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {/* Loading Overlay */}
            {isConverting && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            <h3 className="text-lg font-semibold">Converting...</h3>
                            <p className="text-sm text-muted-foreground text-center">{convertProgress}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Onboarding Dialog */}
            <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
                <DialogContent className="sm:max-w-2xl p-10">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <Rocket className="h-8 w-8 text-blue-600" />
                            <DialogTitle className="text-2xl">Welcome to Markdown2Medium Converter!</DialogTitle>
                        </div>
                        <DialogDescription className="text-left pt-4">
                            Let's get you started with this simple 3-step guide:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-start gap-4">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium me-2 px-2.5 py-1 mt-1 rounded-full">1</span>
                            <div>
                                <h3 className="font-semibold">Write or paste your Markdown</h3>
                                <p className="text-sm text-muted-foreground my-2">
                                    Use the editor to write your content with Markdown syntax. We've preloaded a sample for you.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium me-2 px-2.5 py-1 mt-1 rounded-full">2</span>
                            <div>
                                <h3 className="font-semibold">Click Convert</h3>
                                <p className="text-sm text-muted-foreground my-2">
                                    Hit the Convert button to transform your markdown into Medium-ready HTML.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium me-2 px-2.5 py-1 mt-1 rounded-full">3</span>
                            <div>
                                <h3 className="font-semibold">Export or preview</h3>
                                <p className="text-sm text-muted-foreground my-2">
                                    Download the HTML file or preview how it will look on Medium.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
                            <div className="flex items-start gap-2">
                                <Upload className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Pro tip: Enable ImgBB for Medium</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                        Medium doesn't support base64 images. Enable ImgBB in Settings to automatically upload and convert images to URLs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowOnboarding(false)} className="w-full">
                            Get Started
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Quick Guide Dialog */}
            <Dialog open={showQuickGuide} onOpenChange={setShowQuickGuide}>
                <DialogContent className="max-w-[95vw] sm:max-w-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Markdown Quick Reference</DialogTitle>
                        <DialogDescription>
                            Common formatting syntax you can use in the editor
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div>
                            <h3 className="font-semibold mb-3">Text Formatting</h3>
                            <div className="space-y-2 text-sm">
                                <p><code># Heading 1</code></p>
                                <p><code>## Heading 2</code></p>
                                <p><code>**bold**</code> or <code>__bold__</code></p>
                                <p><code>*italic*</code> or <code>_italic_</code></p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Lists & Blocks</h3>
                            <div className="space-y-2 text-sm">
                                <p><code>- Unordered item</code></p>
                                <p><code>1. Ordered item</code></p>
                                <p><code> Blockquote</code></p>
                                <p><code>``` Code block ```</code></p>
                                <p><code>```mermaid diagram code ```</code></p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Media & Links</h3>
                            <div className="space-y-2 text-sm">
                                <p><code>![alt](url)</code> (images)</p>
                                <p><code>[text](url)</code> (links)</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Tables</h3>
                            <div className="space-y-2 text-sm">
                                <p><code>| Header | Header |</code></p>
                                <p><code>| ------ | ------ |</code></p>
                                <p><code>| Cell   | Cell   |</code></p>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <h3 className="font-semibold mb-3">Code vs Table vs Mermaid</h3>
                            <div className="space-y-2 text-sm">
                                <p className="text-muted-foreground">
                                    Code blocks use triple backticks (```) while tables use pipes (|). Mermaid is a special code block with 'mermaid' language:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="font-medium mb-2">Code Block:</p>
                                        <pre className="bg-gray-100 p-2 rounded dark:bg-gray-800">
{`\`\`\`javascript
function hello() {
  return "world";
}
\`\`\``}</pre>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-2">Table:</p>
                                        <pre className="bg-gray-100 p-2 rounded dark:bg-gray-800">
{`| Name  | Age |
| ----- | --- |
| John  | 25  |
| Jane  | 30  |`}</pre>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-2">Mermaid:</p>
                                        <pre className="bg-gray-100 p-2 rounded dark:bg-gray-800">
{`\`\`\`mermaid
graph TD
A --> B
\`\`\``}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Settings Dialog */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Conversion Settings
                        </DialogTitle>
                        <DialogDescription>
                            Configure how to handle tables and code blocks
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        {/* Medium Classes */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">Formatting</Label>
                            <div className="flex items-center space-x-3">
                                <Switch
                                    id="medium-classes-settings"
                                    checked={settings.addMediumClasses}
                                    onCheckedChange={(checked) => setSettings({...settings, addMediumClasses: checked})}
                                />
                                <Label htmlFor="medium-classes-settings" className="cursor-pointer">
                                    Add Medium CSS classes
                                </Label>
                            </div>
                        </div>

                        <Separator />

                        {/* ImgBB Settings */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">ImgBB Image Hosting</Label>
                            <div className="flex items-center space-x-3">
                                <Switch
                                    id="upload-imgbb"
                                    checked={settings.uploadToImgBB}
                                    onCheckedChange={(checked) => setSettings({...settings, uploadToImgBB: checked})}
                                />
                                <Label htmlFor="upload-imgbb" className="cursor-pointer">
                                    Upload images to ImgBB (recommended)
                                </Label>
                            </div>
                            
                            {settings.uploadToImgBB && (
                                <div className="space-y-3 ml-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="imgbb-api-key" className="text-sm">
                                            ImgBB API Key
                                        </Label>
                                        <Input
                                            id="imgbb-api-key"
                                            type="password"
                                            className="w-full"
                                            placeholder="Enter your ImgBB API key"
                                            value={settings.imgbbApiKey || ''}
                                            onChange={(e) => setSettings({...settings, imgbbApiKey: e.target.value})}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Get your free API key from{' '}
                                            <a 
                                                href="https://api.imgbb.com/" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                api.imgbb.com
                                            </a>
                                            {' '}(takes 1 minute)
                                        </p>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-start gap-2">
                                            <Upload className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                            <div className="text-sm text-blue-700 dark:text-blue-300">
                                                <p className="font-medium">How it works:</p>
                                                <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                                                    <li>Images are uploaded to ImgBB during conversion</li>
                                                    <li>Base64 images are replaced with direct URLs</li>
                                                    <li>The URLs work perfectly when pasted to Medium</li>
                                                    <li>Free tier: 32MB per image, no daily limits</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Element Handling Table */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">Element Handling</Label>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Element</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Theme</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Table</TableCell>
                                        <TableCell>
                                            <RadioGroup 
                                                value={settings.tableHandlingMethod} 
                                                onValueChange={(value: 'html' | 'image') => setSettings({...settings, tableHandlingMethod: value})}
                                                className="flex gap-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="html" id="table-html" />
                                                    <Label htmlFor="table-html" className="cursor-pointer">HTML</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="image" id="table-image" />
                                                    <Label htmlFor="table-image" className="cursor-pointer">Image</Label>
                                                </div>
                                            </RadioGroup>
                                        </TableCell>
                                        <TableCell>N/A</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Code Block</TableCell>
                                        <TableCell>
                                            <RadioGroup 
                                                value={settings.codeHandlingMethod} 
                                                onValueChange={(value: 'html' | 'image') => setSettings({...settings, codeHandlingMethod: value})}
                                                className="flex gap-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="html" id="code-html" />
                                                    <Label htmlFor="code-html" className="cursor-pointer">HTML</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="image" id="code-image" />
                                                    <Label htmlFor="code-image" className="cursor-pointer">Image</Label>
                                                </div>
                                            </RadioGroup>
                                        </TableCell>
                                        <TableCell>
                                            {settings.codeHandlingMethod === 'html' ? 'N/A' : (
                                                <RadioGroup 
                                                    value={settings.codeTheme} 
                                                    onValueChange={(value: 'light' | 'dark') => setSettings({...settings, codeTheme: value})}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="light" id="code-theme-light" />
                                                        <Label htmlFor="code-theme-light" className="text-sm cursor-pointer">Light</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="dark" id="code-theme-dark" />
                                                        <Label htmlFor="code-theme-dark" className="text-sm cursor-pointer">Dark</Label>
                                                    </div>
                                                </RadioGroup>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Mermaid Diagram</TableCell>
                                        <TableCell>
                                            <RadioGroup 
                                                value={settings.mermaidHandlingMethod} 
                                                onValueChange={(value: 'html' | 'image') => setSettings({...settings, mermaidHandlingMethod: value})}
                                                className="flex gap-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="html" id="mermaid-html" />
                                                    <Label htmlFor="mermaid-html" className="cursor-pointer">HTML</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="image" id="mermaid-image" />
                                                    <Label htmlFor="mermaid-image" className="cursor-pointer">Image</Label>
                                                </div>
                                            </RadioGroup>
                                        </TableCell>
                                        <TableCell>
                                            {settings.mermaidHandlingMethod === 'html' ? 'N/A' : (
                                                <RadioGroup 
                                                    value={settings.mermaidTheme} 
                                                    onValueChange={(value: 'light' | 'dark') => setSettings({...settings, mermaidTheme: value})}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="light" id="mermaid-theme-light" />
                                                        <Label htmlFor="mermaid-theme-light" className="text-sm cursor-pointer">Light</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="dark" id="mermaid-theme-dark" />
                                                        <Label htmlFor="mermaid-theme-dark" className="text-sm cursor-pointer">Dark</Label>
                                                    </div>
                                                </RadioGroup>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        {/* Previews */}
                        <div className="space-y-4"> {/* Reduced spacing */}
                            {settings.tableHandlingMethod === 'html' && (
                                <div className="mt-2 border rounded-lg p-3 bg-gray-50 dark:bg-gray-900"> {/* Reduced padding and margin */}
                                    <Label className="text-xs font-medium mb-2 block">Table Preview</Label> {/* Reduced margin */}
                                    <style dangerouslySetInnerHTML={{__html: `
                                        .settings-preview-table {
                                            border-collapse: collapse;
                                            width: 100%;
                                            font-size: 0.75rem;
                                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                                            border-radius: 6px;
                                            overflow: hidden;
                                        }
                                        .settings-preview-table th {
                                            background-color: #f7f7f7;
                                            color: #333;
                                            font-weight: 600;
                                            padding: 6px 8px; /* Reduced padding */
                                            text-align: left;
                                            border-bottom: 2px solid #e0e0e0;
                                        }
                                        .settings-preview-table td {
                                            padding: 6px 8px; /* Reduced padding */
                                            border-bottom: 1px solid #e0e0e0;
                                        }
                                        .settings-preview-table tr:last-child td {
                                            border-bottom: none;
                                        }
                                        .dark .settings-preview-table th {
                                            background-color: #2d2d2d;
                                            color: #e6e6e6;
                                            border-bottom-color: #444;
                                        }
                                        .dark .settings-preview-table td {
                                            border-bottom-color: #444;
                                            color: #e6e6e6;
                                        }
                                    `}} />
                                    <table className="settings-preview-table">
                                        <thead>
                                            <tr>
                                                <th>Feature</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Modern Design</td>
                                                <td>✓</td>
                                            </tr>
                                            <tr>
                                                <td>Clean Style</td>
                                                <td>✓</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {settings.codeHandlingMethod === 'image' && (
                                <div className="mt-2 border rounded-lg p-3 bg-gray-50 dark:bg-gray-900"> {/* Reduced padding and margin */}
                                    <Label className="text-xs font-medium mb-2 block">Code Preview</Label> {/* Reduced margin */}
                                    <div className={`${settings.codeTheme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-800'} p-2 rounded border font-mono text-xs`}> {/* Reduced padding */}
                                        <div className="space-y-1">
                                            <div><span className={settings.codeTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>const</span> <span className={settings.codeTheme === 'dark' ? 'text-yellow-300' : 'text-purple-600'}>greeting</span> = <span className={settings.codeTheme === 'dark' ? 'text-green-300' : 'text-green-600'}>"Hello World!"</span>;</div>
                                            <div><span className={settings.codeTheme === 'dark' ? 'text-yellow-300' : 'text-purple-600'}>console</span>.<span className={settings.codeTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>log</span>(<span className={settings.codeTheme === 'dark' ? 'text-yellow-300' : 'text-purple-600'}>greeting</span>);</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {(settings.tableHandlingMethod === 'image' || settings.codeHandlingMethod === 'image' || settings.mermaidHandlingMethod === 'image') && (
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                                    <div className="text-sm text-amber-700 dark:text-amber-400">
                                        {settings.uploadToImgBB && settings.imgbbApiKey ? (
                                            <p>Images will be uploaded to ImgBB. Make sure your API key is valid.</p>
                                        ) : (
                                            <p>Image conversion may take a moment for large documents. {!settings.uploadToImgBB && "Enable ImgBB upload for Medium compatibility."}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {
                            setShowSettings(false);
                            setHasConverted(false);
                        }}>
                            Save Settings
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Header */}
            <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src={"/markdown2medium.png"} alt="markdown2medium" width={50} height={50}></Image>
                        <h1 className="text-xl font-bold">Markdown2Medium</h1>
                    </div>
                    <a href="https://github.com/vladamisici/" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <Github className="h-5 w-5" />
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
                    <Card className="w-full">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <CardHeader className="pb-2">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <TabsList className="flex-wrap">
                                        <TabsTrigger value="editor" className="flex items-center gap-2">
                                            <Code2 className="h-4 w-4" />
                                            Editor
                                        </TabsTrigger>
                                        <TabsTrigger value="preview" className="flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            Preview
                                        </TabsTrigger>
                                    </TabsList>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                                        <span>{wordCount} words</span>
                                        <Separator orientation="vertical" className="hidden sm:block h-4" />
                                        <span>{charCount} characters</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <TabsContent value="editor" className="mt-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <Button variant="outline" size="sm" onClick={() => setShowQuickGuide(true)}>
                                            <HelpCircle className="h-3 w-3 mr-1" />
                                            Guide
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                                            <Settings className="h-3 w-3 mr-1" />
                                            Settings
                                        </Button>
                                        <Separator orientation="vertical" className="h-4" />
                                        <Button variant="outline" size="sm" onClick={loadSample}>
                                            Load Sample
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={clearEditor}>
                                            <X className="h-3 w-3 mr-1" />
                                            Clear
                                        </Button>
                                        <Button 
                                            onClick={convertMarkdownToHtml} 
                                            disabled={!markdown || isConverting}
                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                            size="sm"
                                        >
                                            {isConverting ? (
                                                <>
                                                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                                    Converting...
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="h-3 w-3 mr-1" />
                                                    Convert
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <Textarea
                                        placeholder="Write or paste your markdown here..."
                                        className="font-mono text-sm min-h-[60vh] sm:min-h-[70vh] resize-none focus-visible:ring-1"
                                        value={markdown}
                                        onChange={(e) => setMarkdown(e.target.value)}
                                    />
                                </TabsContent>

                                <TabsContent value="preview" className="mt-0">
                                    {hasConverted && (settings.tableHandlingMethod === 'image' || settings.codeHandlingMethod === 'image' || settings.mermaidHandlingMethod === 'image') && 
                                     !settings.uploadToImgBB && (
                                        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                        Images won't work in Medium
                                                    </p>
                                                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                                        Base64 images are not supported by Medium. Enable ImgBB in Settings to fix this.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-md border min-h-[60vh] sm:min-h-[70vh] prose prose-blue dark:prose-invert max-w-none overflow-auto">
                                        <style dangerouslySetInnerHTML={{__html: `
                                            table {
                                                border-collapse: collapse;
                                                width: 100%;
                                                margin: 2rem 0;
                                                font-size: 0.95rem;
                                                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                                                border-radius: 8px;
                                                overflow: hidden;
                                            }
                                            
                                            table th {
                                                background-color: #f7f7f7;
                                                color: #333;
                                                font-weight: 600;
                                                padding: 12px 16px;
                                                text-align: left;
                                                border-bottom: 2px solid #e0e0e0;
                                            }
                                            
                                            table td {
                                                padding: 12px 16px;
                                                border-bottom: 1px solid #e0e0e0;
                                            }
                                            
                                            table tr:last-child td {
                                                border-bottom: none;
                                            }
                                            
                                            table tr:hover {
                                                background-color: #f9f9f9;
                                            }
                                            
                                            @media (prefers-color-scheme: dark) {
                                                table {
                                                    box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
                                                }
                                                
                                                table th {
                                                    background-color: #2d2d2d;
                                                    color: #e6e6e6;
                                                    border-bottom-color: #444;
                                                }
                                                
                                                table td {
                                                    border-bottom-color: #444;
                                                    color: #e6e6e6;
                                                }
                                                
                                                table tr:hover {
                                                    background-color: #2a2a2a;
                                                }
                                            }
                                        `}} />
                                        {hasConverted ? (
                                            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                                <Code2 className="h-12 w-12 mb-4 opacity-50" />
                                                <p>Click the "Convert" button to see the preview</p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </CardContent>
                        </Tabs>
                    </Card>

                    {/* Actions Sidebar */}
                    <div className="lg:w-64 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Export Options</CardTitle>
                                <CardDescription>Get your content ready for Medium</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button onClick={copyHtmlToClipboard} className="w-full flex items-center gap-2" disabled={!htmlOutput || !hasConverted}>
                                    <Copy className="h-4 w-4" />
                                    {copied ? "Copied!" : "Copy HTML"}
                                </Button>
                                <Button onClick={downloadHtml} variant="outline" className="w-full flex items-center gap-2" disabled={!htmlOutput || !hasConverted}>
                                    <Download className="h-4 w-4" />
                                    Download HTML
                                </Button>
                                <Button onClick={openNewPagePreview} variant="outline" className="w-full flex items-center gap-2" disabled={!htmlOutput || !hasConverted}>
                                    <Maximize className="h-4 w-4" />
                                    Full Preview
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">About</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="mb-4">Convert Markdown to Medium-friendly HTML with proper styling and formatting.</p>
                                <div className="space-y-2">
                                    <p className="text-xs">Tables: {settings.tableHandlingMethod === 'image' ? 'Images' : 'HTML'}</p>
                                    <p className="text-xs">Code: {settings.codeHandlingMethod === 'image' ? `Images (${settings.codeTheme})` : 'HTML'}</p>
                                    <p className="text-xs">Mermaid: {settings.mermaidHandlingMethod === 'image' ? `Images (${settings.mermaidTheme})` : 'HTML'}</p>
                                    {(settings.tableHandlingMethod === 'image' || settings.codeHandlingMethod === 'image' || settings.mermaidHandlingMethod === 'image') && (
                                        <p className="text-xs">
                                            ImgBB: {settings.uploadToImgBB && settings.imgbbApiKey ? 
                                                <span className="text-green-600">Enabled</span> : 
                                                <span className="text-amber-600">Disabled</span>
                                            }
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Toaster />
        </div>
    );
};

export default MarkdownToMediumConverter;
