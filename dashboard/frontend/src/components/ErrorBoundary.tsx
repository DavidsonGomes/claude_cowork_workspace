import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <p className="text-red-400 font-medium">Erro inesperado</p>
            <button type="button" onClick={() => this.setState({ hasError: false })} className="text-xs text-gray-400 underline mt-2">Tentar novamente</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
