import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Footer from './components/Footer'
import { Fragment } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <App />
    <Footer />
  </Fragment>,
)
