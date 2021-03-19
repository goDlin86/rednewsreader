import Head from 'next/head'

import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Red News Reader</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>

                {children}

                <footer className={styles.footer}>
                    Powered by Google News
                </footer>
            </div>
        </>
    )
}