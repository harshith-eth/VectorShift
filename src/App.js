import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PipelineUI from './ui';
import GeneratePipeline from './GeneratePipeline';
import { ArrowDownToLine, Play, Settings, Search, Sun, Moon } from 'lucide-react';
import { Database, Filter, Image, Layers, Terminal, Cpu, Calculator, DownloadCloud, Type } from 'lucide-react';
import SubmitButton from './submit';
import { Button } from "./components/ui/button";

// Node imports
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { FilterNode } from './nodes/filterNode';
import { ImageProcessingNode } from './nodes/imageProcessingNode';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { MathNode } from './nodes/mathNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

// Dark Mode Toggle Component
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <Button
      onClick={toggleDarkMode}
      variant="ghost"
      size="icon"
      className="w-9 h-9 p-0"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default function Component() {
  const [activeTab, setActiveTab] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);

  const tabs = ['General', 'LLMs', 'Knowledge Base', 'Integrations', 'Data Loaders', 'Multi-Modal', 'Logic', 'Chat'];

  const tools = [
    { type: 'api', label: 'API', icon: <Terminal size={16} />, node: APINode },
    { type: 'database', label: 'Database', icon: <Database size={16} />, node: DatabaseNode },
    { type: 'filter', label: 'Filter', icon: <Filter size={16} />, node: FilterNode },
    { type: 'imageProcessing', label: 'Image Processing', icon: <Image size={16} />, node: ImageProcessingNode },
    { type: 'input', label: 'Input', icon: <DownloadCloud size={16} />, node: InputNode },
    { type: 'llm', label: 'LLM', icon: <Cpu size={16} />, node: LLMNode },
    { type: 'math', label: 'Math', icon: <Calculator size={16} />, node: MathNode },
    { type: 'output', label: 'Output', icon: <Layers size={16} className="transform rotate-180" />, node: OutputNode },
    { type: 'text', label: 'Text', icon: <Type size={16} />, node: TextNode },
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchExpanded && !event.target.closest('.search-container')) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Pipelines › Untitled Pipeline</h1>
            <button className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors">
              Edit
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-md">
              <ArrowDownToLine size={16} />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-md">
              <Play size={16} />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-md">
              <Settings size={16} />
            </button>
            <SubmitButton />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 overflow-x-auto">
              <motion.div className="relative flex items-center search-container" layout>
                <motion.button
                  onClick={toggleSearch}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-md focus:outline-none"
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={20} />
                </motion.button>
                <AnimatePresence>
                  {isSearchExpanded && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 256, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="absolute left-0 flex items-center overflow-hidden"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search Nodes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-2 py-1 w-full border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      />
                      <Search size={16} className="absolute left-2 text-gray-400 dark:text-gray-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {!isSearchExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-4"
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-3 px-2 text-sm font-medium focus:outline-none ${
                          activeTab === tab
                            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center space-x-2 py-2">
              {tools.map((tool) => (
                <div
                  key={tool.type}
                  className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors rounded-md p-2 cursor-grab"
                  onDragStart={(event) => onDragStart(event, tool.type)}
                  draggable
                >
                  {tool.icon}
                  <span className="text-xs ml-1 dark:text-gray-300">{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-4 relative">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow flex-grow">
          <PipelineUI />
        </div>
        <GeneratePipeline />
      </main>
    </div>
  );
}