import Layout from '../pages_lib/Layout'
import Nav from './Nav'
import NewsList from '../pages_lib/NewsList'

export default function Main() {
    return (
        <Layout>
            <Nav />
            <NewsList />
        </Layout>
    )
}