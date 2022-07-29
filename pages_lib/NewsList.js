import useSwr from 'swr'
import { useRouter} from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/Home.module.css'

import themes from './themes'
import Item from './Item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

import ReactGA from 'react-ga4'

ReactGA.initialize('G-FB40LD9BT4')

const fetcher = url => fetch(url).then(res => res.json())

const upContent = {
    initial: { y: 120, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.4 } },
    exit: { y: 50, opacity: 0 },
}

export default function NewsList() {
    const { query } = useRouter()
    const t = themes.find(t => t.link === '/' + query.theme) || themes[0]
    const { data, error } = useSwr(
        query.theme ? '/api/' + query.theme : null, 
        fetcher,
        { revalidateOnFocus: false }
    )
    
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
    ReactGA.send({ hitType: 'pageview', page: '/' + query.theme })
        
    return (
        <AnimatePresence initial={false} exitBeforeEnter>
            <motion.div
                key={query.theme + (data ? 'data' : 'load')}
                initial='initial'
                animate='animate'
                exit='exit'
                variants={upContent}
            >
                {error ? (
                    <div className={styles.footer}>Ошибка</div>
                ) : !data ? (
                    <div className={styles.footer}>Загрузка...</div>
                ) : data ? (
                    <>
                        {items.map((item, i) => <Item item={item} color={t.color} key={i} />)}

                        <footer className={styles.footer}>
                            Powered by Google News
                        </footer>
                    </>
                ) : null}
            </motion.div>
        </AnimatePresence>
    )
}