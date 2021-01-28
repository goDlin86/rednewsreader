import styles from '../styles/Home.module.css'

const Item = ({ item, color, index }) => {
    return (
        <article className={styles.article} style={{transform: 'translateY(0)', transitionDelay: `${index * .1 }s`}}>
          <a className={styles.title} href={item.link} target="_blank">
            {item.title}
          </a>
          <p className={styles.publisher}>{item.publisher}</p>
          <p className={styles.time} style={{ color: color }}>{item.time}</p>
          <div className={styles.line} style={{ background: color }} />
        </article>
    )
}

export default Item