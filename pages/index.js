import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route, NavLink, useParams } from 'react-router-dom'

import Item from '../pages_lib/item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

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

const Main = () => {
  const [items, setItems] = useState([])
  let { theme } = useParams()

  useEffect(() => {
    fetchData()
  }, [theme])

  const fetchData = async () => {    
    try {
      const data = JSON.stringify({ theme: theme })

      const res = await fetch("/api/news", { method: "POST", body: data })
      const json = await res.json()
      const results = json || []

      const news = results.map((item, i) => {
        const n = {}
        n.title = item.title.substr(0, item.title.lastIndexOf(" - "))
        n.publisher = item.title.substr(item.title.lastIndexOf(" - ") + 3)
        n.link = item.link
        n.time = dayjs(item.date).fromNow()

        return n
      })

      setItems(news)

    } catch(err) {
      console.error(err)
    }
  }

  return (
    <main className={styles.main}>
      {items.length === 0 && <div className={styles.footer}>Загрузка...</div>}
      {items.map((item, i) => (
        <Item item={item} key={i} />
      ))}
    </main>
  )
}

export default Home