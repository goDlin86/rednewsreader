import useSwr from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTrail, animated as a } from 'react-spring'
import styles from '../styles/Home.module.css'

import themes from '../pages_lib/themes'
import Nav from '../pages_lib/Nav'
import Item from '../pages_lib/item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(relativeTime)

import ReactGA from 'react-ga'

//ReactGA.initialize('UA-26528518-5')

export default function Main() {
    const router = useRouter()
    const t = themes.find(t => t.link === '/' + router.query.theme) || themes[0]
    const { data, error } = useSwr(
        router.query.theme ? '/api/' + router.query.theme : null, 
        async (url) => {
            const res = await fetch(url, { method: 'POST' })
            return res.json()
        },
        { revalidateOnFocus: false }
    )

    //ReactGA.pageview(router.query.theme)

    const trail = useTrail(8, {
        from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' }
    })
    console.log('render')
    
    var content = ''
    if (error) 
        content = <div className={styles.footer}>Ошибка</div>
    else if (!data) 
        content = <div className={styles.footer}>Загрузка...</div>
    else {
        const items = data.map(item => (
            {
                title: item.title.substr(0, item.title.lastIndexOf(' - ')),
                publisher: item.title.substr(item.title.lastIndexOf(' - ') + 3),
                link: item.link,
                time: dayjs(item.date).fromNow()
            }
        ))
        
        content = <>
            {trail.map((props, i) => (
                    <a.div key={i} style={props}>
                        <Item item={items[i]} color={t.color} />
                    </a.div>
                )
            )}
            {items.slice(8).map((item, i) => <Item item={item} color={t.color} key={10+i} />)}
        </>

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Red News Reader</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <main className={styles.main}>
                {content}
            </main>

            <footer className={styles.footer}>
                Powered by Google News
            </footer>
        </div>
        
    )
}