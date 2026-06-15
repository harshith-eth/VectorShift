import React, { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { ArrowUpRight, ChevronRight, ArrowUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GeneratePipeline() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      const height = header.getBoundingClientRect().height;
      setHeaderHeight(height);
    }
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-6 z-50 bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 text-sm flex items-center"
      >
        <Sparkles className="mr-2 h-4 w-4 inline-block" /> Generate Pipeline
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 w-full sm:w-[450px] z-50 overflow-hidden"
            style={{
              top: `${headerHeight}px`,
              height: `calc(100% - ${headerHeight}px)`
            }}
          >
            <Card className="h-full flex flex-col shadow-lg rounded-none border-t-0 bg-white dark:bg-gray-800 p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-gray-100">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Pipeline
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="flex items-center">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto p-4">
                <div className="space-y-4">
                  <h2 className="text-sm font-medium text-muted-foreground dark:text-gray-400">Pipeline Options</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {['Data Ingestion', 'Data Processing', 'Model Training', 'Evaluation'].map((item) => (
                      <Button key={item} variant="outline" className="justify-between text-xs h-8 flex items-center dark:bg-gray-700 dark:text-gray-300">
                        {item} <ArrowUpRight className="h-3 w-3 ml-2" />
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-4">
                <CardFooter className="flex flex-col space-y-2">
                  <div className="flex w-full items-center space-x-2">
                    <Input 
                      placeholder="Enter pipeline details..." 
                      className="flex-grow text-sm h-9 dark:bg-gray-700 dark:text-gray-300"
                    />
                    <Button size="sm" className="h-9 w-9 p-0 flex items-center">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="w-full text-xs text-muted-foreground dark:text-gray-400 text-center">
                    Pipeline Generator powered by AI.
                  </div>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}