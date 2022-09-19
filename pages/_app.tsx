import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppBoundary from '@/components/AppBoundary'
import { Provider } from 'react-redux'
import { store } from 'app/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppBoundary>
        <Component {...pageProps} />
      </AppBoundary>
    </Provider>
  )
}

export default MyApp
