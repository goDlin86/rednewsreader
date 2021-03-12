import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import themes from '../pages_lib/themes'

const Home = () => {
  return (
      <div className={styles.container}>
        <Head>
          <title>Red News Reader</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          {themes.map((theme, i) => (
            <Link href="/[theme]" as={theme.link} key={i}>{theme.title}</Link>
          ))}
        </header>

        <footer className={styles.footer}>
            Powered by Google News
        </footer>
      </div>
  )
}

export default Home