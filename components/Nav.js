'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import themes from './themes'

import styles from '../styles/Nav.module.css'

const Nav = () => {
    const pathname = usePathname()

    return (
        <header className={styles.header}>
            {themes.map((theme, i) => (
                <Link 
                    href={`/${theme.link}`} 
                    key={i} 
                    className={pathname.substring(1) === theme.link ? styles.current : ''}
                >
                    {/* {theme.title} */}
                </Link>
            ))}
        </header>
    )
}
  
export default Nav