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
import { Input } from '@/components/ui/input';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command as CommandUI, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useSession, signOut } from 'next-auth/react';

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
    Loader2,
    Maximize,
    Play,
    Rocket,
    Settings,
    Upload,
    X,
    Bold,
    Italic,
    Link,
    List,
    ListOrdered,
    Image as ImageIcon,
    Quote,
    Hash,
    Code,
    FileText,
    Undo2,
    Redo2,
    Type,
    Heading1,
    Heading2,
    Heading3,
    Sparkles,
    ChevronDown,
    PanelRightClose,
    PanelRightOpen,
    Moon,
    Sun,
    Save,
    Share2,
    Clock,
    Target,
    TrendingUp,
    Users,
    Zap,
    Shield,
    Award,
    BookOpen,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    Home,
    File,
    FolderOpen,
    History,
    Star,
    MessageSquare,
    Bell,
    User,
    LogOut,
    Palette,
    Layout,
    Columns,
    Square,
    Circle,
    Triangle,
    Hexagon,
    Layers,
    Move,
    Maximize2,
    Minimize2,
    RefreshCw,
    RotateCw,
    Shuffle,
    Sliders,
    Terminal,
    Cpu,
    Database,
    HardDrive,
    Wifi,
    WifiOff,
    Cloud,
    CloudOff,
    Lock,
    Unlock,
    Key,
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
    Info,
    CheckCircle2,
    XCircle,
    PlusCircle,
    MinusCircle,
    PlayCircle,
    PauseCircle,
    StopCircle,
    SkipForward,
    SkipBack,
    Repeat,
    Volume2,
    VolumeX,
    Mic,
    MicOff,
    Video,
    VideoOff,
    Camera,
    CameraOff,
    Airplay,
    Cast,
    Phone,
    PhoneOff,
    Mail,
    Send,
    Inbox,
    Archive,
    Trash2,
    Bookmark,
    Tag,
    Flag,
    MapPin,
    Navigation,
    Compass,
    Map,
    Crosshair,
    Activity,
    BarChart2,
    BarChart3,
    PieChart,
    LineChart,
    TrendingDown,
    DollarSign,
    CreditCard,
    ShoppingCart,
    Package,
    Gift,
    Coffee,
    Feather,
    Edit,
    Edit2,
    Edit3,
    Scissors,
    Clipboard,
    FileCheck,
    FilePlus,
    FileMinus,
    FileX,
    Folder,
    FolderPlus,
    FolderMinus,
    FolderX,
    Paperclip,
    Printer,
    Scan,
    Command as CommandIcon,
    Option,
    Delete,
    CornerUpLeft,
    CornerUpRight,
    CornerDownLeft,
    CornerDownRight,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUpCircle,
    ArrowDownCircle,
    ArrowLeftCircle,
    ArrowRightCircle,
    ChevronsUp,
    ChevronsDown,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
    ZoomIn,
    ZoomOut,
    GitBranch,
    GitCommit,
    GitMerge,
    GitPullRequest,
    Server,
    Monitor,
    Smartphone,
    Tablet,
    Watch,
    Tv,
    Speaker,
    Headphones,
    Radio,
    Briefcase,
    Calendar,
    CalendarCheck,
    CalendarX,
    CalendarPlus,
    CalendarMinus,
    CalendarClock,
    CalendarDays,
    CalendarRange,
    Building,
    Building2,
    Store,
    Hotel,
    Warehouse,
    Factory,
    Landmark,
    Lightbulb,
    FlashlightOff,
    Flame,
    Snowflake,
    CloudRain,
    CloudSnow,
    Wind,
    Gauge,
    Timer,

    AlarmClock,
    AlarmCheck,

    AlarmPlus,
    AlarmMinus,
    BellRing,
    BellOff,
    BellPlus,
    BellMinus,
    UserPlus,
    UserMinus,
    UserCheck,
    UserX,
    Users2,
    UserCog,
    Crown,
    Medal,
    Trophy,
    Heart,
    HeartOff,
    HeartCrack,
    HandMetal,
    ThumbsUp,
    ThumbsDown,
    Smile,
    Frown,
    Meh,
    Angry,
    Laugh,
    LucideIcon,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    IndentIncrease,
    IndentDecrease,
    Underline,
    Superscript,
    Subscript,
    PilcrowSquare,
    TextCursor,
    TextSelect,
    Highlighter,
    FileCode,
    FileJson,

    ListTree,
    ListChecks,
    ListX,
    Table2,
    TableProperties,
    Braces,
    Brackets,
    FileArchive,
    FolderArchive,
    ImagePlus,
    ImageMinus,
    Images,
    ScanLine,
    QrCode,
    Aperture,
    Focus,
    Contrast,
    Brush,
    Paintbrush,
    Eraser,
    PenTool,
    RectangleHorizontal,
    RectangleVertical,
    CircleDot,
    SquareDot,
    Grid3x3,
    LayoutGrid,
    LayoutList,
    LayoutTemplate,
    Sidebar,
    SidebarOpen,
    SidebarClose,
    PanelLeft,
    PanelRight,
    PanelTop,
    PanelBottom,
    GalleryVertical,
    GalleryHorizontal,
    Kanban,
    Newspaper,
    BookMarked,
    BookCopy,
    BookKey,
    BookLock,
    BookOpenCheck,
    ScrollText,
    FileDigit,
    FileClock,
    FileSearch,
    FileCode2,
    FileScan,
    FileStack,
    FolderClock,
    FolderSearch,
    FolderKey,
    FolderLock,
    FolderSync,
    Binary,


    CodeXml,
    FileJson2,
    Terminal,
    Variable,
    Bug,
    BugOff,
    GitFork,
    GitCompare,
    Workflow,
    Network,
    Webhook,
    CloudCog,
    ServerCog,
    DatabaseBackup,
    HardDriveDownload,
    HardDriveUpload,
    Import,
    Share,
    Link2,
    Unlink,
    ExternalLink,
    Anchor,
    LinkIcon,
    Paperclip,
    GripVertical,
    GripHorizontal,
    Grab,
    Hand,
    Pointer,
    MousePointer,
    MousePointer2,
    TouchpadOff,
    Touchpad,
    Laptop,
    Laptop2,
    TabletSmartphone,
    Vibrate,
    VibrateOff,
    Bluetooth,
    BluetoothOff,
    BluetoothConnected,
    BluetoothSearching,
    Usb,
    HardDrive2,
    MemoryStick,
    PcCase,
    Fan,
    Plug,
    Plug2,
    PlugZap,
    Power,
    PowerOff,
    Signal,
    SignalHigh,
    SignalLow,
    SignalMedium,
    SignalZero,
    Satellite,
    SatelliteDish,
    Radar,
    Router,
    Cast2,
    Chromecast,
    Smartphone2,
    TabletSmartphone2,
    Gamepad,
    Gamepad2,
    Joystick,
    Keyboard,
    Mouse,
    Monitor2,
    MonitorOff,
    MonitorSmartphone,
    MonitorSpeaker,
    Projector,
    AirVent,
    Fan2,
    Lamp,
    LampCeiling,
    LampDesk,
    LampFloor,
    LampWallDown,
    LampWallUp,
    Flashlight,
    Lightbulb2,
    LightbulbOff,
    Blinds,
    DoorClosed,
    DoorOpen,
    Fence,
    Gavel,
    Hammer,
    Wrench,
    Screwdriver,
    PaintBucket,
    PaintRoller,
    Pipette,
    Slice,
    Dice1,
    Dice2,
    Dice3,
    Dice4,
    Dice5,
    Dice6,
    Dices,
    Puzzle,
    Shapes,
    Gem,
    Crown2,
    Party,
    Cake,
    Pizza,
    Soup,
    Salad,
    Sandwich,
    IceCream,
    IceCream2,
    Beer,
    Wine,
    Milk,
    Coffee2,
    Utensils,
    UtensilsCrossed,
    Egg,
    EggFried,
    Beef,
    Popcorn,
    Origami,
    Shirt,
    Backpack,
    Umbrella,
    Tent,
    Glasses,
    Sunglasses,
    CloudSun,
    CloudMoon,
    CloudLightning,
    CloudDrizzle,
    CloudFog,
    Sunrise,
    Sunset,
    MountainSnow,
    Mountain,
    Waves,
    Trees,
    TreePine,
    TreeDeciduous,
    Palmtree,
    Cactus,
    Wheat,
    Grape,
    Cherry,
    Apple,
    Carrot,
    Bird,
    Rabbit,
    Turtle,
    Fish,
    FishSymbol,
    Dog,
    Cat,
    Rat,
    Squirrel,
    Bug2,
    Snail,
    Shell,
    Plus,
    Menu,
    ChevronLeft
} from 'lucide-react';
import { marked } from 'marked';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useMemo, createContext, useContext, Fragment } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { format, formatDistanceToNow, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { Line, Bar, Doughnut, Scatter, Bubble } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title as ChartTitle,
    Tooltip as ChartTooltip,
    Legend,
    Filler
} from 'chart.js';
import confetti from 'canvas-confetti';
import hotkeys from 'hotkeys-js';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    ChartTitle,
    ChartTooltip,
    Legend,
    Filler
);

// Define TypeScript interfaces
interface ConversionSettings {
    tableHandlingMethod: 'html' | 'image';
    codeHandlingMethod: 'html' | 'image';
    codeTheme: 'light' | 'dark' | 'monokai' | 'github' | 'dracula' | 'nord' | 'solarized';
    mermaidHandlingMethod: 'html' | 'image';
    mermaidTheme: 'light' | 'dark' | 'default' | 'forest' | 'neutral';
    addMediumClasses: boolean;
    imgbbApiKey?: string;
    uploadToImgBB: boolean;
    autoSave: boolean;
    autoSaveInterval: number;
    syntaxHighlighting: boolean;
    lineNumbers: boolean;
    wordWrap: boolean;
    fontSize: number;
    fontFamily: string;
    tabSize: number;
    theme: 'light' | 'dark' | 'auto' | 'midnight' | 'ocean' | 'forest' | 'sunset' | 'lavender';
    accentColor: string;
    editorLayout: 'classic' | 'focused' | 'zen' | 'split' | 'preview';
    previewPosition: 'right' | 'bottom' | 'float' | 'tab';
    toolbarStyle: 'classic' | 'minimal' | 'floating' | 'contextual';
    animations: boolean;
    sounds: boolean;
    notifications: boolean;
    autoComplete: boolean;
    spellCheck: boolean;
    formatOnSave: boolean;
    trimTrailingWhitespace: boolean;
    exportFormat: 'html' | 'markdown' | 'pdf' | 'docx' | 'json';
    exportQuality: 'draft' | 'standard' | 'high' | 'print';
    cloudSync: boolean;
    collaborationMode: boolean;
    trackChanges: boolean;
    versionControl: boolean;
    customCSS: string;
    customJS: string;
    plugins: string[];
    shortcuts: Record<string, string>;
    templates: string[];
    snippets: Record<string, string>;
    dictionary: string;
    locale: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    weekStart: 'sunday' | 'monday';
    defaultView: 'editor' | 'preview' | 'split';
    sidebarCollapsed: boolean;
    minimap: boolean;
    breadcrumbs: boolean;
    statusBar: boolean;
    activityBar: boolean;
    menuBar: boolean;
    fullScreen: boolean;
    focusMode: boolean;
    typewriterMode: boolean;
    highlightCurrentLine: boolean;
    highlightMatchingBrackets: boolean;
    foldGutter: boolean;
    gitIntegration: boolean;
    livePreview: boolean;
    scrollSync: boolean;
    exportOnSave: boolean;
    backupEnabled: boolean;
    backupInterval: number;
    backupLocation: string;
    maxBackups: number;
    compressionEnabled: boolean;
    encryptionEnabled: boolean;
    watermark: boolean;
    watermarkText: string;
    watermarkPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    pageSize: 'letter' | 'a4' | 'legal' | 'tabloid';
    pageOrientation: 'portrait' | 'landscape';
    pageMargins: { top: number; right: number; bottom: number; left: number };
    headerTemplate: string;
    footerTemplate: string;
    tocEnabled: boolean;
    tocDepth: number;
    tocPosition: 'left' | 'right' | 'top' | 'bottom';
    citationStyle: 'apa' | 'mla' | 'chicago' | 'harvard' | 'ieee';
    bibliographyEnabled: boolean;
    footnotesEnabled: boolean;
    endnotesEnabled: boolean;
    indexEnabled: boolean;
    glossaryEnabled: boolean;
    statisticsEnabled: boolean;
    readingTime: boolean;
    wordGoal: number;
    dailyGoal: number;
    writingStreak: number;
    pomodoroEnabled: boolean;
    pomodoroLength: number;
    breakLength: number;
    longBreakLength: number;
    sessionsBeforeLongBreak: number;
    distractionFreeMode: boolean;
    ambientSounds: string;
    backgroundImage: string;
    transparency: number;
    blurRadius: number;
    customFonts: string[];
    colorScheme: 'default' | 'high-contrast' | 'colorblind' | 'custom';
    accessibility: {
        screenReader: boolean;
        keyboardNavigation: boolean;
        reducedMotion: boolean;
        highContrast: boolean;
        fontSize: 'small' | 'medium' | 'large' | 'extra-large';
        cursorSize: 'small' | 'medium' | 'large';
        cursorColor: string;
        selectionColor: string;
        caretStyle: 'line' | 'block' | 'underline';
        caretBlink: boolean;
    };
    security: {
        encryption: boolean;
        password: string;
        twoFactor: boolean;
        biometric: boolean;
        autoLock: boolean;
        lockTimeout: number;
        trustedDevices: string[];
        auditLog: boolean;
        dataRetention: number;
    };
    performance: {
        hardwareAcceleration: boolean;
        renderingMode: 'cpu' | 'gpu' | 'auto';
        cacheEnabled: boolean;
        cacheSize: number;
        lazyLoading: boolean;
        virtualScrolling: boolean;
        debounceDelay: number;
        throttleDelay: number;
        maxUndoHistory: number;
    };
}

interface ProcessedElement {
    id: string;
    type: 'table' | 'code' | 'mermaid';
    content: string;
    language?: string;
    placeholder: string;
}

interface Document {
    id: string;
    title: string;
    content: string;
    created: Date;
    modified: Date;
    tags: string[];
    category: string;
    status: 'draft' | 'published' | 'archived';
    wordCount: number;
    readingTime: number;
    version: number;
    author: string;
    collaborators: string[];
    comments: Comment[];
    attachments: Attachment[];
    metadata: Record<string, any>;
}

interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    resolved: boolean;
    replies: Comment[];
}

interface Attachment {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    thumbnail?: string;
}

interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    content: string;
    thumbnail: string;
    tags: string[];
    author: string;
    downloads: number;
    rating: number;
    premium: boolean;
}

