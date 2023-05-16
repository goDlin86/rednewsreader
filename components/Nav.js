'use client'

import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import themes from './themes'

import styles from '../styles/Nav.module.css'

const Nav = () => {
    const [selectedLayoutSegment] = useSelectedLayoutSegments()

    return (
        <header className={styles.header}>
            {themes.map((theme, i) => (
                <Link 
                    href={`/${theme.link}`} 
                    key={i} 
                    className={selectedLayoutSegment === theme.link ? styles.current : ''}
                >
                    {/* {theme.title} */}
                </Link>
            ))}
        </header>
    )
}
  
export default Nav