import styles from '../styles/Home.module.css'

const Item = ({ item, color }) => (
    <article className={styles.article}>
        <a className={styles.title} href={item.link} target="_blank">
            {item.title}
        </a>
        <p className={styles.publisher}>{item.publisher}</p>
        <p className={styles.time} style={{ color: color }}>{item.time}</p>
        <div className={styles.line} style={{ background: color }} />
    </article>
)

export default Item