import Nav from '../pages_lib/Nav'
import Analytics from '../pages_lib/Analytics'

import '../styles/globals.css'
import styles from '../styles/Home.module.css'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Red News Reader</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
            </head>
            <body>
                <div className={styles.container}>
                    <Analytics />
                    <Nav />
                    {children}
                </div>
            </body>
        </html>
    )
}