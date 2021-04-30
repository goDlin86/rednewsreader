import Layout from '../pages_lib/Layout'
import Nav from '../pages_lib/Nav'
import NewsList from '../pages_lib/NewsList'

const fetcher = url => fetch(url).then(res => res.json())

export default function Main(props) {
    return (
        <Layout>
            <Nav />
            <NewsList {...props} />
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const baseUrl = 'https://rednewsreader.vercel.app'//'http://localhost:3000'
    const data = query.theme === 'world' ? await fetcher(baseUrl + '/api/' + query.theme) : null
    return { props: { theme: query.theme, initialData: data } }
}