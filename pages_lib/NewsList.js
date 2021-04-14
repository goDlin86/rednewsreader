import useSwr from 'swr'
import { useRouter } from 'next/router'
import { useTrail, animated as a } from 'react-spring'
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
    const { query } = useRouter()
    const t = themes.find(t => t.link === '/' + query.theme) || themes[0]
    const { data, error } = useSwr(
        query.theme ? '/api/' + query.theme : null, 
        fetcher,
        { initialData, revalidateOnFocus: false }
    )

    const trail = useTrail(8, {
        from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' }
    })
    //console.log('render')
    
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
    ReactGA.pageview(query.theme)
        
    return (
        <>
            {trail.map((props, i) => (
                    <a.div key={i} style={props}>
                        <Item item={items[i]} color={t.color} />
                    </a.div>
                )
            )}
            {items.slice(8).map((item, i) => <Item item={item} color={t.color} key={10+i} />)}
        </>
    )
}

export async function getServerSideProps({ query }) {
    const data = await fetcher('/api/' + query.theme)
    return { props: { initialData: data, theme: query.theme } }
}