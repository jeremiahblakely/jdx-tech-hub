import './globals.css'
import AmplifyProvider from '../components/AmplifyProvider'

export const metadata = {
  title: 'JDX Tech Hub',
  description: 'Project Management Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AmplifyProvider>
          {children}
        </AmplifyProvider>
      </body>
    </html>
  )
}