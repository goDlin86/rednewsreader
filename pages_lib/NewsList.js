'use client'

import { motion, AnimatePresence } from 'framer-motion'

import Item from './Item'

const upContent = {
    initial: { y: 120, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.4 } },
    exit: { y: 50, opacity: 0 },
}

export default function NewsList({ items, color }) {

        
    return (
        <AnimatePresence initial={false} mode='wait' onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.div
                key={color}
                // initial='initial'
                // animate='animate'
                // exit='exit'
                // variants={upContent}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 20
                }}
            >
                {items.map((item, i) => <Item item={item} color={color} key={i} />)}
            </motion.div>
        </AnimatePresence>
    )
}