import '../styles/HomeStyle/Card.css'
import '../styles/GlobalStyle/Nav.css'
import '../styles/HomeStyle/Cart.css'


function MyApp({ Component, pageProps }) {
  return (
  <div>
      <Component {...pageProps} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@600;700&display=swap" rel="stylesheet"></link>
  </div>)
}

export default MyApp
