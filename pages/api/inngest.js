import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'rednewsreader' })

const revalidate = inngest.createFunction(
  { name: 'Revalidate RedNewsReader' }, 
  { cron: '0 */2 * * *' }, 
  async ({ event, step }) => {
    const res = await fetch('https://rednewsreader.vercel.app/api/revalidate?secret=' + process.env.SECRET_TOKEN)
    return res
  }
)

export default serve(inngest, [ revalidate ])