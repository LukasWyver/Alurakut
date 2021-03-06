import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #d9e6f6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display:block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
    backgroundSecondary: '#F1F9FE',
    backgroundDefault: '#D9E6F6',

    primaryText:'#2E7BB4',
    secondaryText:'#388BB0',
    tertiaryText:'#2F4A71',

    primaryElement:'#6F92BB',
    anotherElement:'#5579A1',

    gray1:'#333333',
    gray2:'#5A5A5A',
    gray3:'#999999',
    gray4:'#C5C6CA',
    gray5:'#F4F4F4',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}