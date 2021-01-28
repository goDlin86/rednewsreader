import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTrail, animated as a } from 'react-spring'
import styles from '../styles/Home.module.css'

import themes from '../pages_lib/themes'
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

    const t = themes.find(t => t.link === theme) || themes[0]

    const trail = useTrail(items.length, {
        from: { marginLeft: -20, opacity: 0, transform: 'translate3d(0,-40px,0)' },
        to: { marginLeft: 20, opacity: 1, transform: 'translate3d(0,0px,0)' }
    })

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
            {trail.map((props, i) => (
                    <a.div key={i} style={props}>
                        <Item item={items[i]} color={t.color} />
                    </a.div>
                )
            )}
        </main>
    )
}

export default Main