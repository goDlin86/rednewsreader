import styles from '../styles/Home.module.css'

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? 
        parseInt(result[1], 16) + "," +
        parseInt(result[2], 16) + "," +
        parseInt(result[3], 16)
    : null
}

const Item = ({ item, color }) => (
    <article className={styles.article}>
        <a className={styles.title} href={item.link} target="_blank">
            <span 
                className={styles.text_highlight} 
                style={{ 
                    backgroundImage: `linear-gradient(90deg,rgba(${hexToRgb(color)},.2),transparent 40%)` 
                }}
            >
                {item.title}
                <div className={styles.leftline} style={{ backgroundColor: color }} />
            </span>
        </a>
        <p className={styles.publisher}>{item.publisher}</p>
        <p className={styles.time} style={{ color: color }}>{item.time}</p>
        <div className={styles.line} style={{ backgroundColor: color }} />
    </article>
)

export default Item