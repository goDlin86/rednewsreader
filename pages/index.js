import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom'

import Main from '../pages_lib/main'

const themes = [
  {title: "World", link: "world", color: ""},
  {title: "Россия", link: "nation", color: ""},
  {title: "Спорт", link: "sports", color: ""},
  {title: "Наука", link: "scitech", color: ""},
  {title: "Культура", link: "entertainment", color: ""},
  {title: "Бизнес", link: "business", color: ""}
]

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