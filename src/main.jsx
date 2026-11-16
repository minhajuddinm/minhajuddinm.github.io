import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] caught:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen p-8 font-mono bg-warm-bg text-ink">
          <h2 className="text-accent">Something went wrong</h2>
          <pre className="text-accent whitespace-pre-wrap text-sm">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
