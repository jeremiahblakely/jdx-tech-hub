import './globals.css'

export const metadata = {
  title: 'JDX Tech Hub',
  description: 'Project Management Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}