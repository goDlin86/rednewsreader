export default async (req, res) => {
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate('/world')
    await res.revalidate('/nation')
    await res.revalidate('/sports')
    await res.revalidate('/scitech')
    await res.revalidate('/entertainment')
    await res.revalidate('/business')
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}