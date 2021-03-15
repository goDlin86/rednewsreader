import Link from 'next/link'
import { useRouter } from 'next/router'
import themes from './themes'

import styles from '../styles/Nav.module.css'

const Nav = () => {
    const { asPath } = useRouter()

    return (
        <header className={styles.header}>
            {themes.map((theme, i) => (
                <Link href='/[theme]' as={theme.link} key={i}>
                    <a className={asPath === theme.link ? styles.current : ''}>{theme.title}</a>
                </Link>
            ))}
        </header>
    )
}
  
export default Nav