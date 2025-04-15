const paths = {
  dashboard() {
    return '/dashboard'
  },
  viewTask(id: string) {
    return `/tasks/${id}`
  },
  login() {
    return '/login'
  }
}

export default paths;