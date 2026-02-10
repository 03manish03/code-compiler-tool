import { useState } from 'react';
import { Play, Code2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import OutputDisplay from './OutputDisplay';

const LANGUAGES = [
  { id: 'python', name: 'Python', example: 'print("Hello, World!")' },
  { id: 'javascript', name: 'JavaScript', example: 'console.log("Hello, World!");' },
  { id: 'typescript', name: 'TypeScript', example: 'console.log("Hello, World!");' },
  { id: 'java', name: 'Java', example: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}' },
  { id: 'cpp', name: 'C++', example: '#include <iostream>\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}' },
  { id: 'c', name: 'C', example: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}' },
  { id: 'csharp', name: 'C#', example: 'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}' },
  { id: 'ruby', name: 'Ruby', example: 'puts "Hello, World!"' },
  { id: 'go', name: 'Go', example: 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, World!")\n}' },
  { id: 'rust', name: 'Rust', example: 'fn main() {\n  println!("Hello, World!");\n}' },
  { id: 'php', name: 'PHP', example: '<?php\necho "Hello, World!";\n?>' },
  { id: 'swift', name: 'Swift', example: 'print("Hello, World!")' },
  { id: 'kotlin', name: 'Kotlin', example: 'fun main() {\n  println("Hello, World!")\n}' },
  { id: 'scala', name: 'Scala', example: 'object Main extends App {\n  println("Hello, World!")\n}' },
];

export default function CodeEditor() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('print("Hello, World!")');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (langId: string) => {
    const lang = LANGUAGES.find(l => l.id === langId);
    if (lang) {
      setLanguage(langId);
      setCode(lang.example);
      setOutput('');
      setStatus('idle');
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setStatus('running');
    setOutput('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/execute-code`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ language, code }),
      });

      const result = await response.json();

      if (result.error) {
        setOutput(result.error);
        setStatus('error');
      } else {
        setOutput(result.output);
        setStatus(result.status);
      }

      await supabase.from('code_submissions').insert({
        language,
        code,
        output: result.output || result.error,
        status: result.status || 'error',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to execute code';
      setOutput(errorMessage);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Code2 className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Code Compiler</h1>
          </div>
          <p className="text-slate-300 text-lg">Execute code in 14+ programming languages</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
            <div className="bg-slate-900 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <label htmlFor="language" className="text-sm font-semibold text-slate-300">
                Select Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-6">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={handleRunCode}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-5 h-5" />
                {isLoading ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>

          <OutputDisplay output={output} status={status} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
