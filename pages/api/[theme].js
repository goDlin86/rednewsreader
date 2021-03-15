import { parse } from 'node-html-parser'

export default async function handler(req, res) {
  const { query: { theme }, method } = req
  
  const url = 'https://news.google.com/news/rss/headlines/section/topic/'+theme.toUpperCase()+'.ru_ru/?ned=ru_ru&hl=ru'
  const r = await fetch(url)
  const html = await r.text()

  const dom = parse(html)

  const items = dom.querySelectorAll('item')

  const news = []
  items.forEach(item => {
    const link = item.innerHTML.substring(item.innerHTML.indexOf('<link>') + 6, item.innerHTML.indexOf('<guid'))
    news.push({
      title: item.querySelector('title').text,
      link: link, //item.querySelector('link').text,
      date: item.querySelector('pubdate').text
    })
  })
  
  res.status(200).json(news)
}