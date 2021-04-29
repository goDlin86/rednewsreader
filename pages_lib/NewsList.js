import useSwr from 'swr'
import styles from '../styles/Home.module.css'

import themes from './themes'
import Item from './Item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

import ReactGA from 'react-ga'

ReactGA.initialize('UA-26528518-5')

const fetcher = url => fetch(url).then(res => res.json())

export default function NewsList({ theme, initialData }) {
    const t = themes.find(t => t.link === '/' + theme) || themes[0]
    const { data, error } = useSwr(
        theme ? '/api/' + theme : null, 
        fetcher,
        { initialData, revalidateOnFocus: false }
    )
    
    if (error) return <div className={styles.footer}>Ошибка</div>
    
    if (!data) return <div className={styles.footer}>Загрузка...</div>

    const items = data.map(item => (
        {
            title: item.title.substr(0, item.title.lastIndexOf(' - ')),
            publisher: item.title.substr(item.title.lastIndexOf(' - ') + 3),
            link: item.link,
            time: dayjs(item.date).fromNow()
        }
    ))
    ReactGA.pageview(theme)
        
    return (
        <>
            {items.map((item, i) => <Item item={item} color={t.color} key={i} />)}
        </>
    )
}