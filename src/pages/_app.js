
import AppLayout from '../components/Layout'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>)
  
}
