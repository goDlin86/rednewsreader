import Nav from '../../components/Nav'
import Analytics from '../../components/Analytics'

import styles from '../../styles/Home.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Analytics />
      <Nav />

      {children}
    </div>
  )
}