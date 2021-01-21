import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React, { useEffect, useState } from 'react'
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import googleNewsAPI from 'google-news-json'

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
  {title: "Наука", link: "science", color: ""},
  {title: "Культура", link: "entertainment", color: ""},
  {title: "Бизнес", link: "business", color: ""}
]

const Home = () => {
  const [theme, setTheme] = useState(0)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchData()
  }, [theme])

  const fetchData = async () => {
    try {
      // const res = await fetch("https://google-news.p.rapidapi.com/v1/topic_headlines?lang=ru&country=RU&topic=world", {
	    //   "method": "GET",
	    //   "headers": {
		  //     "x-rapidapi-key": "524d06434bmsh6315a26a37e8d6fp1a0727jsn3e7f932135bd",
		  //     "x-rapidapi-host": "google-news.p.rapidapi.com"
	    //   }
      // })

      // const res = await googleNewsAPI.getNews(googleNewsAPI.TOPIC, googleNewsAPI.TOPICS_WORLD, "ru-RU")

      // const json = await res.json()
      // const articles = json.articles || []

      // const news = articles.map(item => {
      //   const n = {}

      //   n.title = item.title.substr(0, item.title.lastIndexOf(" - "))
      //   n.link = item.link
      //   n.publisher = item.source.title
      //   n.time = dayjs(item.published).fromNow()

      //   return n
      // })

      const data = new FormData()
      data.append("theme", "world")

      const res = await fetch("/api/news", { method: "POST" })//, body: data })
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
    <div className={styles.container}>
      <Head>
        <title>Red News Reader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        {themes.map((theme, i) => (
          <a href={theme.link} key={i}>{theme.title}</a>
        ))}
      </header>

      <main className={styles.main}>
        {items.length === 0 && <div className={styles.footer}>Загрузка...</div>}
        {items.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </main>

      <footer className={styles.footer}>
          Powered by Google News
      </footer>
    </div>
  )
}

export default Home