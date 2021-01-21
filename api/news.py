from http.server import BaseHTTPRequestHandler
import requests
from lxml import etree
import json

themes = ['world', 'nation', 'scitech', 'entertainment', 'sports', 'business']

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_len = int(self.headers['content-length'])
        post_body = self.rfile.read(content_len)
        data = json.loads(post_body)
        theme = data['theme']

        if theme in themes:
            url = 'https://news.google.com/news/rss/headlines/section/topic/'+theme.upper()+'.ru_ru/?ned=ru_ru&hl=ru'
            r = requests.get(url)
            xml = etree.parse(r.text)
            #r.close()
            root = xml.getroot()

            for item in root.find('channel').iterfind('item'):
                news.append({
                    'title': item.find('title').text,
                    'link': item.find('link').text,
                    'description': item.find('description').text,
                    'date': item.find('pubDate').text
                })
        else:
            news.append({'title': 'Not found theme'})

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(news).encode())
        return