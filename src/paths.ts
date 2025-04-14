const paths = {
  dashboard() {
    return '/dashboard'
  },
  viewTask(id: string) {
    return `/tasks/${id}`
  }
}

export default paths;