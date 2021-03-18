import Head from 'next/head'
import Nav from './Nav'

import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Red News Reader</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                <Nav />

                {children}

                <footer className={styles.footer}>
                    Powered by Google News
                </footer>
            </div>
        </>
    )
}