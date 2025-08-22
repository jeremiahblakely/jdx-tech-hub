import './globals.css'
import AuthProvider from '../components/AuthProvider'
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
          <AuthProvider>
            {children}
          </AuthProvider>
        </AmplifyProvider>
      </body>
    </html>
  )
}