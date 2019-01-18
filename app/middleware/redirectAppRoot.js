export default function({ route, redirect }) {
  const baseUrl = process.env.BASE_URL || ''
  if (route.path === '' || route.path === '/' || route.path === baseUrl) {
    return redirect(`${baseUrl}/trends`)
  }
}
