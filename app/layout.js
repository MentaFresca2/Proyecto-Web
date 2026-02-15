import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "PYMES HUB - Herramientas Open Source con Docker",
  description:
    "Plataforma de herramientas open source para pequenas empresas mediante Docker. Digitaliza tu negocio sin costes elevados.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
