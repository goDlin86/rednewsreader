'use client'

import { useState, useEffect } from 'react'

import styles from '../styles/Single.module.css'

export default function Single({ items }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setI(i + 1)
    }, 4000)
  })

  return (
    <>
      <div className={styles.article}>
        <h1 style={{ margin: 0 }}>
          {items[i].title}
        </h1>
      </div>
    </>
  )
}