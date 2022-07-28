import Head from 'next/head'

import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Red News Reader</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
            </Head>

            <div className={styles.container}>

                {children}
                
            </div>
        </>
    )
}