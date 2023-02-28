'use client'

import { motion, AnimatePresence } from 'framer-motion'

import Item from './Item'

const upContent = {
    initial: { y: 100, opacity: 0, transition: { type: 'spring', bounce: 0, duration: 0.4, staggerChildren: 0.1, delayChildren: 0.3 } },
    animate: { y: 0, opacity: 1, transition: { duration: 0.4, staggerChildren: 0.1 } },
    //exit: { y: 50, opacity: 0 },
}
const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
}

export default function NewsList({ items, color }) {

        
    return (
        <>
        {/* <AnimatePresence initial={false} mode='wait' onExitComplete={() => window.scrollTo(0, 0)}> */}
            <motion.div
                key={color}
                initial='initial'
                animate='animate'
                //exit='exit'
                variants={upContent}
            >
                {items.map((item, i) => (
                    <motion.div variants={itemVariants} key={i}>
                        <Item item={item} color={color} />
                    </motion.div>
                ))}
            </motion.div>
        {/* </AnimatePresence> */}
        </>
    )
}