interface Theme {
    id: string;
    name: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        muted: string;
        border: string;
        accent: string;
        success: string;
        warning: string;
        error: string;
        info: string;
    };
    fonts: {
        sans: string;
        serif: string;
        mono: string;
        display: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    borderRadius: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    shadows: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'admin' | 'editor' | 'viewer';
    preferences: Partial<ConversionSettings>;
    subscription: 'free' | 'pro' | 'enterprise';
    storage: {
        used: number;
        limit: number;
    };
    statistics: {
        documentsCreated: number;
        wordsWritten: number;
        conversions: number;
        collaborations: number;
    };
}

interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    action?: {
        label: string;
        url: string;
    };
}

interface Activity {
    id: string;
    type: 'create' | 'edit' | 'delete' | 'share' | 'comment' | 'export';
    description: string;
    timestamp: Date;
    user: string;
    document?: string;
    metadata?: Record<string, any>;
}

// Context Providers
interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    documents: Document[];
    setDocuments: (documents: Document[]) => void;
    activeDocument: Document | null;
    setActiveDocument: (document: Document | null) => void;
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
    removeNotification: (id: string) => void;
    markNotificationAsRead: (id: string) => void;
    activities: Activity[];
    addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    settings: ConversionSettings;
    updateSettings: (settings: Partial<ConversionSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

// Default Themes
const defaultThemes: Record<string, Theme> = {
    light: {
        id: 'light',
        name: 'Light',
        description: 'Clean and bright theme for daytime use',
        colors: {
            primary: '#3b82f6',
            secondary: '#8b5cf6',
            background: '#ffffff',
            surface: '#f9fafb',
            text: '#111827',
            muted: '#6b7280',
            border: '#e5e7eb',
            accent: '#f59e0b',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6'
        },
        fonts: {
            sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
            mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            display: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        spacing: {
            xs: '0.5rem',
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '3rem',
            xxl: '4rem'
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            full: '9999px'
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }
    },
    dark: {
        id: 'dark',
        name: 'Dark',
        description: 'Easy on the eyes for nighttime use',
        colors: {
            primary: '#60a5fa',
            secondary: '#a78bfa',
            background: '#0f172a',
            surface: '#1e293b',
            text: '#f1f5f9',
            muted: '#94a3b8',
            border: '#334155',
            accent: '#fbbf24',
            success: '#34d399',
            warning: '#fbbf24',
            error: '#f87171',
            info: '#60a5fa'
        },
        fonts: {
            sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
            mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            display: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        spacing: {
            xs: '0.5rem',
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '3rem',
            xxl: '4rem'
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            full: '9999px'
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.35)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
        }
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight',
        description: 'Deep blue theme for late night writing',
        colors: {
            primary: '#818cf8',
            secondary: '#f472b6',
            background: '#0a0e27',
            surface: '#151937',
            text: '#e0e7ff',
            muted: '#a5b4fc',
            border: '#312e81',
            accent: '#fde047',
            success: '#86efac',
            warning: '#fde047',
            error: '#fca5a5',
            info: '#93c5fd'
        },
        fonts: {
            sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
            mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            display: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        spacing: {
            xs: '0.5rem',
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '3rem',
            xxl: '4rem'
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            full: '9999px'
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.6)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8)'
        }
    }
};

// Sample Templates
const sampleTemplates: Template[] = [
    {
        id: 'blog-post',
        name: 'Blog Post',
        description: 'Professional blog post template with SEO optimization',
        category: 'Content',
        content: `# Your Blog Post Title Here

## Introduction

Start with a compelling hook that grabs your reader's attention...

## Main Points

### Point 1
Expand on your first main point here...

### Point 2
Develop your second key argument...

### Point 3
Present your third important insight...

## Conclusion

Wrap up your post with a strong conclusion that reinforces your main message...

---

*Published on [Date] | Reading time: [X] minutes*`,
        thumbnail: '/templates/blog-post.png',
        tags: ['blog', 'content', 'seo'],
        author: 'System',
        downloads: 1523,
        rating: 4.8,
        premium: false
    },
    {
        id: 'technical-documentation',
        name: 'Technical Documentation',
        description: 'Comprehensive template for API and technical docs',
        category: 'Technical',
        content: `# API Documentation

## Overview

Brief description of the API and its purpose...

## Authentication

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/v1/endpoint
\`\`\`

## Endpoints

### GET /users

Retrieves a list of users...

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number |
| limit | integer | No | Items per page |

#### Response

\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "total": 100,
  "page": 1
}
\`\`\`

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |`,
        thumbnail: '/templates/technical-doc.png',
        tags: ['technical', 'api', 'documentation'],
        author: 'System',
        downloads: 892,
        rating: 4.9,
        premium: false
    }
];

// Sample Markdown
const sampleMarkdown = `# Welcome to Markdown2Medium Enterprise

> The most powerful and feature-rich markdown editor for professional writers.

## 🚀 Key Features

### Advanced Editor
- **Syntax Highlighting** with multiple themes
- **Auto-completion** for faster writing
- **Multi-cursor editing** for efficiency
- **Code folding** for better organization
- **Minimap** for document navigation

### Professional Tools
- 📊 **Real-time analytics** - Track your writing progress
- 🎯 **Writing goals** - Set and achieve daily targets
- ⏱️ **Pomodoro timer** - Stay focused and productive
- 📈 **Version control** - Never lose your work
- 👥 **Collaboration** - Work with your team

## Code Examples

### JavaScript
\`\`\`javascript
// Advanced React component with hooks
const MarkdownEditor = () => {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');
  
  useEffect(() => {
    const rendered = marked.parse(content);
    setPreview(rendered);
  }, [content]);
  
  return (
    <div className="editor-container">
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div dangerouslySetInnerHTML={{ __html: preview }} />
    </div>
  );
};
\`\`\`

### Python
\`\`\`python
# Machine learning example
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load and prepare data
X, y = load_data()
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Evaluate
accuracy = clf.score(X_test, y_test)
print(f"Model accuracy: {accuracy:.2%}")
\`\`\`

## Tables with Style

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Basic Editor | ✅ | ✅ | ✅ |
| Syntax Highlighting | ✅ | ✅ | ✅ |
| Export to HTML | ✅ | ✅ | ✅ |
| Cloud Storage | 1GB | 10GB | Unlimited |
| Collaboration | ❌ | 5 users | Unlimited |
| API Access | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |
| Custom Branding | ❌ | ❌ | ✅ |

## Mermaid Diagrams

\`\`\`mermaid
graph TB
    A[Write Markdown] --> B{Choose Export}
    B --> |HTML| C[Medium-Ready HTML]
    B --> |PDF| D[Professional PDF]
    B --> |DOCX| E[Word Document]
    C --> F[Publish to Medium]
    D --> G[Share Document]
    E --> H[Edit in Word]
\`\`\`

## Advanced Mathematics

When $a \\ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are:

$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$

## Task Lists

- [x] Set up the project
- [x] Create the UI components
- [x] Implement markdown parsing
- [ ] Add cloud synchronization
- [ ] Implement collaboration features
- [ ] Launch beta version

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote explanation.

## Image Gallery

![Beautiful Landscape](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop)
*Mountain landscape at sunset*

## Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

### Nested Blockquotes

> This is the first level of quoting.
>
>> This is nested blockquote.
>>
>>> And this is the third level.

## Conclusion

Experience the power of professional markdown editing with **Markdown2Medium Enterprise**. Start your free trial today and transform your writing workflow!

---

*Last updated: ${new Date().toLocaleDateString()}*`;

// Enterprise UI Component
const MarkdownToMediumConverter: React.FC = () => {
    // Core States
    const [markdown, setMarkdown] = useState<string>('');
    const [htmlOutput, setHtmlOutput] = useState<string>('');
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [wordCount, setWordCount] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);
    const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
    const [showQuickGuide, setShowQuickGuide] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const { toast } = useToast();
    const { data: session } = useSession();

    // Update user state when session changes
    useEffect(() => {
        if (session?.user) {
            setUser({
                id: session.user.id || '1',
                name: session.user.name || 'Anonymous',
                email: session.user.email || 'anonymous@example.com',
                avatar: session.user.image || 'https://github.com/shadcn.png',
                role: (session.user as any)?.role || 'user',
                subscription: 'free',
                storage: { used: 2.5, limit: 10 },
                statistics: { documentsCreated: 15, wordsWritten: 25000, conversions: 8, collaborations: 3 },
                preferences: {}
            });
        }
    }, [session]);
    
    // Conversion States
    const [isConverting, setIsConverting] = useState<boolean>(false);
    const [convertProgress, setConvertProgress] = useState<string>('');
    const [hasConverted, setHasConverted] = useState<boolean>(false);
    const highlighterRef = useRef<{
        codeToHtml: (code: string, options: { lang: string; theme: string }) => string;
    } | null>(null);
    
    // Enterprise States
    const [user, setUser] = useState<User | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [activeDocument, setActiveDocument] = useState<Document | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [templates, setTemplates] = useState<Template[]>(sampleTemplates);
    const [recentFiles, setRecentFiles] = useState<Document[]>([]);
    const [selectedText, setSelectedText] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
    const [activeTheme, setActiveTheme] = useState<Theme>(defaultThemes.light);
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState<boolean>(false);
    const [zenMode, setZenMode] = useState<boolean>(false);
    const [focusMode, setFocusMode] = useState<boolean>(false);
    const [previewMode, setPreviewMode] = useState<'side' | 'bottom' | 'tab' | 'float'>('side');
    const [editorStats, setEditorStats] = useState({
        lines: 0,
        words: 0,
        characters: 0,
        charactersWithoutSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        selectedWords: 0
    });
    const [writingGoals, setWritingGoals] = useState({
        daily: 1000,
        session: 500,
        achieved: 0
    });
    const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [collaborators, setCollaborators] = useState<User[]>([]);
    const [documentHistory, setDocumentHistory] = useState<any[]>([]);
    const [exportQueue, setExportQueue] = useState<any[]>([]);
    const [activePanel, setActivePanel] = useState<'editor' | 'preview' | 'both'>('both');
    const [toolbarVisible, setToolbarVisible] = useState<boolean>(true);
    const [minimapVisible, setMinimapVisible] = useState<boolean>(true);
    const [breadcrumbsVisible, setBreadcrumbsVisible] = useState<boolean>(true);
    const [statusBarVisible, setStatusBarVisible] = useState<boolean>(true);
    const [activityBarVisible, setActivityBarVisible] = useState<boolean>(true);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const [findReplaceVisible, setFindReplaceVisible] = useState<boolean>(false);
    const [findQuery, setFindQuery] = useState<string>('');
    const [replaceQuery, setReplaceQuery] = useState<string>('');
    const [editorFontSize, setEditorFontSize] = useState<number>(14);
    const [editorTheme, setEditorTheme] = useState<string>('default');
    const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
    const [wordWrap, setWordWrap] = useState<boolean>(true);
    const [highlightActiveLine, setHighlightActiveLine] = useState<boolean>(true);
    const [matchBrackets, setMatchBrackets] = useState<boolean>(true);
    const [autoCloseBrackets, setAutoCloseBrackets] = useState<boolean>(true);
    const [tabSize, setTabSize] = useState<number>(2);
    const [insertSpaces, setInsertSpaces] = useState<boolean>(true);
    const [scrollPastEnd, setScrollPastEnd] = useState<boolean>(false);
    const [smoothScrolling, setSmoothScrolling] = useState<boolean>(true);
    const [cursorBlinking, setCursorBlinking] = useState<boolean>(true);
    const [cursorStyle, setCursorStyle] = useState<'line' | 'block' | 'underline'>('line');
    const [renderWhitespace, setRenderWhitespace] = useState<'none' | 'all' | 'selection'>('none');
    const [rulers, setRulers] = useState<number[]>([80, 120]);
    const [guides, setGuides] = useState({ indentation: true, highlightActiveGuide: true });
    const [folding, setFolding] = useState<boolean>(true);
    const [glyphMargin, setGlyphMargin] = useState<boolean>(true);
    const [scrollbarStyle, setScrollbarStyle] = useState<'auto' | 'visible' | 'hidden'>('auto');
    const [overviewRuler, setOverviewRuler] = useState<boolean>(true);
    const [links, setLinks] = useState<boolean>(true);
    const [contextMenu, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [quickSuggestions, setQuickSuggestions] = useState({ strings: true, comments: false, other: true });
    const [parameterHints, setParameterHints] = useState<boolean>(true);
    const [formatOnType, setFormatOnType] = useState<boolean>(false);
    const [formatOnPaste, setFormatOnPaste] = useState<boolean>(false);
    const [dragAndDrop, setDragAndDrop] = useState<boolean>(true);
    const [linkedEditing, setLinkedEditing] = useState<boolean>(true);
    const [hover, setHover] = useState<boolean>(true);
    const [inlayHints, setInlayHints] = useState<boolean>(false);
    const [lightbulb, setLightbulb] = useState<boolean>(true);
    const [stickyScroll, setStickyScroll] = useState<boolean>(false);
    const [columnSelection, setColumnSelection] = useState<boolean>(false);
    const [multiCursor, setMultiCursor] = useState<boolean>(true);
    const [accessibilitySupport, setAccessibilitySupport] = useState<'auto' | 'on' | 'off'>('auto');
    const [screenReaderOptimized, setScreenReaderOptimized] = useState<boolean>(false);
    const [selectionHighlight, setSelectionHighlight] = useState<boolean>(true);
    const [occurrencesHighlight, setOccurrencesHighlight] = useState<boolean>(true);
    const [renderLineHighlight, setRenderLineHighlight] = useState<'none' | 'gutter' | 'line' | 'all'>('all');
    const [renderIndentGuides, setRenderIndentGuides] = useState<boolean>(true);
    const [bracketPairColorization, setBracketPairColorization] = useState<boolean>(true);
    const [showFoldingControls, setShowFoldingControls] = useState<'always' | 'mouseover'>('mouseover');
    const [unfoldOnClickAfterEndOfLine, setUnfoldOnClickAfterEndOfLine] = useState<boolean>(false);
    const [fontLigatures, setFontLigatures] = useState<boolean>(true);
    const [semanticHighlighting, setSemanticHighlighting] = useState<boolean>(true);
    const [suggest, setSuggest] = useState({
        filterGraceful: true,
        snippetsPreventQuickSuggestions: true,
        localityBonus: true,
        shareSuggestSelections: true,
        showIcons: true,
        maxVisibleSuggestions: 12
    });
    
    // Editor reference
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const minimapRef = useRef<HTMLCanvasElement>(null);
    const scrollSyncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Settings state with all enterprise features
    const [settings, setSettings] = useState<ConversionSettings>({
        tableHandlingMethod: 'image',
        codeHandlingMethod: 'html',
        codeTheme: 'github',
        mermaidHandlingMethod: 'image',
        mermaidTheme: 'default',
        addMediumClasses: true,
        imgbbApiKey: '',
        uploadToImgBB: false,
        autoSave: true,
        autoSaveInterval: 30000,
        syntaxHighlighting: true,
        lineNumbers: true,
        wordWrap: true,
        fontSize: 14,
        fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
        tabSize: 2,
        theme: 'light',
        accentColor: '#3b82f6',
        editorLayout: 'classic',
        previewPosition: 'right',
        toolbarStyle: 'classic',
        animations: true,
        sounds: false,
        notifications: true,
        autoComplete: true,
        spellCheck: true,
        formatOnSave: true,
        trimTrailingWhitespace: true,
        exportFormat: 'html',
        exportQuality: 'high',
        cloudSync: false,
        collaborationMode: false,
        trackChanges: true,
        versionControl: true,
        customCSS: '',
        customJS: '',
        plugins: [],
        shortcuts: {
            'save': 'cmd+s',
            'open': 'cmd+o',
            'new': 'cmd+n',
            'export': 'cmd+e',
            'preview': 'cmd+p',
            'settings': 'cmd+,',
            'find': 'cmd+f',
            'replace': 'cmd+h',
            'undo': 'cmd+z',
            'redo': 'cmd+shift+z',
            'bold': 'cmd+b',
            'italic': 'cmd+i',
            'link': 'cmd+k',
            'code': 'cmd+`',
            'heading1': 'cmd+1',
            'heading2': 'cmd+2',
            'heading3': 'cmd+3'
        },
        templates: [],
        snippets: {
            'date': new Date().toLocaleDateString(),
            'time': new Date().toLocaleTimeString(),
            'datetime': new Date().toLocaleString(),
            'lorem': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'copyright': `© ${new Date().getFullYear()} All rights reserved.`
        },
        dictionary: 'en-US',
        locale: 'en-US',
        timezone: 'America/New_York',
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm a',
        weekStart: 'sunday',
        defaultView: 'split',
        sidebarCollapsed: false,
        minimap: true,
        breadcrumbs: true,
        statusBar: true,
        activityBar: true,
        menuBar: true,
        fullScreen: false,
        focusMode: false,
        typewriterMode: false,
        highlightCurrentLine: true,
        highlightMatchingBrackets: true,
        foldGutter: true,
        gitIntegration: true,
        livePreview: true,
        scrollSync: true,
        exportOnSave: false,
        backupEnabled: true,
        backupInterval: 300000,
        backupLocation: 'local',
        maxBackups: 10,
        compressionEnabled: true,
        encryptionEnabled: false,
        watermark: false,
        watermarkText: '',
        watermarkPosition: 'bottom-right',
        pageSize: 'letter',
        pageOrientation: 'portrait',
        pageMargins: { top: 72, right: 72, bottom: 72, left: 72 },
        headerTemplate: '',
        footerTemplate: 'Page {page} of {pages}',
        tocEnabled: true,
        tocDepth: 3,
        tocPosition: 'left',
        citationStyle: 'apa',
        bibliographyEnabled: true,
        footnotesEnabled: true,
        endnotesEnabled: false,
        indexEnabled: false,
        glossaryEnabled: false,
        statisticsEnabled: true,
        readingTime: true,
        wordGoal: 1000,
        dailyGoal: 2000,
        writingStreak: 0,
        pomodoroEnabled: false,
        pomodoroLength: 25,
        breakLength: 5,
        longBreakLength: 15,
        sessionsBeforeLongBreak: 4,
        distractionFreeMode: false,
        ambientSounds: 'none',
        backgroundImage: '',
        transparency: 100,
        blurRadius: 0,
        customFonts: [],
        colorScheme: 'default',
        accessibility: {
            screenReader: false,
            keyboardNavigation: true,
            reducedMotion: false,
            highContrast: false,
            fontSize: 'medium',
            cursorSize: 'medium',
            cursorColor: '#000000',
            selectionColor: '#0066cc',
            caretStyle: 'line',
            caretBlink: true
        },
        security: {
            encryption: false,
            password: '',
            twoFactor: false,
            biometric: false,
            autoLock: false,
            lockTimeout: 300000,
            trustedDevices: [],
            auditLog: true,
            dataRetention: 90
        },
        performance: {
            hardwareAcceleration: true,
            renderingMode: 'auto',
            cacheEnabled: true,
            cacheSize: 100,
            lazyLoading: true,
            virtualScrolling: true,
            debounceDelay: 300,
            throttleDelay: 100,
            maxUndoHistory: 100
        }
    });

    // Auto-save functionality
    useEffect(() => {
        if (settings.autoSave && markdown) {
            const autoSaveTimer = setInterval(() => {
                setAutoSaveStatus('saving');
                // Simulate saving
                setTimeout(() => {
                    localStorage.setItem('autosave_markdown', markdown);
                    setAutoSaveStatus('saved');
                    setTimeout(() => setAutoSaveStatus('idle'), 2000);
                }, 500);
            }, settings.autoSaveInterval);

            return () => clearInterval(autoSaveTimer);
        }
    }, [markdown, settings.autoSave, settings.autoSaveInterval]);

    // Initialize app
    useEffect(() => {
        // Load saved data
        const savedMarkdown = localStorage.getItem('autosave_markdown');
        if (savedMarkdown) {
            setMarkdown(savedMarkdown);
        } else {
            setMarkdown(sampleMarkdown);
        }

        // Check for first visit
        const firstVisit = localStorage.getItem('enterprise_first_visit') == null;
        if (firstVisit) {
            localStorage.setItem('enterprise_first_visit', 'false');
            setShowOnboarding(true);
        }

        // Load user preferences
        const savedSettings = localStorage.getItem('enterprise_settings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings({ ...settings, ...parsed });
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }

        // Load theme preference
        const savedTheme = localStorage.getItem('enterprise_theme');
        if (savedTheme && defaultThemes[savedTheme]) {
            setActiveTheme(defaultThemes[savedTheme]);
            setDarkMode(savedTheme === 'dark' || savedTheme === 'midnight');
        }

        // Initialize keyboard shortcuts
        initializeKeyboardShortcuts();

        // Cleanup
        return () => {
            hotkeys.unbind();
        };
    }, []);

    // Save settings
    useEffect(() => {
        localStorage.setItem('enterprise_settings', JSON.stringify(settings));
    }, [settings]);

    // Initialize keyboard shortcuts
    const initializeKeyboardShortcuts = () => {
        // Command palette
        hotkeys('cmd+k,ctrl+k', (e) => {
            e.preventDefault();
            setCommandPaletteOpen(true);
        });

        // Save
        hotkeys('cmd+s,ctrl+s', (e) => {
            e.preventDefault();
            handleSave();
        });

        // Export
        hotkeys('cmd+e,ctrl+e', (e) => {
            e.preventDefault();
            handleExport();
        });

        // Find
        hotkeys('cmd+f,ctrl+f', (e) => {
            e.preventDefault();
            setFindReplaceVisible(true);
        });

        // Replace
        hotkeys('cmd+h,ctrl+h', (e) => {
            e.preventDefault();
            setFindReplaceVisible(true);
        });

        // Settings
        hotkeys('cmd+,,ctrl+,', (e) => {
            e.preventDefault();
            setShowSettings(true);
        });

        // Zen mode
        hotkeys('cmd+shift+z,ctrl+shift+z', (e) => {
            e.preventDefault();
            setZenMode(!zenMode);
        });

        // Focus mode
        hotkeys('cmd+shift+f,ctrl+shift+f', (e) => {
            e.preventDefault();
            setFocusMode(!focusMode);
        });

        // Preview toggle
        hotkeys('cmd+p,ctrl+p', (e) => {
            e.preventDefault();
            setActivePanel(activePanel === 'both' ? 'editor' : 'both');
        });

        // Bold
        hotkeys('cmd+b,ctrl+b', (e) => {
            e.preventDefault();
            insertMarkdown('**', '**', 'bold text');
        });

        // Italic
        hotkeys('cmd+i,ctrl+i', (e) => {
            e.preventDefault();
            insertMarkdown('*', '*', 'italic text');
        });

        // Link
        hotkeys('cmd+k,ctrl+k', (e) => {
            e.preventDefault();
            insertMarkdown('[', '](url)', 'link text');
        });

        // Code
        hotkeys('cmd+`,ctrl+`', (e) => {
            e.preventDefault();
            insertMarkdown('`', '`', 'code');
        });

        // Headings
        hotkeys('cmd+1,ctrl+1', (e) => {
            e.preventDefault();
            insertMarkdown('# ', '', 'Heading 1');
        });

        hotkeys('cmd+2,ctrl+2', (e) => {
            e.preventDefault();
            insertMarkdown('## ', '', 'Heading 2');
        });

        hotkeys('cmd+3,ctrl+3', (e) => {
            e.preventDefault();
            insertMarkdown('### ', '', 'Heading 3');
        });

        // Undo/Redo
        hotkeys('cmd+z,ctrl+z', (e) => {
            e.preventDefault();
            handleUndo();
        });

        hotkeys('cmd+shift+z,ctrl+shift+z', (e) => {
            e.preventDefault();
            handleRedo();
        });
    };

    // Editor statistics
    useEffect(() => {
        const lines = markdown.split('\n').length;
        const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
        const characters = markdown.length;
        const charactersWithoutSpaces = markdown.replace(/\s/g, '').length;
        const sentences = markdown.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = markdown.split(/\n\n+/).filter(p => p.trim().length > 0).length;
        const readingTime = Math.ceil(words / 200); // Average reading speed

        setEditorStats({
            lines,
            words,
            characters,
            charactersWithoutSpaces,
            sentences,
            paragraphs,
            readingTime,
            selectedWords: selectedText.trim() ? selectedText.trim().split(/\s+/).length : 0
        });

        setWordCount(words);
        setCharCount(characters);
    }, [markdown, selectedText]);

    // Update cursor position
    const updateCursorPosition = () => {
        if (editorRef.current) {
            const textarea = editorRef.current;
            const text = textarea.value;
            const selectionStart = textarea.selectionStart;
            
            const lines = text.substring(0, selectionStart).split('\n');
            const line = lines.length;
            const column = lines[lines.length - 1].length + 1;
            
            setCursorPosition({ line, column });
        }
    };

    // Handle text selection
    const handleTextSelection = () => {
        if (editorRef.current) {
            const textarea = editorRef.current;
            const selected = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
            setSelectedText(selected);
        }
    };

    // Initialize highlighter
    const initializeHighlighter = async () => {
        if (!highlighterRef.current) {
            const { createHighlighter } = await import('shiki');
            
            highlighterRef.current = await createHighlighter({
                themes: ['github-dark', 'github-light', 'monokai', 'dracula', 'nord', 'solarized-dark', 'solarized-light'],
                langs: ['javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'html', 'css', 'sql', 'bash', 'json', 'xml', 'yaml', 'markdown', 'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala', 'r', 'matlab', 'text', 'shell', 'powershell', 'dockerfile', 'graphql', 'solidity', 'vue', 'jsx', 'tsx']
            });
        }
        return highlighterRef.current;
    };

    // Handle save
    const handleSave = () => {
        const doc: Document = {
            id: activeDocument?.id || generateId(),
            title: activeDocument?.title || 'Untitled Document',
            content: markdown,
            created: activeDocument?.created || new Date(),
            modified: new Date(),
            tags: activeDocument?.tags || [],
            category: activeDocument?.category || 'General',
            status: 'draft',
            wordCount: editorStats.words,
            readingTime: editorStats.readingTime,
            version: (activeDocument?.version || 0) + 1,
            author: user?.name || 'Anonymous',
            collaborators: collaborators.map(c => c.name),
            comments: activeDocument?.comments || [],
            attachments: activeDocument?.attachments || [],
            metadata: {
                ...activeDocument?.metadata,
                lastEditedBy: user?.name || 'Anonymous',
                editDuration: Date.now() - (activeDocument?.metadata?.editStartTime || Date.now())
            }
        };

        // Save to local storage (in real app, this would be an API call)
        localStorage.setItem(`document_${doc.id}`, JSON.stringify(doc));
        
        // Update state
        setActiveDocument(doc);
        
        // Add to activities
        addActivity({
            type: 'edit',
            description: `Saved document "${doc.title}"`,
            user: user?.name || 'Anonymous',
            document: doc.id
        });

        // Show success notification
        addNotification({
            type: 'success',
            title: 'Document Saved',
            message: `"${doc.title}" has been saved successfully.`
        });

        // Trigger save animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#60a5fa', '#818cf8', '#a78bfa', '#c084fc']
        });
    };

    // Handle export
    const handleExport = async () => {
        if (!hasConverted) {
            await convertMarkdownToHtml();
        }

        const exportData = {
            format: settings.exportFormat,
            content: settings.exportFormat === 'html' ? htmlOutput : markdown,
            quality: settings.exportQuality,
            metadata: {
                title: activeDocument?.title || 'Untitled',
                author: user?.name || 'Anonymous',
                date: new Date().toISOString(),
                wordCount: editorStats.words,
                readingTime: editorStats.readingTime
            }
        };

        // Add to export queue
        setExportQueue([...exportQueue, {
            id: generateId(),
            ...exportData,
            status: 'processing',
            progress: 0
        }]);

        // Process export (simulated)
        setTimeout(() => {
            downloadFile(exportData);
            
            addNotification({
                type: 'success',
                title: 'Export Complete',
                message: `Document exported as ${settings.exportFormat.toUpperCase()}`
            });
        }, 2000);
    };

    // Download file
    const downloadFile = (exportData: any) => {
        let content = exportData.content;
        let mimeType = 'text/plain';
        let extension = 'txt';

        switch (exportData.format) {
            case 'html':
                mimeType = 'text/html';
                extension = 'html';
                content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${exportData.metadata.title}</title>
    <style>
        /* Professional print styles */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        h1 { font-size: 2.5rem; }
        h2 { font-size: 2rem; }
        h3 { font-size: 1.5rem; }
        code {
            background: #f4f4f4;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Monaco', 'Consolas', monospace;
        }
        pre {
            background: #f4f4f4;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1rem;
            margin-left: 0;
            font-style: italic;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 0.5rem;
            text-align: left;
        }
        th {
            background: #f4f4f4;
            font-weight: 600;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    ${content}
    <footer class="no-print" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #eee; text-align: center; color: #666;">
        <p>Exported from Markdown2Medium Enterprise on ${new Date().toLocaleDateString()}</p>
    </footer>
</body>
</html>`;
                break;
            case 'markdown':
                mimeType = 'text/markdown';
                extension = 'md';
                break;
            case 'pdf':
                // In real app, this would use a PDF generation library
                mimeType = 'application/pdf';
                extension = 'pdf';
                break;
            case 'docx':
                // In real app, this would use a DOCX generation library
                mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                extension = 'docx';
                break;
            case 'json':
                mimeType = 'application/json';
                extension = 'json';
                content = JSON.stringify({
                    ...exportData.metadata,
                    content: markdown,
                    html: htmlOutput
                }, null, 2);
                break;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${exportData.metadata.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Insert markdown
    const insertMarkdown = (before: string, after: string = '', defaultText: string = '') => {
        if (editorRef.current) {
            const textarea = editorRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = markdown.substring(start, end) || defaultText;
            const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end);
            
            // Add to undo stack
            setUndoStack([...undoStack, markdown]);
            setRedoStack([]);
            
            setMarkdown(newText);
            
            // Restore cursor position
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
            }, 0);
        }
    };

    // Handle undo
    const handleUndo = () => {
        if (undoStack.length > 0) {
            const previousState = undoStack[undoStack.length - 1];
            setRedoStack([...redoStack, markdown]);
            setUndoStack(undoStack.slice(0, -1));
            setMarkdown(previousState);
        }
    };

    // Handle redo
    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack[redoStack.length - 1];
            setUndoStack([...undoStack, markdown]);
            setRedoStack(redoStack.slice(0, -1));
            setMarkdown(nextState);
        }
    };

    // Generate unique ID
    const generateId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    // Add notification
    const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
        const newNotification: Notification = {
            ...notification,
            id: generateId(),
            timestamp: new Date(),
            read: false
        };
        setNotifications([newNotification, ...notifications]);
        
        // Auto-dismiss after 5 seconds for non-error notifications
        if (notification.type !== 'error') {
            setTimeout(() => {
                removeNotification(newNotification.id);
            }, 5000);
        }
    };

    // Remove notification
    const removeNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    // Mark notification as read
    const markNotificationAsRead = (id: string) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    // Add activity
    const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
        const newActivity: Activity = {
            ...activity,
            id: generateId(),
            timestamp: new Date()
        };
        setActivities([newActivity, ...activities]);
    };

    // Extract and process special elements
    const extractSpecialElements = (markdownText: string): ProcessedElement[] => {
        const elements: ProcessedElement[] = [];
        let elementCounter = 0;
        
        // Extract code blocks
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
        
        // Extract tables
        const lines = markdownText.split('\n');
        const tables: Array<{lines: string[], startIndex: number}> = [];
        let currentTable: string[] = [];
        let tableStartIndex = -1;
        let inCodeBlock = false;
        let currentIndex = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            currentIndex += line.length + 1;
            
            if (line.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                continue;
            }
            
            if (inCodeBlock) continue;
            
            if (line.includes('|') && line.trim().length > 0) {
                if (currentTable.length === 0) {
                    tableStartIndex = currentIndex - line.length - 1;
                }
                currentTable.push(line);
            } else if (currentTable.length > 0) {
                if (currentTable.length >= 2) {
                    tables.push({
                        lines: [...currentTable],
                        startIndex: tableStartIndex
                    });
                }
                currentTable = [];
                tableStartIndex = -1;
            }
        }
        
        if (currentTable.length >= 2) {
            tables.push({
                lines: [...currentTable],
                startIndex: tableStartIndex
            });
        }
        
        // Create elements array
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

        const headerCells = lines[0]
            .split('|')
            .map(cell => cell.trim())
            .filter(cell => cell.length > 0);

        const isSeparator = /^[\s\-:|]+$/.test(lines[1].replace(/\|/g, ''));
        const dataStartIndex = isSeparator ? 2 : 1;

        let html = '<table class="enterprise-table"><thead><tr>';
        headerCells.forEach(cell => {
            html += `<th>${cell}</th>`;
        });
        html += '</tr></thead><tbody>';

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

    // Add delay between uploads
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
                container.style.fontFamily = settings.fontFamily;
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
                container.style.fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';
                container.innerHTML = `
                    <style>
                        .enterprise-table {
                            border-collapse: collapse;
                            width: 100%;
                            font-size: 14px;
                        }
                        .enterprise-table th,
                        .enterprise-table td {
                            border: 1px solid #e5e7eb;
                            padding: 12px;
                            text-align: left;
                        }
                        .enterprise-table th {
                            background-color: #f9fafb;
                            font-weight: 600;
                            color: #111827;
                        }
                        .enterprise-table tr:nth-child(even) {
                            background-color: #f9fafb;
                        }
                        .enterprise-table tr:hover {
                            background-color: #f3f4f6;
                        }
                    </style>
                    ${tableHtml}
                `;
            } else if (element.type === 'mermaid' && settings.mermaidHandlingMethod === 'image') {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: settings.mermaidTheme
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
                backgroundColor: null,
                scale: 2,
                logging: false
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
            setConvertProgress('Initializing conversion engine...');
            
            if (!markdown) {
                setHtmlOutput('');
                setIsConverting(false);
                return;
            }

            // Configure marked options
            marked.setOptions({
                gfm: true,
                breaks: true,
                headerIds: true,
                mangle: false,
                sanitize: false,
                smartLists: true,
                smartypants: true,
                xhtml: false
            });

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
            const totalElements = elements.length;
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const progress = Math.round((i / totalElements) * 100);
                setConvertProgress(`Processing ${element.type} (${i + 1}/${totalElements}) - ${progress}%`);
                
                if (element.type === 'code') {
                    if (settings.codeHandlingMethod === 'image') {
                        const imageDataUrl = await convertElementToImage(element);
                        if (imageDataUrl) {
                            if (settings.uploadToImgBB && settings.imgbbApiKey) {
                                setConvertProgress(`Uploading code block ${i + 1} to ImgBB...`);
                                
                                if (i > 0) {
                                    await delay(1000); // Rate limiting
                                }
                                
                                const imgbbUrl = await uploadToImgBB(imageDataUrl, settings.imgbbApiKey);
                                
                                if (imgbbUrl) {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imgbbUrl}" alt="Code block" class="graf graf--image code-image" />`
                                    );
                                    uploadSuccessCount++;
                                } else {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imageDataUrl}" alt="Code block" class="graf graf--image code-image" />`
                                    );
                                    uploadFailCount++;
                                }
                            } else {
                                html = html.replace(
                                    element.placeholder,
                                    `<img src="${imageDataUrl}" alt="Code block" class="graf graf--image code-image" />`
                                );
                            }
                        }
                    } else {
                        // Use HTML code block with syntax highlighting
                        let codeHtml = `<pre class="graf graf--pre language-${element.language}"><code class="language-${element.language}">`;
                        
                        if (settings.syntaxHighlighting) {
                            try {
                                const highlighted = Prism.highlight(element.content, Prism.languages[element.language] || Prism.languages.text, element.language);
                                codeHtml += highlighted;
                            } catch (e) {
                                codeHtml += element.content;
                            }
                        } else {
                            codeHtml += element.content;
                        }
                        
                        codeHtml += '</code></pre>';
                        html = html.replace(element.placeholder, codeHtml);
                    }
                } else if (element.type === 'table') {
                    if (settings.tableHandlingMethod === 'image') {
                        const imageDataUrl = await convertElementToImage(element);
                        if (imageDataUrl) {
                            if (settings.uploadToImgBB && settings.imgbbApiKey) {
                                setConvertProgress(`Uploading table ${i + 1} to ImgBB...`);
                                
                                if (i > 0) {
                                    await delay(1000);
                                }
                                
                                const imgbbUrl = await uploadToImgBB(imageDataUrl, settings.imgbbApiKey);
                                
                                if (imgbbUrl) {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imgbbUrl}" alt="Table" class="graf graf--image table-image" />`
                                    );
                                    uploadSuccessCount++;
                                } else {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imageDataUrl}" alt="Table" class="graf graf--image table-image" />`
                                    );
                                    uploadFailCount++;
                                }
                            } else {
                                html = html.replace(
                                    element.placeholder,
                                    `<img src="${imageDataUrl}" alt="Table" class="graf graf--image table-image" />`
                                );
                            }
                        }
                    } else {
                        const tableHtml = createTableHtml(element.content);
                        html = html.replace(element.placeholder, tableHtml);
                    }
                } else if (element.type === 'mermaid') {
                    if (settings.mermaidHandlingMethod === 'image') {
                        const imageDataUrl = await convertElementToImage(element);
                        if (imageDataUrl) {
                            if (settings.uploadToImgBB && settings.imgbbApiKey) {
                                setConvertProgress(`Uploading mermaid diagram ${i + 1} to ImgBB...`);
                                
                                if (i > 0) {
                                    await delay(1000);
                                }
                                
                                const imgbbUrl = await uploadToImgBB(imageDataUrl, settings.imgbbApiKey);
                                
                                if (imgbbUrl) {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imgbbUrl}" alt="Mermaid diagram" class="graf graf--image mermaid-image" />`
                                    );
                                    uploadSuccessCount++;
                                } else {
                                    html = html.replace(
                                        element.placeholder,
                                        `<img src="${imageDataUrl}" alt="Mermaid diagram" class="graf graf--image mermaid-image" />`
                                    );
                                    uploadFailCount++;
                                }
                            } else {
                                html = html.replace(
                                    element.placeholder,
                                    `<img src="${imageDataUrl}" alt="Mermaid diagram" class="graf graf--image mermaid-image" />`
                                );
                            }
                        }
                    } else {
                        // Render Mermaid diagram as SVG for HTML method
                        try {
                            mermaid.initialize({
                                startOnLoad: false,
                                theme: settings.mermaidTheme,
                                securityLevel: 'loose'
                            });
                            
                            const mermaidId = `mermaid-html-${element.id}`;
                            const { svg } = await mermaid.render(mermaidId, element.content);
                            
                            const mermaidHtml = `<div class="graf graf--figure mermaid-diagram">${svg}</div>`;
                            html = html.replace(element.placeholder, mermaidHtml);
                        } catch (error) {
                            console.error('Error rendering Mermaid diagram:', error);
                            const mermaidHtml = `<pre class="graf graf--pre"><code class="language-mermaid">${element.content}</code></pre>`;
                            html = html.replace(element.placeholder, mermaidHtml);
                        }
                    }
                }
            }
            
            // Add Medium classes if enabled
            if (settings.addMediumClasses) {
                setConvertProgress('Applying Medium-specific formatting...');
                html = html
                    .replace(/<h1(?![^>]*class)/g, '<h1 class="graf graf--h1"')
                    .replace(/<h2(?![^>]*class)/g, '<h2 class="graf graf--h2"')
                    .replace(/<h3(?![^>]*class)/g, '<h3 class="graf graf--h3"')
                    .replace(/<h4(?![^>]*class)/g, '<h4 class="graf graf--h4"')
                    .replace(/<p>/g, '<p class="graf graf--p">')
                    .replace(/<blockquote>/g, '<blockquote class="graf graf--blockquote graf--pullquote">')
                    .replace(/<ul>/g, '<ul class="postList">')
                    .replace(/<ol>/g, '<ol class="postList postList--numbered">')
                    .replace(/<li>/g, '<li class="graf graf--li">')
                    .replace(/<strong>/g, '<strong class="markup--strong markup--p-strong">')
                    .replace(/<em>/g, '<em class="markup--em markup--p-em">')
                    .replace(/<img(?![^>]*class)/g, '<img class="graf graf--image"')
                    .replace(/<a /g, '<a class="markup--anchor markup--p-anchor" ')
                    .replace(/<hr>/g, '<hr class="graf graf--hr">');
                    
                if (settings.codeHandlingMethod === 'html' || settings.mermaidHandlingMethod === 'html') {
                    html = html.replace(/<pre>/g, '<pre class="graf--pre">');
                    html = html.replace(/<code(?![^>]*class)/g, '<code class="markup--code markup--pre-code"');
                }
            }
            
            // Apply custom CSS if provided
            if (settings.customCSS) {
                html = `<style>${settings.customCSS}</style>\n${html}`;
            }
            
            // Apply custom JS if provided and safe
            if (settings.customJS) {
                html += `\n<script>${settings.customJS}</script>`;
            }
            
            // Add watermark if enabled
            if (settings.watermark && settings.watermarkText) {
                const watermarkPosition = settings.watermarkPosition.replace('-', ' ');
                html = `<div style="position: relative;">
                    ${html}
                    <div style="position: absolute; ${watermarkPosition}: 10px; opacity: 0.5; font-size: 12px; color: #999;">
                        ${settings.watermarkText}
                    </div>
                </div>`;
            }
            
            // Clean up the HTML
            html = html
                .replace(/\n\s*\n\s*\n/g, '\n\n')
                .replace(/>\s+</g, '><')
                .trim();
            
            setHtmlOutput(html);
            setHasConverted(true);
            setConvertProgress('Conversion complete! 🎉');
            
            // Track conversion
            addActivity({
                type: 'export',
                description: 'Converted markdown to HTML',
                user: user?.name || 'Anonymous',
                metadata: {
                    wordCount: editorStats.words,
                    elements: elements.length,
                    uploadSuccess: uploadSuccessCount,
                    uploadFailed: uploadFailCount
                }
            });
            
            // Show success notification
            let description = "Your markdown has been converted to Medium-friendly HTML";
            
            if (settings.uploadToImgBB && settings.imgbbApiKey && (uploadSuccessCount > 0 || uploadFailCount > 0)) {
                description = `Conversion complete. ${uploadSuccessCount} images uploaded successfully.`;
                if (uploadFailCount > 0) {
                    description += ` ${uploadFailCount} uploads failed (using base64 fallback).`;
                }
            } else if ((settings.tableHandlingMethod === 'image' || settings.codeHandlingMethod === 'image' || settings.mermaidHandlingMethod === 'image') && 
                !settings.uploadToImgBB) {
                description += `. Note: Images are base64 encoded. Enable ImgBB for Medium compatibility.`;
            }
            
            toast({
                title: "Conversion Complete! 🎉",
                description: description,
                duration: 5000,
            });
            
            // Celebration animation
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.4 },
                colors: ['#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#f472b6']
            });
            
        } catch (error) {
            console.error('Error converting markdown:', error);
            toast({
                title: "Conversion Error",
                description: "An error occurred while converting your markdown. Please check your content and try again.",
                variant: "destructive",
                duration: 5000,
            });
            
            addActivity({
                type: 'export',
                description: 'Conversion failed',
                user: user?.name || 'Anonymous',
                metadata: { error: error.message }
            });
        } finally {
            setIsConverting(false);
            setTimeout(() => setConvertProgress(''), 3000);
        }
    };

    // Copy HTML to clipboard
    const copyHtmlToClipboard = useCallback(async (): Promise<void> => {
        try {
            const cleanHtml = htmlOutput
                .replace(/^<div>|<\/div>$/g, '')
                .replace(/\n\s*\n/g, '\n')
                .trim();
            
            const blob = new Blob([cleanHtml], { type: 'text/html' });
            const plainText = cleanHtml.replace(/<[^>]*>/g, '');
            
            if (navigator.clipboard && window.ClipboardItem) {
                const item = new ClipboardItem({
                    'text/html': blob,
                    'text/plain': new Blob([plainText], { type: 'text/plain' })
                });
                await navigator.clipboard.write([item]);
            } else {
                await navigator.clipboard.writeText(cleanHtml);
            }
            
            setCopied(true);
            toast({
                title: "Copied to Clipboard! 📋",
                description: "The HTML is ready to paste into Medium's editor",
                duration: 3000,
            });
            
            setTimeout(() => setCopied(false), 2000);
            
            // Track activity
            addActivity({
                type: 'export',
                description: 'Copied HTML to clipboard',
                user: user?.name || 'Anonymous'
            });
        } catch (error) {
            console.error('Failed to copy:', error);
            toast({
                title: "Copy Failed",
                description: "Unable to copy to clipboard. Please try again.",
                variant: "destructive",
                duration: 3000,
            });
        }
    }, [htmlOutput, toast, user, addActivity]);

    // Render minimap
    const renderMinimap = useCallback(() => {
        if (!minimapRef.current || !editorRef.current) return;
        
        const canvas = minimapRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const textarea = editorRef.current;
        const lines = markdown.split('\n');
        const lineHeight = 2;
        const charWidth = 1;
        
        canvas.width = 100;
        canvas.height = Math.max(200, lines.length * lineHeight);
        
        ctx.fillStyle = darkMode ? '#1e293b' : '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        lines.forEach((line, index) => {
            const y = index * lineHeight;
            const width = Math.min(line.length * charWidth, canvas.width - 10);
            
            // Color based on line type
            if (line.startsWith('#')) {
                ctx.fillStyle = '#3b82f6'; // Headers
            } else if (line.startsWith('```')) {
                ctx.fillStyle = '#10b981'; // Code blocks
            } else if (line.startsWith('>')) {
                ctx.fillStyle = '#8b5cf6'; // Quotes
            } else if (line.startsWith('|')) {
                ctx.fillStyle = '#f59e0b'; // Tables
            } else {
                ctx.fillStyle = darkMode ? '#64748b' : '#9ca3af'; // Regular text
            }
            
            ctx.fillRect(5, y, width, lineHeight - 0.5);
        });
        
        // Draw viewport indicator
        if (textarea.scrollHeight > 0) {
            const scrollPercentage = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
            const viewportHeight = (textarea.clientHeight / textarea.scrollHeight) * canvas.height;
            const viewportY = scrollPercentage * (canvas.height - viewportHeight);
            
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, viewportY, canvas.width, viewportHeight);
            
            ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
            ctx.fillRect(0, viewportY, canvas.width, viewportHeight);
        }
    }, [markdown, darkMode]);

    // Update minimap on markdown change
    useEffect(() => {
        renderMinimap();
    }, [markdown, renderMinimap]);

    // Handle scroll sync
    const handleScrollSync = () => {
        if (!settings.scrollSync || !editorRef.current || !previewRef.current) return;
        
        if (scrollSyncTimeoutRef.current) {
            clearTimeout(scrollSyncTimeoutRef.current);
        }
        
        scrollSyncTimeoutRef.current = setTimeout(() => {
            const editor = editorRef.current!;
            const preview = previewRef.current!;
            
            const editorScrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
            const previewScrollHeight = preview.scrollHeight - preview.clientHeight;
            
            preview.scrollTop = editorScrollPercentage * previewScrollHeight;
        }, 50);
    };

    // Command palette commands
    const commandPaletteCommands = [
        {
            id: 'file-new',
            label: 'New Document',
            shortcut: '⌘N',
            icon: FilePlus,
            action: () => {
                setMarkdown('');
                setActiveDocument(null);
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'file-open',
            label: 'Open Document',
            shortcut: '⌘O',
            icon: FolderOpen,
            action: () => {
                // Implement file open
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'file-save',
            label: 'Save Document',
            shortcut: '⌘S',
            icon: Save,
            action: () => {
                handleSave();
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'file-export',
            label: 'Export Document',
            shortcut: '⌘E',
            icon: Download,
            action: () => {
                handleExport();
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'edit-undo',
            label: 'Undo',
            shortcut: '⌘Z',
            icon: Undo2,
            action: () => {
                handleUndo();
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'edit-redo',
            label: 'Redo',
            shortcut: '⌘⇧Z',
            icon: Redo2,
            action: () => {
                handleRedo();
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'edit-find',
            label: 'Find',
            shortcut: '⌘F',
            icon: Search,
            action: () => {
                setFindReplaceVisible(true);
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'edit-replace',
            label: 'Replace',
            shortcut: '⌘H',
            icon: RefreshCw,
            action: () => {
                setFindReplaceVisible(true);
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'view-preview',
            label: 'Toggle Preview',
            shortcut: '⌘P',
            icon: Eye,
            action: () => {
                setActivePanel(activePanel === 'both' ? 'editor' : 'both');
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'view-zen',
            label: 'Zen Mode',
            shortcut: '⌘⇧Z',
            icon: Maximize2,
            action: () => {
                setZenMode(!zenMode);
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'view-focus',
            label: 'Focus Mode',
            shortcut: '⌘⇧F',
            icon: Target,
            action: () => {
                setFocusMode(!focusMode);
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'view-fullscreen',
            label: 'Fullscreen',
            shortcut: 'F11',
            icon: Maximize,
            action: () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'tools-settings',
            label: 'Settings',
            shortcut: '⌘,',
            icon: Settings,
            action: () => {
                setShowSettings(true);
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'help-guide',
            label: 'Quick Guide',
            shortcut: '⌘?',
            icon: HelpCircle,
            action: () => {
                setShowQuickGuide(true);
                setCommandPaletteOpen(false);
            }
        },
        {
            id: 'help-shortcuts',
            label: 'Keyboard Shortcuts',
            shortcut: '⌘⇧/',
            icon: CommandIcon,
            action: () => {
                // Show shortcuts modal
                setCommandPaletteOpen(false);
            }
        }
    ];

    // Template gallery component
    const TemplateGallery = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {templates.map(template => (
                <Card 
                    key={template.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                        setMarkdown(template.content);
                        addNotification({
                            type: 'info',
                            title: 'Template Applied',
                            message: `"${template.name}" template has been loaded`
                        });
                    }}
                >
                    <CardHeader>
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-md mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FileText className="h-12 w-12 text-white opacity-50" />
                            </div>
                            {template.premium && (
                                <Badge className="absolute top-2 right-2" variant="secondary">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Premium
                                </Badge>
                            )}
                        </div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <Download className="h-3 w-3" />
                                    {template.downloads}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    {template.rating}
                                </span>
                            </div>
                            <Badge variant="outline">{template.category}</Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    // Activity feed component
    const ActivityFeed = () => (
        <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
                {activities.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No recent activity</p>
                    </div>
                ) : (
                    activities.slice(0, 20).map(activity => (
                        <div key={activity.id} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.type === 'create' ? 'bg-green-100 text-green-600' :
                                activity.type === 'edit' ? 'bg-blue-100 text-blue-600' :
                                activity.type === 'delete' ? 'bg-red-100 text-red-600' :
                                activity.type === 'share' ? 'bg-purple-100 text-purple-600' :
                                activity.type === 'comment' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-gray-100 text-gray-600'
                            }`}>
                                {activity.type === 'create' ? <FilePlus className="h-4 w-4" /> :
                                 activity.type === 'edit' ? <Edit className="h-4 w-4" /> :
                                 activity.type === 'delete' ? <Trash2 className="h-4 w-4" /> :
                                 activity.type === 'share' ? <Share2 className="h-4 w-4" /> :
                                 activity.type === 'comment' ? <MessageSquare className="h-4 w-4" /> :
                                 <FileText className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </ScrollArea>
    );

    // Analytics dashboard component
    const AnalyticsDashboard = () => {
        const weeklyData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Words Written',
                data: [1200, 1900, 1500, 2100, 2400, 800, 1600],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            }]
        };

        const categoryData = {
            labels: ['Blog Posts', 'Documentation', 'Articles', 'Stories', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(107, 114, 128, 0.8)'
                ]
            }]
        };

        return (
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Words</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12,483</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">+4 this week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Writing Streak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">7 days</div>
                            <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">85%</div>
                            <Progress value={85} className="h-2 mt-2" />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Line data={weeklyData} options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false }
                                }
                            }} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Doughnut data={categoryData} options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'bottom' }
                                }
                            }} />
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Words</TableHead>
                                    <TableHead>Modified</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentFiles.slice(0, 5).map(doc => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">{doc.title}</TableCell>
                                        <TableCell>{doc.category}</TableCell>
                                        <TableCell>{doc.wordCount}</TableCell>
                                        <TableCell>{formatDistanceToNow(doc.modified, { addSuffix: true })}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                doc.status === 'published' ? 'default' :
                                                doc.status === 'draft' ? 'secondary' :
                                                'outline'
                                            }>
                                                {doc.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        );
    };

    // Apply theme
    useEffect(() => {
        const root = document.documentElement;
        const theme = activeTheme;
        
        // Apply CSS variables
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
        
        Object.entries(theme.spacing).forEach(([key, value]) => {
            root.style.setProperty(`--spacing-${key}`, value);
        });
        
        Object.entries(theme.borderRadius).forEach(([key, value]) => {
            root.style.setProperty(`--radius-${key}`, value);
        });
        
        root.style.setProperty('--font-sans', theme.fonts.sans);
        root.style.setProperty('--font-serif', theme.fonts.serif);
        root.style.setProperty('--font-mono', theme.fonts.mono);
    }, [activeTheme]);

    // Main render
    return (
        <TooltipProvider>
            <AppContext.Provider value={{
                user,
                setUser,
                documents,
                setDocuments,
                activeDocument,
                setActiveDocument,
                notifications,
                addNotification,
                removeNotification,
                markNotificationAsRead,
                activities,
                addActivity,
                theme: activeTheme,
                setTheme: setActiveTheme,
                settings,
                updateSettings: (newSettings) => setSettings({ ...settings, ...newSettings })
            }}>
                <div className={`h-screen ${darkMode ? 'dark' : ''} ${zenMode ? 'zen-mode' : ''} ${focusMode ? 'focus-mode' : ''}`}>
                    <style jsx global>{`
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap');
                        
                        :root {
                            --color-primary: ${activeTheme.colors.primary};
                            --color-secondary: ${activeTheme.colors.secondary};
                            --color-background: ${activeTheme.colors.background};
                            --color-surface: ${activeTheme.colors.surface};
                            --color-text: ${activeTheme.colors.text};
                            --color-muted: ${activeTheme.colors.muted};
                            --color-border: ${activeTheme.colors.border};
                            --color-accent: ${activeTheme.colors.accent};
                            --color-success: ${activeTheme.colors.success};
                            --color-warning: ${activeTheme.colors.warning};
                            --color-error: ${activeTheme.colors.error};
                            --color-info: ${activeTheme.colors.info};
                            
                            --font-sans: ${activeTheme.fonts.sans};
                            --font-serif: ${activeTheme.fonts.serif};
                            --font-mono: ${activeTheme.fonts.mono};
                            --font-display: ${activeTheme.fonts.display};
                            
                            --spacing-xs: ${activeTheme.spacing.xs};
                            --spacing-sm: ${activeTheme.spacing.sm};
                            --spacing-md: ${activeTheme.spacing.md};
                            --spacing-lg: ${activeTheme.spacing.lg};
                            --spacing-xl: ${activeTheme.spacing.xl};
                            --spacing-xxl: ${activeTheme.spacing.xxl};
                            
                            --radius-sm: ${activeTheme.borderRadius.sm};
                            --radius-md: ${activeTheme.borderRadius.md};
                            --radius-lg: ${activeTheme.borderRadius.lg};
                            --radius-xl: ${activeTheme.borderRadius.xl};
                            --radius-full: ${activeTheme.borderRadius.full};
                            
                            --shadow-sm: ${activeTheme.shadows.sm};
                            --shadow-md: ${activeTheme.shadows.md};
                            --shadow-lg: ${activeTheme.shadows.lg};
                            --shadow-xl: ${activeTheme.shadows.xl};
                        }
                        
                        * {
                            font-family: var(--font-sans);
                            box-sizing: border-box;
                        }
                        
                        body {
                            margin: 0;
                            padding: 0;
                            background: var(--color-background);
                            color: var(--color-text);
                            font-size: ${settings.fontSize}px;
                            line-height: 1.6;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }
                        
                        /* Custom scrollbar */
                        ::-webkit-scrollbar {
                            width: 12px;
                            height: 12px;
                        }
                        
                        ::-webkit-scrollbar-track {
                            background: var(--color-surface);
                            border-radius: var(--radius-md);
                        }
                        
                        ::-webkit-scrollbar-thumb {
                            background: var(--color-border);
                            border-radius: var(--radius-md);
                            border: 2px solid var(--color-surface);
                        }
                        
                        ::-webkit-scrollbar-thumb:hover {
                            background: var(--color-muted);
                        }
                        
                        /* Enterprise animations */
                        @keyframes slideIn {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        
                        @keyframes pulse {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.5; }
                        }
                        
                        @keyframes shimmer {
                            0% { background-position: -200% 0; }
                            100% { background-position: 200% 0; }
                        }
                        
                        @keyframes rotate {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                        }
                        
                        .animate-slideIn {
                            animation: slideIn 0.3s ease-out;
                        }
                        
                        .animate-fadeIn {
                            animation: fadeIn 0.3s ease-out;
                        }
                        
                        .animate-pulse {
                            animation: pulse 2s infinite;
                        }
                        
                        .animate-spin {
                            animation: rotate 1s linear infinite;
                        }
                        
                        .animate-bounce {
                            animation: bounce 1s ease-in-out infinite;
                        }
                        
                        /* Glassmorphism effects */
                        .glass {
                            background: rgba(255, 255, 255, 0.1);
                            backdrop-filter: blur(10px);
                            -webkit-backdrop-filter: blur(10px);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }
                        
                        .glass-dark {
                            background: rgba(0, 0, 0, 0.1);
                            backdrop-filter: blur(10px);
                            -webkit-backdrop-filter: blur(10px);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                        }
                        
                        /* Enterprise button styles */
                        .btn-enterprise {
                            position: relative;
                            overflow: hidden;
                            transition: all 0.3s ease;
                            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                            color: white;
                            font-weight: 500;
                            border: none;
                            border-radius: var(--radius-md);
                            padding: 0.75rem 1.5rem;
                            cursor: pointer;
                            box-shadow: var(--shadow-md);
                        }
                        
                        .btn-enterprise:hover {
                            transform: translateY(-2px);
                            box-shadow: var(--shadow-lg);
                        }
                        
                        .btn-enterprise:active {
                            transform: translateY(0);
                            box-shadow: var(--shadow-sm);
                        }
                        
                        .btn-enterprise::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                            transition: left 0.5s;
                        }
                        
                        .btn-enterprise:hover::before {
                            left: 100%;
                        }
                        
                        /* Focus mode styles */
                        .focus-mode .editor-toolbar,
                        .focus-mode .sidebar,
                        .focus-mode .activity-bar,
                        .focus-mode .status-bar {
                            opacity: 0.3;
                            transition: opacity 0.3s ease;
                        }
                        
                        .focus-mode .editor-toolbar:hover,
                        .focus-mode .sidebar:hover,
                        .focus-mode .activity-bar:hover,
                        .focus-mode .status-bar:hover {
                            opacity: 1;
                        }
                        
                        /* Zen mode styles */
                        .zen-mode .editor-toolbar,
                        .zen-mode .sidebar,
                        .zen-mode .activity-bar,
                        .zen-mode .status-bar,
                        .zen-mode .header,
                        .zen-mode .breadcrumbs {
                            display: none;
                        }
                        
                        .zen-mode .editor-container {
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 4rem 2rem;
                        }
                        
                        /* Professional code highlighting */
                        pre[class*="language-"] {
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-md);
                            padding: 1rem;
                            overflow: auto;
                            font-family: var(--font-mono);
                            font-size: 0.875em;
                            line-height: 1.5;
                            tab-size: ${settings.tabSize};
                        }
                        
                        code[class*="language-"] {
                            font-family: var(--font-mono);
                            font-size: 0.875em;
                        }
                        
                        /* Enterprise table styles */
                        .enterprise-table {
                            width: 100%;
                            border-collapse: collapse;
                            border-radius: var(--radius-md);
                            overflow: hidden;
                            box-shadow: var(--shadow-md);
                            margin: 1.5rem 0;
                        }
                        
                        .enterprise-table th {
                            background: var(--color-primary);
                            color: white;
                            font-weight: 600;
                            padding: 1rem;
                            text-align: left;
                            font-size: 0.875rem;
                            text-transform: uppercase;
                            letter-spacing: 0.05em;
                        }
                        
                        .enterprise-table td {
                            padding: 0.875rem 1rem;
                            border-bottom: 1px solid var(--color-border);
                            background: var(--color-surface);
                        }
                        
                        .enterprise-table tr:last-child td {
                            border-bottom: none;
                        }
                        
                        .enterprise-table tr:hover td {
                            background: var(--color-background);
                        }
                        
                        /* Notification styles */
                        .notification-toast {
                            position: fixed;
                            top: 1rem;
                            right: 1rem;
                            z-index: 9999;
                            max-width: 400px;
                            background: var(--color-surface);
                            border-radius: var(--radius-lg);
                            box-shadow: var(--shadow-xl);
                            padding: 1rem;
                            display: flex;
                            align-items: flex-start;
                            gap: 0.75rem;
                            animation: slideIn 0.3s ease-out;
                        }
                        
                        .notification-toast.success {
                            border-left: 4px solid var(--color-success);
                        }
                        
                        .notification-toast.error {
                            border-left: 4px solid var(--color-error);
                        }
                        
                        .notification-toast.warning {
                            border-left: 4px solid var(--color-warning);
                        }
                        
                        .notification-toast.info {
                            border-left: 4px solid var(--color-info);
                        }
                        
                        /* Loading skeleton */
                        .skeleton {
                            background: linear-gradient(90deg, var(--color-surface) 25%, var(--color-border) 50%, var(--color-surface) 75%);
                            background-size: 200% 100%;
                            animation: shimmer 1.5s infinite;
                            border-radius: var(--radius-md);
                        }
                        
                        /* Context menu */
                        .context-menu {
                            position: fixed;
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-md);
                            box-shadow: var(--shadow-xl);
                            padding: 0.5rem;
                            min-width: 200px;
                            z-index: 10000;
                        }
                        
                        .context-menu-item {
                            padding: 0.5rem 0.75rem;
                            border-radius: var(--radius-sm);
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            font-size: 0.875rem;
                            transition: all 0.2s ease;
                        }
                        
                        .context-menu-item:hover {
                            background: var(--color-background);
                        }
                        
                        /* Drag and drop styles */
                        .drag-over {
                            background: var(--color-primary);
                            opacity: 0.1;
                            border: 2px dashed var(--color-primary);
                        }
                        
                        .dragging {
                            opacity: 0.5;
                            cursor: grabbing;
                        }
                        
                        /* Tooltip styles */
                        .tooltip {
                            position: absolute;
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-md);
                            padding: 0.5rem 0.75rem;
                            font-size: 0.75rem;
                            box-shadow: var(--shadow-lg);
                            z-index: 10001;
                            pointer-events: none;
                            opacity: 0;
                            transition: opacity 0.2s ease;
                        }
                        
                        .tooltip.visible {
                            opacity: 1;
                        }
                        
                        /* Split view handle */
                        .split-handle {
                            position: relative;
                            width: 4px;
                            background: var(--color-border);
                            cursor: col-resize;
                            transition: background 0.2s ease;
                        }
                        
                        .split-handle:hover {
                            background: var(--color-primary);
                        }
                        
                        .split-handle::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 20px;
                            height: 40px;
                            background: transparent;
                        }
                        
                        /* Minimap styles */
                        .minimap {
                            position: absolute;
                            right: 0;
                            top: 0;
                            width: 120px;
                            height: 100%;
                            background: var(--color-surface);
                            border-left: 1px solid var(--color-border);
                            opacity: 0.8;
                            transition: opacity 0.2s ease;
                        }
                        
                        .minimap:hover {
                            opacity: 1;
                        }
                        
                        /* Breadcrumb styles */
                        .breadcrumb {
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            padding: 0.5rem 1rem;
                            background: var(--color-surface);
                            border-bottom: 1px solid var(--color-border);
                            font-size: 0.875rem;
                            color: var(--color-muted);
                        }
                        
                        .breadcrumb-item {
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                            cursor: pointer;
                            transition: color 0.2s ease;
                        }
                        
                        .breadcrumb-item:hover {
                            color: var(--color-text);
                        }
                        
                        /* Tab styles */
                        .tab-bar {
                            display: flex;
                            background: var(--color-surface);
                            border-bottom: 1px solid var(--color-border);
                            overflow-x: auto;
                            scrollbar-width: thin;
                        }
                        
                        .tab {
                            padding: 0.75rem 1.5rem;
                            background: transparent;
                            border: none;
                            border-bottom: 2px solid transparent;
                            cursor: pointer;
                            font-weight: 500;
                            font-size: 0.875rem;
                            color: var(--color-muted);
                            transition: all 0.2s ease;
                            position: relative;
                            white-space: nowrap;
                        }
                        
                        .tab:hover {
                            color: var(--color-text);
                            background: var(--color-background);
                        }
                        
                        .tab.active {
                            color: var(--color-primary);
                            border-bottom-color: var(--color-primary);
                        }
                        
                        .tab-close {
                            margin-left: 0.5rem;
                            opacity: 0;
                            transition: opacity 0.2s ease;
                        }
                        
                        .tab:hover .tab-close {
                            opacity: 0.5;
                        }
                        
                        .tab-close:hover {
                            opacity: 1;
                        }
                        
                        /* Search and replace styles */
                        .search-box {
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-md);
                            padding: 1rem;
                            box-shadow: var(--shadow-lg);
                        }
                        
                        .search-input {
                            width: 100%;
                            padding: 0.5rem 1rem;
                            background: var(--color-background);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-sm);
                            font-size: 0.875rem;
                            transition: border-color 0.2s ease;
                        }
                        
                        .search-input:focus {
                            outline: none;
                            border-color: var(--color-primary);
                        }
                        
                        /* Command palette styles */
                        .command-palette {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 90%;
                            max-width: 600px;
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-lg);
                            box-shadow: var(--shadow-xl);
                            overflow: hidden;
                            z-index: 10002;
                        }
                        
                        .command-palette-input {
                            width: 100%;
                            padding: 1rem 1.5rem;
                            background: transparent;
                            border: none;
                            border-bottom: 1px solid var(--color-border);
                            font-size: 1rem;
                            outline: none;
                        }
                        
                        .command-palette-list {
                            max-height: 400px;
                            overflow-y: auto;
                        }
                        
                        .command-palette-item {
                            padding: 0.75rem 1.5rem;
                            display: flex;
                            align-items: center;
                            gap: 0.75rem;
                            cursor: pointer;
                            transition: background 0.2s ease;
                        }
                        
                        .command-palette-item:hover,
                        .command-palette-item.selected {
                            background: var(--color-background);
                        }
                        
                        .command-palette-shortcut {
                            margin-left: auto;
                            font-size: 0.75rem;
                            color: var(--color-muted);
                            font-family: var(--font-mono);
                        }
                        
                        /* Activity bar styles */
                        .activity-bar {
                            width: 48px;
                            background: var(--color-surface);
                            border-right: 1px solid var(--color-border);
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            padding: 0.5rem 0;
                        }
                        
                        .activity-bar-item {
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: var(--radius-md);
                            cursor: pointer;
                            transition: all 0.2s ease;
                            position: relative;
                        }
                        
                        .activity-bar-item:hover {
                            background: var(--color-background);
                        }
                        
                        .activity-bar-item.active {
                            background: var(--color-background);
                            color: var(--color-primary);
                        }
                        
                        .activity-bar-item.active::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 3px;
                            height: 24px;
                            background: var(--color-primary);
                            border-radius: 0 2px 2px 0;
                        }
                        
                        /* Sidebar styles */
                        .sidebar {
                            width: 300px;
                            background: var(--color-surface);
                            border-right: 1px solid var(--color-border);
                            display: flex;
                            flex-direction: column;
                            transition: width 0.3s ease;
                        }
                        
                        .sidebar.collapsed {
                            width: 0;
                            overflow: hidden;
                        }
                        
                        .sidebar-header {
                            padding: 1rem;
                            border-bottom: 1px solid var(--color-border);
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                        
                        .sidebar-content {
                            flex: 1;
                            overflow-y: auto;
                        }
                        
                        /* Editor styles */
                        .editor-container {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            position: relative;
                            background: var(--color-background);
                        }
                        
                        .editor-toolbar {
                            background: var(--color-surface);
                            border-bottom: 1px solid var(--color-border);
                            padding: 0.5rem 1rem;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            flex-wrap: wrap;
                        }
                        
                        .editor-toolbar-group {
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                            padding: 0 0.5rem;
                            border-right: 1px solid var(--color-border);
                        }
                        
                        .editor-toolbar-group:last-child {
                            border-right: none;
                        }
                        
                        .editor-toolbar-button {
                            width: 32px;
                            height: 32px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: transparent;
                            border: none;
                            border-radius: var(--radius-sm);
                            cursor: pointer;
                            transition: all 0.2s ease;
                            color: var(--color-text);
                        }
                        
                        .editor-toolbar-button:hover {
                            background: var(--color-background);
                        }
                        
                        .editor-toolbar-button.active {
                            background: var(--color-background);
                            color: var(--color-primary);
                        }
                        
                        .editor-textarea {
                            flex: 1;
                            width: 100%;
                            height: 100%;
                            min-height: 0;
                            padding: 2rem;
                            background: transparent;
                            border: none;
                            outline: none;
                            font-family: var(--font-mono);
                            font-size: ${settings.fontSize}px;
                            line-height: 1.8;
                            color: var(--color-text);
                            resize: none;
                            tab-size: ${settings.tabSize};
                            overflow-y: auto;
                        }
                        
                        .editor-gutter {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 60px;
                            height: 100%;
                            background: var(--color-surface);
                            border-right: 1px solid var(--color-border);
                            padding: 2rem 0;
                            text-align: right;
                            color: var(--color-muted);
                            font-family: var(--font-mono);
                            font-size: 0.875rem;
                            line-height: 1.8;
                            user-select: none;
                        }
                        
                        .line-number {
                            padding-right: 1rem;
                            cursor: pointer;
                            transition: color 0.2s ease;
                        }
                        
                        .line-number:hover {
                            color: var(--color-text);
                        }
                        
                        .line-number.active {
                            color: var(--color-primary);
                            font-weight: 600;
                        }
                        
                        /* Preview styles */
                        .preview-container {
                            flex: 1;
                            background: var(--color-background);
                            position: relative;
                        }
                        
                        .preview-content {
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 2rem;
                            font-family: var(--font-serif);
                            line-height: 1.8;
                        }
                        
                        .preview-content h1 {
                            font-size: 2.5rem;
                            font-weight: 800;
                            margin: 2rem 0 1rem;
                            letter-spacing: -0.02em;
                        }
                        
                        .preview-content h2 {
                            font-size: 2rem;
                            font-weight: 700;
                            margin: 1.5rem 0 1rem;
                            letter-spacing: -0.01em;
                        }
                        
                        .preview-content h3 {
                            font-size: 1.5rem;
                            font-weight: 600;
                            margin: 1.25rem 0 0.75rem;
                        }
                        
                        .preview-content p {
                            margin: 1rem 0;
                        }
                        
                        .preview-content blockquote {
                            border-left: 4px solid var(--color-primary);
                            padding-left: 1.5rem;
                            margin: 1.5rem 0;
                            font-style: italic;
                            color: var(--color-muted);
                        }
                        
                        .preview-content pre {
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-md);
                            padding: 1rem;
                            overflow-x: auto;
                            margin: 1.5rem 0;
                        }
                        
                        .preview-content code {
                            background: var(--color-surface);
                            padding: 0.2em 0.4em;
                            border-radius: var(--radius-sm);
                            font-family: var(--font-mono);
                            font-size: 0.875em;
                        }
                        
                        .preview-content pre code {
                            background: transparent;
                            padding: 0;
                        }
                        
                        .preview-content img {
                            max-width: 100%;
                            height: auto;
                            border-radius: var(--radius-md);
                            margin: 1.5rem 0;
                            box-shadow: var(--shadow-lg);
                        }
                        
                        .preview-content a {
                            color: var(--color-primary);
                            text-decoration: none;
                            transition: color 0.2s ease;
                        }
                        
                        .preview-content a:hover {
                            color: var(--color-secondary);
                            text-decoration: underline;
                        }
                        
                        .preview-content ul,
                        .preview-content ol {
                            margin: 1rem 0;
                            padding-left: 2rem;
                        }
                        
                        .preview-content li {
                            margin: 0.5rem 0;
                        }
                        
                        .preview-content hr {
                            border: none;
                            border-top: 1px solid var(--color-border);
                            margin: 2rem 0;
                        }
                        
                        /* Status bar styles */
                        .status-bar {
                            background: var(--color-surface);
                            border-top: 1px solid var(--color-border);
                            padding: 0.5rem 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.75rem;
                            color: var(--color-muted);
                        }
                        
                        .status-bar-section {
                            display: flex;
                            align-items: center;
                            gap: 1rem;
                        }
                        
                        .status-bar-item {
                            display: flex;
                            align-items: center;
                            gap: 0.25rem;
                            cursor: pointer;
                            transition: color 0.2s ease;
                        }
                        
                        .status-bar-item:hover {
                            color: var(--color-text);
                        }
                        
                        /* Floating panels */
                        .floating-panel {
                            position: fixed;
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-lg);
                            box-shadow: var(--shadow-xl);
                            z-index: 1000;
                            transition: all 0.3s ease;
                        }
                        
                        .floating-panel-header {
                            padding: 1rem;
                            border-bottom: 1px solid var(--color-border);
                            cursor: move;
                            user-select: none;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                        
                        .floating-panel-content {
                            padding: 1rem;
                            max-height: 400px;
                            overflow-y: auto;
                        }
                        
                        /* Collaboration cursors */
                        .collaboration-cursor {
                            position: absolute;
                            width: 2px;
                            background: var(--color-primary);
                            animation: pulse 2s infinite;
                            pointer-events: none;
                        }
                        
                        .collaboration-cursor::before {
                            content: attr(data-user);
                            position: absolute;
                            top: -20px;
                            left: 0;
                            background: var(--color-primary);
                            color: white;
                            padding: 0.25rem 0.5rem;
                            border-radius: var(--radius-sm);
                            font-size: 0.75rem;
                            white-space: nowrap;
                        }
                        
                        /* Writing goals */
                        .writing-goals {
                            position: fixed;
                            bottom: 2rem;
                            right: 2rem;
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-lg);
                            padding: 1rem;
                            box-shadow: var(--shadow-lg);
                            min-width: 200px;
                        }
                        
                        .goal-progress {
                            position: relative;
                            height: 8px;
                            background: var(--color-background);
                            border-radius: var(--radius-full);
                            overflow: hidden;
                            margin-top: 0.5rem;
                        }
                        
                        .goal-progress-bar {
                            height: 100%;
                            background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
                            border-radius: var(--radius-full);
                            transition: width 0.3s ease;
                        }
                        
                        /* Pomodoro timer */
                        .pomodoro-timer {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-xl);
                            padding: 2rem;
                            box-shadow: var(--shadow-xl);
                            text-align: center;
                            min-width: 300px;
                        }
                        
                        .pomodoro-display {
                            font-size: 4rem;
                            font-weight: 300;
                            font-family: var(--font-mono);
                            color: var(--color-primary);
                            margin: 1rem 0;
                        }
                        
                        .pomodoro-controls {
                            display: flex;
                            gap: 1rem;
                            justify-content: center;
                            margin-top: 1.5rem;
                        }
                        
                        /* Version control */
                        .version-control {
                            background: var(--color-surface);
                            border-radius: var(--radius-lg);
                            padding: 1.5rem;
                            margin: 1rem 0;
                        }
                        
                        .version-item {
                            display: flex;
                            align-items: center;
                            gap: 1rem;
                            padding: 0.75rem 0;
                            border-bottom: 1px solid var(--color-border);
                        }
                        
                        .version-item:last-child {
                            border-bottom: none;
                        }
                        
                        .version-number {
                            background: var(--color-primary);
                            color: white;
                            padding: 0.25rem 0.5rem;
                            border-radius: var(--radius-sm);
                            font-size: 0.75rem;
                            font-weight: 600;
                        }
                        
                        /* Analytics charts */
                        .analytics-card {
                            background: var(--color-surface);
                            border-radius: var(--radius-lg);
                            padding: 1.5rem;
                            box-shadow: var(--shadow-md);
                        }
                        
                        .analytics-stat {
                            text-align: center;
                        }
                        
                        .analytics-stat-value {
                            font-size: 2.5rem;
                            font-weight: 700;
                            color: var(--color-primary);
                        }
                        
                        .analytics-stat-label {
                            font-size: 0.875rem;
                            color: var(--color-muted);
                            margin-top: 0.25rem;
                        }
                        
                        .analytics-stat-change {
                            font-size: 0.75rem;
                            margin-top: 0.5rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.25rem;
                        }
                        
                        .analytics-stat-change.positive {
                            color: var(--color-success);
                        }
                        
                        .analytics-stat-change.negative {
                            color: var(--color-error);
                        }
                        
                        /* Responsive design */
                        @media (max-width: 1024px) {
                            .sidebar {
                                position: fixed;
                                left: 0;
                                top: 0;
                                height: 100vh;
                                z-index: 1000;
                                transform: translateX(-100%);
                                transition: transform 0.3s ease;
                            }
                            
                            .sidebar.open {
                                transform: translateX(0);
                            }
                            
                            .activity-bar {
                                width: 0;
                                display: none;
                            }
                            
                            .preview-container {
                                display: none;
                            }
                            
                            .editor-container {
                                width: 100%;
                            }
                        }
                        
                        @media (max-width: 640px) {
                            .editor-toolbar {
                                padding: 0.5rem;
                            }
                            
                            .editor-toolbar-group {
                                padding: 0 0.25rem;
                            }
                            
                            .editor-toolbar-button {
                                width: 28px;
                                height: 28px;
                            }
                            
                            .editor-textarea {
                                padding: 1rem;
                                font-size: 14px;
                            }
                            
                            .status-bar {
                                flex-wrap: wrap;
                                gap: 0.5rem;
                            }
                        }
                        
                        /* Print styles */
                        @media print {
                            body {
                                background: white;
                                color: black;
                            }
                            
                            .no-print,
                            .editor-toolbar,
                            .sidebar,
                            .activity-bar,
                            .status-bar,
                            .floating-panel,
                            .notification-toast {
                                display: none !important;
                            }
                            
                            .preview-content {
                                max-width: 100%;
                                padding: 0;
                            }
                        }
                    `}</style>

                    {/* Loading Screen */}
                    {isConverting && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
                            >
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
                                        <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <Loader2 className="h-10 w-10 text-white animate-spin" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold mb-2">Converting Your Document</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{convertProgress}</p>
                                    </div>
                                    <Progress value={isConverting ? 60 : 100} className="w-full h-2" />
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Onboarding Modal */}
                    <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
                        <DialogContent className="max-w-4xl p-0 overflow-hidden">
                            <DialogTitle className="sr-only">Welcome to Markdown2Medium</DialogTitle>
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-12 text-white">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            <Rocket className="h-10 w-10" />
                                        </div>
                                        <div>
                                            <h1 className="text-4xl font-bold">Welcome to Markdown2Medium</h1>
                                            <p className="text-xl text-white/80 mt-2">Enterprise Edition</p>
                                        </div>
                                    </div>
                                    <p className="text-lg text-white/90 max-w-2xl">
                                        The most powerful markdown editor designed for professional writers, teams, and enterprises.
                                        Experience unprecedented productivity with our advanced features.
                                    </p>
                                </motion.div>
                            </div>
                            
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Zap className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Optimized performance with hardware acceleration and intelligent caching
                                        </p>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Users className="h-8 w-8 text-purple-600" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Team Collaboration</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Real-time collaboration with version control and commenting
                                        </p>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Shield className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Enterprise Security</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            End-to-end encryption with advanced access controls
                                        </p>
                                    </motion.div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="dont-show-again" />
                                        <Label htmlFor="dont-show-again" className="text-sm cursor-pointer">
                                            Don't show this again
                                        </Label>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" onClick={() => setShowOnboarding(false)}>
                                            Skip Tour
                                        </Button>
                                        <Button 
                                            onClick={() => {
                                                setShowOnboarding(false);
                                                // Start interactive tour
                                            }}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                        >
                                            Start Interactive Tour
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Settings Dialog */}
                    <Dialog open={showSettings} onOpenChange={setShowSettings}>
                        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                            <div className="flex h-full">
                                {/* Settings Sidebar */}
                                <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6">
                                    <DialogTitle className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <Settings className="h-6 w-6" />
                                        Settings
                                    </DialogTitle>
                                    <nav className="space-y-1">
                                        {[
                                            { id: 'general', label: 'General', icon: Settings },
                                            { id: 'editor', label: 'Editor', icon: Edit },
                                            { id: 'appearance', label: 'Appearance', icon: Palette },
                                            { id: 'export', label: 'Export Options', icon: Download },
                                            { id: 'collaboration', label: 'Collaboration', icon: Users },
                                            { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: CommandIcon },
                                            { id: 'advanced', label: 'Advanced', icon: Sliders },
                                            { id: 'security', label: 'Security', icon: Shield },
                                            { id: 'performance', label: 'Performance', icon: Zap },
                                            { id: 'accessibility', label: 'Accessibility', icon: Eye },
                                        ].map((section) => (
                                            <button
                                                key={section.id}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                                            >
                                                <section.icon className="h-4 w-4" />
                                                {section.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                                
                                {/* Settings Content */}
                                <div className="flex-1 p-8 overflow-y-auto">
                                    <Tabs defaultValue="general" className="space-y-6">
                                        <TabsContent value="general" className="space-y-6">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label htmlFor="auto-save">Auto Save</Label>
                                                            <p className="text-sm text-gray-500">Automatically save your work</p>
                                                        </div>
                                                        <Switch
                                                            id="auto-save"
                                                            checked={settings.autoSave}
                                                            onCheckedChange={(checked) => setSettings({...settings, autoSave: checked})}
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label htmlFor="spell-check">Spell Check</Label>
                                                            <p className="text-sm text-gray-500">Enable spell checking</p>
                                                        </div>
                                                        <Switch
                                                            id="spell-check"
                                                            checked={settings.spellCheck}
                                                            onCheckedChange={(checked) => setSettings({...settings, spellCheck: checked})}
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="auto-save-interval">Auto Save Interval</Label>
                                                        <Select
                                                            value={String(settings.autoSaveInterval)}
                                                            onValueChange={(value) => setSettings({...settings, autoSaveInterval: parseInt(value)})}
                                                        >
                                                            <SelectTrigger id="auto-save-interval">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="30000">30 seconds</SelectItem>
                                                                <SelectItem value="60000">1 minute</SelectItem>
                                                                <SelectItem value="120000">2 minutes</SelectItem>
                                                                <SelectItem value="300000">5 minutes</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    
                                                    <Separator />
                                                    
                                                    <div className="space-y-4">
                                                        <h4 className="font-medium">Export Defaults</h4>
                                                        
                                                        <div>
                                                            <Label htmlFor="export-format">Default Format</Label>
                                                            <Select
                                                                value={settings.exportFormat}
                                                                onValueChange={(value: any) => setSettings({...settings, exportFormat: value})}
                                                            >
                                                                <SelectTrigger id="export-format">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="html">HTML</SelectItem>
                                                                    <SelectItem value="markdown">Markdown</SelectItem>
                                                                    <SelectItem value="pdf">PDF</SelectItem>
                                                                    <SelectItem value="docx">Word Document</SelectItem>
                                                                    <SelectItem value="json">JSON</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        
                                                        <div>
                                                            <Label htmlFor="export-quality">Export Quality</Label>
                                                            <Select
                                                                value={settings.exportQuality}
                                                                onValueChange={(value: any) => setSettings({...settings, exportQuality: value})}
                                                            >
                                                                <SelectTrigger id="export-quality">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="draft">Draft</SelectItem>
                                                                    <SelectItem value="standard">Standard</SelectItem>
                                                                    <SelectItem value="high">High Quality</SelectItem>
                                                                    <SelectItem value="print">Print Ready</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        
                                        <TabsContent value="editor" className="space-y-6">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Editor Settings</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="font-size">Font Size</Label>
                                                        <div className="flex items-center gap-4">
                                                            <Slider
                                                                id="font-size"
                                                                min={10}
                                                                max={24}
                                                                step={1}
                                                                value={[settings.fontSize]}
                                                                onValueChange={(value) => setSettings({...settings, fontSize: value[0]})}
                                                                className="flex-1"
                                                            />
                                                            <span className="w-12 text-right">{settings.fontSize}px</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <Label htmlFor="tab-size">Tab Size</Label>
                                                        <Select
                                                            value={String(settings.tabSize)}
                                                            onValueChange={(value) => setSettings({...settings, tabSize: parseInt(value)})}
                                                        >
                                                            <SelectTrigger id="tab-size">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="2">2 spaces</SelectItem>
                                                                <SelectItem value="4">4 spaces</SelectItem>
                                                                <SelectItem value="8">8 spaces</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label htmlFor="line-numbers">Line Numbers</Label>
                                                            <p className="text-sm text-gray-500">Show line numbers in editor</p>
                                                        </div>
                                                        <Switch
                                                            id="line-numbers"
                                                            checked={settings.lineNumbers}
                                                            onCheckedChange={(checked) => setSettings({...settings, lineNumbers: checked})}
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label htmlFor="word-wrap">Word Wrap</Label>
                                                            <p className="text-sm text-gray-500">Wrap long lines</p>
                                                        </div>
                                                        <Switch
                                                            id="word-wrap"
                                                            checked={settings.wordWrap}
                                                            onCheckedChange={(checked) => setSettings({...settings, wordWrap: checked})}
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label htmlFor="syntax-highlighting">Syntax Highlighting</Label>
                                                            <p className="text-sm text-gray-500">Highlight code syntax</p>
                                                        </div>
                                                        <Switch
                                                            id="syntax-highlighting"
                                                            checked={settings.syntaxHighlighting}
                                                            onCheckedChange={(checked) => setSettings({...settings, syntaxHighlighting: checked})}
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label htmlFor="auto-complete">Auto Complete</Label>
                                                            <p className="text-sm text-gray-500">Enable intelligent suggestions</p>
                                                        </div>
                                                        <Switch
                                                            id="auto-complete"
                                                            checked={settings.autoComplete}
                                                            onCheckedChange={(checked) => setSettings({...settings, autoComplete: checked})}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Command Palette */}
                    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="File">
                                {commandPaletteCommands.filter(cmd => cmd.id.startsWith('file-')).map(cmd => (
                                    <CommandItem key={cmd.id} onSelect={cmd.action}>
                                        <cmd.icon className="h-4 w-4 mr-3" />
                                        <span className="flex-1">{cmd.label}</span>
                                        <span className="text-xs text-gray-500">{cmd.shortcut}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Edit">
                                {commandPaletteCommands.filter(cmd => cmd.id.startsWith('edit-')).map(cmd => (
                                    <CommandItem key={cmd.id} onSelect={cmd.action}>
                                        <cmd.icon className="h-4 w-4 mr-3" />
                                        <span className="flex-1">{cmd.label}</span>
                                        <span className="text-xs text-gray-500">{cmd.shortcut}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="View">
                                {commandPaletteCommands.filter(cmd => cmd.id.startsWith('view-')).map(cmd => (
                                    <CommandItem key={cmd.id} onSelect={cmd.action}>
                                        <cmd.icon className="h-4 w-4 mr-3" />
                                        <span className="flex-1">{cmd.label}</span>
                                        <span className="text-xs text-gray-500">{cmd.shortcut}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>

                    {/* Main Application Layout */}
                    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
                        {/* Activity Bar */}
                        {activityBarVisible && !zenMode && (
                            <div className="activity-bar">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="activity-bar-item active">
                                                <FileText className="h-5 w-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Explorer</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="activity-bar-item">
                                                <Search className="h-5 w-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Search</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="activity-bar-item">
                                                <GitBranch className="h-5 w-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Source Control</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="activity-bar-item">
                                                <BarChart3 className="h-5 w-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Analytics</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="activity-bar-item">
                                                <Users className="h-5 w-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Collaboration</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    
                                    <div className="flex-1" />
                                    
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="activity-bar-item">
                                                <Bell className="h-5 w-5" />
                                                {notifications.filter(n => !n.read).length > 0 && (
                                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                                )}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Notifications</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button 
                                                className="activity-bar-item"
                                                onClick={() => setShowSettings(true)}
                                            >
                                                <Settings className="h-5 w-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>Settings</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                        
                        {/* Sidebar */}
                        {!sidebarCollapsed && !zenMode && (
                            <div className="sidebar">
                                <div className="sidebar-header">
                                    <h2 className="text-lg font-semibold">Explorer</h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSidebarCollapsed(true)}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Tabs defaultValue="files" className="flex-1">
                                    <TabsList className="w-full justify-start rounded-none border-b">
                                        <TabsTrigger value="files" className="flex-1">Files</TabsTrigger>
                                        <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
                                        <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="files" className="mt-0">
                                        <ScrollArea className="h-[calc(100vh-180px)]">
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-sm font-medium">Recent Files</h3>
                                                    <Button variant="ghost" size="sm">
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {recentFiles.length === 0 ? (
                                                        <p className="text-sm text-gray-500 text-center py-8">
                                                            No recent files
                                                        </p>
                                                    ) : (
                                                        recentFiles.map(file => (
                                                            <button
                                                                key={file.id}
                                                                className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                                onClick={() => {
                                                                    setMarkdown(file.content);
                                                                    setActiveDocument(file);
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <FileText className="h-4 w-4 text-gray-500" />
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium truncate">
                                                                            {file.title}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {formatDistanceToNow(file.modified, { addSuffix: true })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </ScrollArea>
                                    </TabsContent>
                                    <TabsContent value="templates" className="mt-0">
                                        <ScrollArea className="h-[calc(100vh-180px)]">
                                            <TemplateGallery />
                                        </ScrollArea>
                                    </TabsContent>
                                    <TabsContent value="activity" className="mt-0">
                                        <ActivityFeed />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                        
                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col h-full overflow-hidden">
                            {/* Header */}
                            {!zenMode && (
                                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {sidebarCollapsed && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setSidebarCollapsed(false)}
                                                >
                                                    <Menu className="h-5 w-5" />
                                                </Button>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <Image 
                                                    src="/markdown2medium.png" 
                                                    alt="Logo" 
                                                    width={32} 
                                                    height={32}
                                                    className="rounded-lg"
                                                />
                                                <div>
                                                    <h1 className="text-lg font-semibold">Markdown2Medium</h1>
                                                    <p className="text-xs text-gray-500">Enterprise Edition</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setCommandPaletteOpen(true)}
                                                className="text-xs"
                                            >
                                                <CommandIcon className="h-4 w-4 mr-2" />
                                                Command Palette
                                                <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded">⌘K</kbd>
                                            </Button>
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuLabel>View</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuCheckboxItem
                                                        checked={zenMode}
                                                        onCheckedChange={setZenMode}
                                                    >
                                                        <Maximize2 className="h-4 w-4 mr-2" />
                                                        Zen Mode
                                                    </DropdownMenuCheckboxItem>
                                                    <DropdownMenuCheckboxItem
                                                        checked={focusMode}
                                                        onCheckedChange={setFocusMode}
                                                    >
                                                        <Target className="h-4 w-4 mr-2" />
                                                        Focus Mode
                                                    </DropdownMenuCheckboxItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuCheckboxItem
                                                        checked={minimapVisible}
                                                        onCheckedChange={setMinimapVisible}
                                                    >
                                                        Minimap
                                                    </DropdownMenuCheckboxItem>
                                                    <DropdownMenuCheckboxItem
                                                        checked={breadcrumbsVisible}
                                                        onCheckedChange={setBreadcrumbsVisible}
                                                    >
                                                        Breadcrumbs
                                                    </DropdownMenuCheckboxItem>
                                                    <DropdownMenuCheckboxItem
                                                        checked={statusBarVisible}
                                                        onCheckedChange={setStatusBarVisible}
                                                    >
                                                        Status Bar
                                                    </DropdownMenuCheckboxItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Avatar className="h-8 w-8 cursor-pointer">
                                                        <AvatarImage src={user?.avatar} />
                                                        <AvatarFallback>
                                                            {user?.name?.charAt(0) || 'U'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <User className="h-4 w-4 mr-2" />
                                                        Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Settings className="h-4 w-4 mr-2" />
                                                        Settings
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
                                                        <LogOut className="h-4 w-4 mr-2" />
                                                        Sign Out
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </header>
                            )}
                            
                            {/* Breadcrumbs */}
                            {breadcrumbsVisible && !zenMode && (
                                <div className="breadcrumb">
                                    <Home className="h-4 w-4" />
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="breadcrumb-item">Documents</span>
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="breadcrumb-item font-medium text-gray-900 dark:text-gray-100">
                                        {activeDocument?.title || 'Untitled'}
                                    </span>
                                </div>
                            )}
                            
                            {/* Editor Toolbar */}
                            {toolbarVisible && !zenMode && (
                                <div className="editor-toolbar">
                                    <div className="editor-toolbar-group">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('**', '**', 'bold')}
                                                    >
                                                        <Bold className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Bold (⌘B)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('*', '*', 'italic')}
                                                    >
                                                        <Italic className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Italic (⌘I)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('~~', '~~', 'strikethrough')}
                                                    >
                                                        <Strikethrough className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Strikethrough</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    
                                    <div className="editor-toolbar-group">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('# ', '', 'Heading 1')}
                                                    >
                                                        <Heading1 className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Heading 1 (⌘1)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('## ', '', 'Heading 2')}
                                                    >
                                                        <Heading2 className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Heading 2 (⌘2)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('### ', '', 'Heading 3')}
                                                    >
                                                        <Heading3 className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Heading 3 (⌘3)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    
                                    <div className="editor-toolbar-group">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('- ', '', 'List item')}
                                                    >
                                                        <List className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Bullet List</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('1. ', '', 'List item')}
                                                    >
                                                        <ListOrdered className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Numbered List</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('- [ ] ', '', 'Task')}
                                                    >
                                                        <ListChecks className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Task List</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    
                                    <div className="editor-toolbar-group">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('[', '](url)', 'link text')}
                                                    >
                                                        <Link className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Link (⌘K)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('![', '](url)', 'alt text')}
                                                    >
                                                        <ImageIcon className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Image</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('> ', '', 'Quote')}
                                                    >
                                                        <Quote className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Blockquote</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    
                                    <div className="editor-toolbar-group">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('`', '`', 'code')}
                                                    >
                                                        <Code className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Inline Code (⌘`)</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => insertMarkdown('```\n', '\n```', 'code block')}
                                                    >
                                                        <FileCode className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Code Block</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        className="editor-toolbar-button"
                                                        onClick={() => {
                                                            const tableTemplate = `| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`;
                                                            insertMarkdown(tableTemplate, '', '');
                                                        }}
                                                    >
                                                        <Table2 className="h-4 w-4" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Insert Table</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    
                                    <div className="flex-1" />
                                    
                                    <div className="editor-toolbar-group border-none">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={handleSave}
                                            disabled={!markdown}
                                        >
                                            <Save className="h-4 w-4 mr-2" />
                                            Save
                                        </Button>
                                        
                                        <Button
                                            size="sm"
                                            onClick={convertMarkdownToHtml}
                                            disabled={!markdown || isConverting}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                        >
                                            {isConverting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Converting...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4 mr-2" />
                                                    Convert
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Main Editor/Preview Area */}
                            <div className="flex-1 flex relative h-full overflow-hidden">
                                {/* Editor */}
                                {(activePanel === 'editor' || activePanel === 'both') && (
                                    <div className={`editor-container ${activePanel === 'both' ? 'w-1/2' : 'w-full'} h-full overflow-hidden`}>
                                        <div className="relative h-full flex flex-col">
                                            {settings.lineNumbers && (
                                                <div className="editor-gutter">
                                                    {markdown.split('\n').map((_, index) => (
                                                        <div
                                                            key={index}
                                                            className={`line-number ${index + 1 === cursorPosition.line ? 'active' : ''}`}
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <textarea
                                                ref={editorRef}
                                                className="editor-textarea"
                                                style={{
                                                    paddingLeft: settings.lineNumbers ? '80px' : '2rem',
                                                    fontFamily: settings.fontFamily,
                                                    fontSize: `${settings.fontSize}px`,
                                                    tabSize: settings.tabSize,
                                                }}
                                                value={markdown}
                                                onChange={(e) => {
                                                    setMarkdown(e.target.value);
                                                    setUndoStack([...undoStack.slice(-50), markdown]);
                                                }}
                                                onKeyUp={updateCursorPosition}
                                                onClick={updateCursorPosition}
                                                onSelect={handleTextSelection}
                                                onScroll={handleScrollSync}
                                                placeholder="Start writing your markdown here..."
                                                spellCheck={settings.spellCheck}
                                            />
                                            
                                            {minimapVisible && activePanel === 'both' && (
                                                <div className="minimap">
                                                    <canvas ref={minimapRef} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Divider */}
                                {activePanel === 'both' && (
                                    <div className="split-handle" />
                                )}
                                
                                {/* Preview */}
                                {(activePanel === 'preview' || activePanel === 'both') && (
                                    <div className={`preview-container ${activePanel === 'both' ? 'w-1/2' : 'w-full'} h-full overflow-hidden`}>
                                        <div className="preview-content h-full overflow-y-auto" ref={previewRef}>
                                            {hasConverted ? (
                                                <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-center">
                                                    <Eye className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
                                                    <h3 className="text-xl font-semibold mb-2">No Preview Available</h3>
                                                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                                                        Click the "Convert" button in the toolbar to see a preview of your markdown content
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Status Bar */}
                            {statusBarVisible && !zenMode && (
                                <div className="status-bar">
                                    <div className="status-bar-section">
                                        <div className="status-bar-item">
                                            <FileText className="h-3 w-3" />
                                            <span>{activeDocument?.title || 'Untitled'}</span>
                                        </div>
                                        
                                        {autoSaveStatus !== 'idle' && (
                                            <div className="status-bar-item">
                                                {autoSaveStatus === 'saving' && <Loader2 className="h-3 w-3 animate-spin" />}
                                                {autoSaveStatus === 'saved' && <CheckCircle className="h-3 w-3 text-green-600" />}
                                                {autoSaveStatus === 'error' && <XCircle className="h-3 w-3 text-red-600" />}
                                                <span className="capitalize">{autoSaveStatus}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="status-bar-section">
                                        <div className="status-bar-item">
                                            <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
                                        </div>
                                        
                                        <div className="status-bar-item">
                                            <span>{editorStats.words} words</span>
                                        </div>
                                        
                                        <div className="status-bar-item">
                                            <span>{editorStats.characters} characters</span>
                                        </div>
                                        
                                        {selectedText && (
                                            <div className="status-bar-item">
                                                <span>{editorStats.selectedWords} selected</span>
                                            </div>
                                        )}
                                        
                                        <div className="status-bar-item">
                                            <Clock className="h-3 w-3" />
                                            <span>~{editorStats.readingTime} min read</span>
                                        </div>
                                        
                                        <div className="status-bar-item">
                                            <span>{settings.exportFormat.toUpperCase()}</span>
                                        </div>
                                        
                                        <button
                                            className="status-bar-item"
                                            onClick={() => setActivePanel(
                                                activePanel === 'both' ? 'editor' : 
                                                activePanel === 'editor' ? 'preview' : 'both'
                                            )}
                                        >
                                            <Columns className="h-3 w-3" />
                                            <span>Layout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Right Panel */}
                        {!rightPanelCollapsed && hasConverted && (
                            <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                                    <h3 className="text-lg font-semibold">Export Options</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    <Button
                                        onClick={copyHtmlToClipboard}
                                        className="w-full"
                                        disabled={!htmlOutput}
                                    >
                                        <Copy className={`h-4 w-4 mr-2 ${copied ? 'text-green-500' : ''}`} />
                                        {copied ? 'Copied!' : 'Copy HTML'}
                                    </Button>
                                    
                                    <Button
                                        onClick={handleExport}
                                        variant="outline"
                                        className="w-full"
                                        disabled={!htmlOutput}
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Export as {settings.exportFormat.toUpperCase()}
                                    </Button>
                                    
                                    <Separator />
                                    
                                    <div>
                                        <h4 className="text-sm font-medium mb-3">Document Stats</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Words</span>
                                                <span className="font-medium">{editorStats.words}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Characters</span>
                                                <span className="font-medium">{editorStats.characters}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Sentences</span>
                                                <span className="font-medium">{editorStats.sentences}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Paragraphs</span>
                                                <span className="font-medium">{editorStats.paragraphs}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Reading Time</span>
                                                <span className="font-medium">~{editorStats.readingTime} min</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                        <h4 className="text-sm font-medium mb-3">Daily Goal</h4>
                                        <div className="mb-2">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{writingGoals.achieved} / {writingGoals.daily} words</span>
                                                <span>{Math.round((writingGoals.achieved / writingGoals.daily) * 100)}%</span>
                                            </div>
                                            <Progress 
                                                value={(writingGoals.achieved / writingGoals.daily) * 100} 
                                                className="h-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Floating Panels */}
                    {findReplaceVisible && (
                        <div className="floating-panel search-box" style={{ top: '100px', right: '20px', width: '400px' }}>
                            <div className="floating-panel-header">
                                <h4 className="font-medium">Find and Replace</h4>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setFindReplaceVisible(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="floating-panel-content space-y-3">
                                <div>
                                    <Label htmlFor="find">Find</Label>
                                    <Input
                                        id="find"
                                        value={findQuery}
                                        onChange={(e) => setFindQuery(e.target.value)}
                                        placeholder="Search text..."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="replace">Replace</Label>
                                    <Input
                                        id="replace"
                                        value={replaceQuery}
                                        onChange={(e) => setReplaceQuery(e.target.value)}
                                        placeholder="Replace with..."
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline">Find Next</Button>
                                    <Button size="sm" variant="outline">Find Previous</Button>
                                    <Button size="sm">Replace</Button>
                                    <Button size="sm">Replace All</Button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Notifications */}
                    <AnimatePresence>
                        {notifications.map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: 300 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 300 }}
                                className={`notification-toast ${notification.type}`}
                                style={{ top: `${1 + index * 5}rem` }}
                            >
                                <div className="flex-1">
                                    <h4 className="font-medium">{notification.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {notification.message}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeNotification(notification.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {/* Context Menu */}
                    {contextMenu && (
                        <div 
                            className="context-menu"
                            style={{ left: contextMenu.x, top: contextMenu.y }}
                        >
                            <div className="context-menu-item">
                                <Scissors className="h-4 w-4" />
                                Cut
                                <span className="ml-auto text-xs text-gray-500">⌘X</span>
                            </div>
                            <div className="context-menu-item">
                                <Copy className="h-4 w-4" />
                                Copy
                                <span className="ml-auto text-xs text-gray-500">⌘C</span>
                            </div>
                            <div className="context-menu-item">
                                <Clipboard className="h-4 w-4" />
                                Paste
                                <span className="ml-auto text-xs text-gray-500">⌘V</span>
                            </div>
                            <Separator className="my-1" />
                            <div className="context-menu-item">
                                <Bold className="h-4 w-4" />
                                Bold
                                <span className="ml-auto text-xs text-gray-500">⌘B</span>
                            </div>
                            <div className="context-menu-item">
                                <Italic className="h-4 w-4" />
                                Italic
                                <span className="ml-auto text-xs text-gray-500">⌘I</span>
                            </div>
                            <div className="context-menu-item">
                                <Link className="h-4 w-4" />
                                Insert Link
                                <span className="ml-auto text-xs text-gray-500">⌘K</span>
                            </div>
                        </div>
                    )}
                    
                    <Toaster />
                </div>
            </AppContext.Provider>
        </TooltipProvider>
    );
};

export default MarkdownToMediumConverter;