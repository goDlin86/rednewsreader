import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'rednewsreader' })

const themes = ['world', 'nation', 'sports', 'scitech', 'entertainment', 'business']

const revalidate = inngest.createFunction(
  { name: 'Revalidate RedNewsReader' }, 
  { cron: '0 */2 * * *' }, 
  async ({ event, step }) => {
    for (const theme in themes) {
      await step.run(theme, async () => await f(theme))
    }
  }
)

const f = async (theme) => {
  const res = await fetch('https://rednewsreader.vercel.app/api/revalidate?theme=' + theme + '&secret=' + process.env.SECRET_TOKEN)
  return await res.json()
}

export default serve(inngest, [ revalidate ], { logLevel: "fatal" | "error" | "warn" | "info" | "debug" | "silent" })