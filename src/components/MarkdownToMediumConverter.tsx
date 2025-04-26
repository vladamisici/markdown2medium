"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DOMPurify from 'dompurify';
import {
    CheckCircle2,
    Copy,
    Download,
    Eye,
    FileText,
    HelpCircle,
    Moon,
    Rocket,
    Sun,
    X
} from 'lucide-react';
import { marked } from 'marked';
import { useCallback, useEffect, useState } from 'react';

const MarkdownToMediumConverter = () => {
    const [markdown, setMarkdown] = useState('');
    const [htmlOutput, setHtmlOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('editor');
    const [darkMode, setDarkMode] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [addMediumClasses, setAddMediumClasses] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [showQuickGuide, setShowQuickGuide] = useState(false);

    const sampleMarkdown = `# Welcome to Markdown 2 Medium Converter!

## Getting Started

Here's a sample post to show you how it works:

### Features Highlight

- ✨ Clean editor with live preview
- 🎨 Medium-specific formatting
- 📋 One-click copy HTML
- 💾 Export to file

## Try These Elements

**Bold text** and *italic text*

> A meaningful blockquote

\`\`\`javascript
// Code block example
function hello() {
  return "Medium readers!";
}
\`\`\`

![Sample Image](https://placehold.co/800x400)

## Happy Writing!

Start editing this text or paste your own Markdown content.
`;

    // Convert markdown to HTML with Medium classes
    const convertMarkdown = useCallback(async (content: string) => {
        try {
            if (!content) return '';

            const rawHtml = await marked.parse(content);
            let mediumHtml = rawHtml;

            if (addMediumClasses) {
                mediumHtml = rawHtml
                    .replace(/<h1/g, '<h1 class="graf graf--h1"')
                    .replace(/<h2/g, '<h2 class="graf graf--h2"')
                    .replace(/<h3/g, '<h3 class="graf graf--h3"')
                    .replace(/<p>/g, '<p class="graf graf--p">')
                    .replace(/<blockquote>/g, '<blockquote class="graf graf--blockquote graf--pullquote">')
                    .replace(/<pre>/g, '<pre class="graf graf--pre">')
                    .replace(/<code/g, '<code class="markup--code markup--pre-code"')
                    .replace(/<ul>/g, '<ul class="postList graf graf--ul">')
                    .replace(/<li>/g, '<li class="graf graf--li">')
                    .replace(/<strong>/g, '<strong class="markup--strong markup--p-strong">')
                    .replace(/<em>/g, '<em class="markup--em markup--p-em">')
                    .replace(/<img/g, '<img class="graf graf--image"');
            }

            return DOMPurify.sanitize(mediumHtml);
        } catch (error) {
            console.error('Error parsing markdown:', error);
            return '<div class="text-red-500">Error parsing markdown</div>';
        }
    }, [addMediumClasses]);

    useEffect(() => {
        const convertAndSetHtml = async () => {
            const converted = await convertMarkdown(markdown);
            setHtmlOutput(converted);
        };
        convertAndSetHtml();

        // Update word and character counts
        const words = markdown.trim() ? markdown.split(/\s+/).length : 0;
        setWordCount(words);
        setCharCount(markdown.length);

        // Check if first visit
        const firstVisit = localStorage.getItem('firstVisit') === null;
        if (firstVisit) {
            setShowOnboarding(true);
            localStorage.setItem('firstVisit', 'false');
            setMarkdown(sampleMarkdown);
        }
    }, [markdown, convertMarkdown, sampleMarkdown]);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(htmlOutput);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    }, [htmlOutput]);


    const downloadHtml = useCallback(() => {
        const blob = new Blob([htmlOutput], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'medium-post.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [htmlOutput]);

    const loadSample = useCallback(() => {
        setMarkdown(sampleMarkdown);
    }, [sampleMarkdown]);

    const clearEditor = useCallback(() => {
        setMarkdown('');
    }, []);

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {/* Onboarding Dialog */}
            <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
                <DialogContent className="sm:max-w-2xl p-10">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <Rocket className="h-8 w-8 text-blue-600" />
                            <DialogTitle className="text-2xl">Welcome to Markdown 2 Medium Converter!</DialogTitle>
                        </div>
                        <DialogDescription className="text-left pt-4">
                            Let&apos;s get you started with this simple 3-step guide:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-start gap-4">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium me-2 px-2.5 py-1 mt-1 dark:bg-blue-700 dark:text-blue-300 rounded-full">1</span>
                            <div>
                                <h3 className="font-semibold">Write or paste your Markdown</h3>
                                <p className="text-sm text-muted-foreground my-2">
                                    Use the editor to write your content with Markdown syntax. We&apos;ve preloaded a sample for you.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium me-2 px-2.5 py-1 mt-1 dark:bg-blue-700 dark:text-blue-300 rounded-full">2</span>
                            <div>
                                <h3 className="font-semibold">Preview your Medium post</h3>
                                <p className="text-sm text-muted-foreground my-2">
                                    Switch to the preview tab to see how it will look on Medium.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium me-2 px-2.5 py-1 mt-1 dark:bg-blue-700 dark:text-blue-300 rounded-full">3</span>
                            <div>
                                <h3 className="font-semibold">Copy or export HTML</h3>
                                <p className="text-sm text-muted-foreground my-2">
                                    Get the formatted HTML or copy the content to paste directly into Medium&apos;s editor.
                                </p>
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
                <DialogContent className="sm:max-w-2xl">
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
                                <p><code>&gt; Blockquote</code></p>
                                <p><code>``` Code block ```</code></p>
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
                            <h3 className="font-semibold mb-3">Advanced</h3>
                            <div className="space-y-2 text-sm">
                                <p><code>---</code> (horizontal rule)</p>
                                <p><code>`inline code`</code></p>
                                <p><code>~~strikethrough~~</code></p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header with onboarding cue */}
                <header className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Markdown 2 Medium
                                </h1>
                            </div>
                            <p className="text-lg text-muted-foreground mt-2">
                                Convert your Markdown to Medium-ready HTML in seconds
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Sun className="h-5 w-5 text-gray-400" />
                                <Switch
                                    checked={darkMode}
                                    onCheckedChange={setDarkMode}
                                    className="data-[state=checked]:bg-gray-800"
                                />
                                <Moon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowQuickGuide(true)}
                                className="gap-2"
                            >
                                <HelpCircle className="h-5 w-5" />
                                <span className="hidden sm:inline">Quick Guide</span>
                            </Button>
                        </div>
                    </div>
                    <Separator className="my-6" />
                </header>

                {/* Stats Bar with tooltips */}
                <TooltipProvider>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Badge variant="outline" className="px-3 py-1">
                                    Words: {wordCount}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Approximate word count</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Badge variant="outline" className="px-3 py-1">
                                    Characters: {charCount}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Including spaces and formatting</p>
                            </TooltipContent>
                        </Tooltip>

                        <div className="flex items-center gap-2 ml-auto">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Label htmlFor="medium-classes">Medium Formatting</Label>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Toggle Medium-specific CSS classes</p>
                                </TooltipContent>
                            </Tooltip>
                            <Switch
                                id="medium-classes"
                                checked={addMediumClasses}
                                onCheckedChange={setAddMediumClasses}
                            />
                        </div>
                    </div>
                </TooltipProvider>

                {/* Main Editor/Preview Area */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center gap-4 flex-wrap">
                            <TabsList className="grid grid-cols-2 w-[250px]">
                                <TabsTrigger value="editor" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" /> Editor
                                </TabsTrigger>
                                <TabsTrigger value="preview" className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" /> Preview
                                </TabsTrigger>
                            </TabsList>
                            <div className="flex gap-2 flex-wrap">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                onClick={loadSample}
                                                className="gap-2"
                                            >
                                                <FileText className="h-4 w-4" />
                                                <span className="hidden sm:inline">Sample</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Load sample Markdown</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                onClick={clearEditor}
                                                className="gap-2"
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="hidden sm:inline">Clear</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Clear the editor</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={copyToClipboard}
                                                disabled={!htmlOutput}
                                                className="gap-2"
                                                variant={copied ? "outline" : "default"}
                                            >
                                                {copied ? (
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                                <span className="hidden sm:inline">Copy HTML</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Copy HTML to clipboard</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={downloadHtml}
                                                disabled={!htmlOutput}
                                                variant="secondary"
                                                className="gap-2"
                                            >
                                                <Download className="h-4 w-4" />
                                                <span className="hidden sm:inline">Export</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Download as HTML file</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>

                        {/* Editor Tab */}
                        <TabsContent value="editor">
                            <Card className="shadow-sm border-0">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Markdown Editor</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Write your content using Markdown syntax{" "}
                                        <button
                                            onClick={() => setShowQuickGuide(true)}
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            (see guide)
                                        </button>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="# Start writing your markdown here...\n\nTry headings, lists, and other formatting!"
                                        value={markdown}
                                        onChange={(e) => setMarkdown(e.target.value)}
                                        className="min-h-[500px] font-mono text-sm p-6"
                                    />
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4 bg-muted/50">
                                    <Button
                                        onClick={() => setActiveTab('preview')}
                                        variant="default"
                                        className="ml-auto gap-2"
                                    >
                                        <Eye className="h-4 w-4" />
                                        Preview
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Preview Tab */}
                        <TabsContent value="preview">
                            <Card className="shadow-sm border-0">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Medium Preview</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        How your post will appear on Medium
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className={`rounded-lg border bg-background p-6 min-h-[500px] ${darkMode ? 'prose-invert' : 'prose'}`}>
                                        {htmlOutput ? (
                                            <div
                                                dangerouslySetInnerHTML={{ __html: htmlOutput }}
                                                className="medium-preview max-w-none"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                                                <FileText className="h-12 w-12 text-gray-400" />
                                                <p className="text-muted-foreground italic">
                                                    Your Medium preview will appear here when you write some Markdown
                                                </p>
                                                <Button
                                                    variant="secondary"
                                                    onClick={loadSample}
                                                    className="mt-4"
                                                >
                                                    Load Sample Content
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4 bg-muted/50">
                                    <Alert className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                                        <AlertDescription className="text-blue-900 dark:text-blue-200">
                                            <strong>Tip:</strong> Copy the HTML and paste it into Medium&apos;s editor using the{" "}
                                            <span className="font-semibold">&quot;Import from HTML&quot;</span>{" "}
                                            feature or by pasting directly into the editor.
                                        </AlertDescription>
                                    </Alert>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </div>
                </Tabs>

                {/* Quick Formatting Guide Card */}
                <Card className="mt-8 shadow-sm border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HelpCircle className="h-5 w-5" />
                            Need Help with Markdown?
                        </CardTitle>
                        <CardDescription>
                            Here&apos;s a quick reference for common formatting syntax
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            <div>
                                <h3 className="font-medium mb-3 text-base">Text Basics</h3>
                                <div className="space-y-2">
                                    <p><code># Heading 1</code></p>
                                    <p><code>## Heading 2</code></p>
                                    <p><code>**bold**</code></p>
                                    <p><code>*italic*</code></p>
                                    <p><code>~~strikethrough~~</code></p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium mb-3 text-base">Lists & Blocks</h3>
                                <div className="space-y-2">
                                    <p><code>- Unordered item</code></p>
                                    <p><code>1. Ordered item</code></p>
                                    <p><code>&gt; Blockquote</code></p>
                                    <p><code>``` Code block ```</code></p>
                                    <p><code>---</code> (horizontal rule)</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium mb-3 text-base">Media & Links</h3>
                                <div className="space-y-2">
                                    <p><code>![alt](url)</code> (images)</p>
                                    <p><code>[text](url)</code> (links)</p>
                                    <p><code>`code`</code> (inline)</p>
                                    <p><code>\\*escaped\\*</code></p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50">
                        <Button
                            variant="link"
                            onClick={() => setShowQuickGuide(true)}
                            className="text-blue-600 dark:text-blue-400"
                        >
                            View detailed formatting guide
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default MarkdownToMediumConverter;