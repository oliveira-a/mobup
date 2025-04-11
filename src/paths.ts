const paths = {
  dashboard() {
    return '/'
  },
  viewTask(id: string) {
    return `/tasks/${id}`
  }
}

export default paths;