import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../styles/Home.module.css'

import Item from './item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

import ReactGA from 'react-ga'

ReactGA.initialize('UA-26528518-5')

const Main = () => {
    const [items, setItems] = useState([])
    const { theme } = useParams()

    ReactGA.pageview(theme)

    useEffect(() => {
        fetchData()
    }, [theme])

    const fetchData = async () => {
        setItems([])

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

export default Main