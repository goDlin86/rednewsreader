import { createScheduledFunction } from 'inngest'
import { serve } from 'inngest/next'

const revalidate = createScheduledFunction('Revalidate', '0 */2 * * *', async () => {
  const res = await fetch('https://rednewsreader.vercel.app/api/revalidate?secret=' + process.env.SECRET_TOKEN)
  return res
})

export default serve('rednewsreader', [ revalidate ])