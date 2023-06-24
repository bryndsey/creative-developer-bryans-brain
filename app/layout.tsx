import { Layout } from '@/components/dom/Layout'
import '@/global.css'

export const metadata = {
  title: "Creative Developer's Brain",
  description: 'Creative Developer - using both sides of the brain',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='font-mono antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
