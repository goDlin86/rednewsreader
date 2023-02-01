//import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/Home.module.css'

import themes from './themes'
import Item from './Item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

const upContent = {
    initial: { y: 120, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.4 } },
    exit: { y: 50, opacity: 0 },
}

async function fetchData(theme) {
    const res = await fetch(`https://rednewsreader.vercel.app/api/${theme}`)
    const data = await res.json()
    return data
}

export default async function NewsList({ theme }) {
    const t = themes.find(t => t.link === theme) || themes[0]
    
    const data = await fetchData(theme)
    let items = []
    if (data) {
        items = data.map(item => (
            {
                title: item.title.substr(0, item.title.lastIndexOf(' - ')),
                publisher: item.title.substr(item.title.lastIndexOf(' - ') + 3),
                link: item.link,
                time: dayjs(item.date).fromNow()
            }
        ))
    }
        
    return (
        <div>
            {items.map((item, i) => <Item item={item} color={t.color} key={i} />)}

            <footer className={styles.footer}>
                Powered by Google News
            </footer>
        </div>
    )
}