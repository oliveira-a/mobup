const paths = {
  root() {
    return '/'
  },
  dashboard() {
    return '/dashboard'
  },
  viewTask(id: string) {
    return `/tasks/${id}`
  },
  login() {
    return '/login'
  },
  logout() {
    // Change this to whatever you want.
    return '/login'
  },
  seed() {
    return '/api/seed'
  },
}

export default paths
