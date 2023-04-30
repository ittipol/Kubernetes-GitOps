import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body>
        <div className="flex flex-row justify-center bg-gray-900 py-3 text-white">
          <div>{process.env.NEXT_PUBLIC_MODE}</div>
          {
            process.env.NEXT_PUBLIC_MODE == 'Production' &&
            <div className="ml-4">
              <a href="http://nuxt" className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 m-0">Switch to Nuxt</a>
            </div>
          }
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
