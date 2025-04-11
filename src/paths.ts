const paths = {
  home() {
    return '/'
  },
  viewTask(id: string) {
    return `/tasks/${id}`
  }
}

export default paths;