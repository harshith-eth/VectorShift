import React, { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { Rocket, Sun, Moon } from "lucide-react";
import { useStore } from './store';

export const DarkModeToggle = () => {
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

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };

  return (
    <Button 
      onClick={handleSubmit}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
    >
      <Rocket className="mr-2 h-4 w-4" />
      Submit Pipeline
    </Button>
  );
};

export const HeaderActions = () => {
  return (
    <div className="flex items-center space-x-2">
      <SubmitButton />
      <DarkModeToggle />
    </div>
  );
};

export default HeaderActions;
