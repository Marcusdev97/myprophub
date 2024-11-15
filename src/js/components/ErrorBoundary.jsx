// 创建一个新的组件 ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-primary hover:underline"
            >
              Reload page
            </button>
          </div>
        );
      }
  
      return this.props.children;
    }
  }

export default ErrorBoundary;