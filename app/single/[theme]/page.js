'use client'

import { motion } from 'framer-motion'

import styles from '../../../styles/Single.module.css'

const itemVariants = {
  initial: { y: 120, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

export default async function Page({ params }) {


  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: '65vh' }}
        animate={{ opacity: [0, 1, 1, 0], y: ['65vh', '0vh', '0vh', '-65vh']}}
        transition={{ delay: 0.5, duration: 4, ease: 'easeInOut', times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
      >
        <div className={styles.article}>
          <h1>
            Президент ЮАР: Путин и Зеленский согласились принять мирную миссию стран Африки для урегулирования конфликта
          </h1>
        </div>
      </motion.div>
    </div>
  )
}