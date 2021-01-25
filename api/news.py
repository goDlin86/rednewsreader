from http.server import BaseHTTPRequestHandler
import requests
from lxml import etree
import json

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        themes = ['world', 'nation', 'scitech', 'entertainment', 'sports', 'business']
        news = []

        content_len = int(self.headers['content-length'])
        post_body = self.rfile.read(content_len)
        data = json.loads(post_body)
        theme = data['theme']

        if theme in themes:
            url = 'https://news.google.com/news/rss/headlines/section/topic/'+theme.upper()+'.ru_ru/?ned=ru_ru&hl=ru'
            r = requests.get(url)
            xml = etree.fromstring(r.content)

            for item in xml.xpath('//item'):
                news.append({
                    'title': item.xpath('title/text()')[0],
                    'link': item.xpath('link/text()')[0],
                    'date': item.xpath('pubDate/text()')[0]
                })
        else:
            news.append({'title': 'Not found theme'})

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(news).encode())
        return