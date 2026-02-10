import { Terminal, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface OutputDisplayProps {
  output: string;
  status: 'idle' | 'running' | 'success' | 'error';
  isLoading: boolean;
}

export default function OutputDisplay({ output, status, isLoading }: OutputDisplayProps) {
  const getStatusIcon = () => {
    if (isLoading) {
      return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
    }
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Terminal className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusText = () => {
    if (isLoading) return 'Running';
    switch (status) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      default:
        return 'Output';
    }
  };

  const getStatusColor = () => {
    if (isLoading) return 'text-blue-400';
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
        {getStatusIcon()}
        <h2 className={`text-sm font-semibold ${getStatusColor()}`}>
          {getStatusText()}
        </h2>
      </div>

      <div className="p-6">
        <div className="bg-slate-900 rounded-lg border border-slate-700 h-96 overflow-auto">
          {output ? (
            <pre className="text-slate-100 p-4 font-mono text-sm whitespace-pre-wrap">
              {output}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              {isLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                  <p>Executing code...</p>
                </div>
              ) : (
                <p>Run your code to see the output here</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
