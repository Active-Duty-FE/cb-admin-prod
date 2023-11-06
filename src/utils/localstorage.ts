const getUserInterface = (key: string) => {
  const userInterface =
    window.localStorage.getItem('user-interface') ??
    '{"pagenum": "1", "pagesize":"5", "sidebarCollapsed":"0", "tips": "0"}'
  if (userInterface) {
    return JSON.parse(userInterface)[key]
  }
  return undefined
}

const setUserInterface = (key: string, value: string) => {
  let userInterface = '{"pagenum": "1", "pagesize":"5", "sidebarCollapsed":"0", "tips": "0"}'
  const localItem = window.localStorage.getItem('user-interface')
  if (localItem !== '' && localItem !== null) {
    userInterface = localItem
  }

  const userInterfaceObj = JSON.parse(userInterface)
  userInterfaceObj[key] = value
  window.localStorage.setItem('user-interface', JSON.stringify(userInterfaceObj))
}
export { getUserInterface, setUserInterface }
