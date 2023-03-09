export default async (req, res) => {
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate('/' + req.query.theme)
    return res.status(200).json({ revalidated: 'req.query.theme' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}