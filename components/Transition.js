import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const Transition = ({ children }) => {
    const { asPath } = useRouter()

    const variants = {
        out: {
            opacity: 0,
            y: 40,
            transition: {
                duration: 0.75
            }
        },
        in: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                delay: 0.5
            }
        }
    }

    return (
        <div className='effect-1'>
            <AnimatePresence initial={false} mode='wait'>
                <motion.div key={asPath} variants={variants} animate='in' initial='out' exit='out'>
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
  
export default Transition