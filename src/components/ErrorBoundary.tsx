import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFBF7]">
          <div className="max-w-md w-full bg-white border-2 border-black p-8 space-y-5 shadow-2xl text-center">
            <div className="p-3 bg-neutral-100 text-black border border-black/20 rounded-full inline-block">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-black/50 block">
                Plataforma de Psicoanálisis
              </span>
              <h3 className="font-serif text-2xl font-bold text-black">
                Recuperación Doctrinal
              </h3>
            </div>
            <p className="text-xs font-sans text-black/75 leading-relaxed">
              El sistema ha contenido un estado transitorio sin interrumpir el funcionamiento de la aplicación.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider hover:opacity-85 transition-opacity inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer Interfaz</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
