import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom'

import themes from '../pages_lib/themes'
import Main from '../pages_lib/main'

const Home = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Head>
          <title>Red News Reader</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          {themes.map((theme, i) => (
            <NavLink to={theme.link} activeClassName={styles.current} key={i}>{theme.title}</NavLink>
          ))}
        </header>

        <Switch>
          <Redirect exact from="/" to="/world" />
          <Route path='/:theme' children={<Main />} />
        </Switch>

        <footer className={styles.footer}>
            Powered by Google News
        </footer>
      </div>
    </Router>
  )
}

export default Home