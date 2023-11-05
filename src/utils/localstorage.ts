const getUserInterface = (key: string) => {
  const userInterface =
    window.localStorage.getItem('user-interface') ?? '{"pagenum": "1", "pagesize":"5", "sidebarCollapsed":"0"}'
  if (userInterface) {
    return Number(JSON.parse(userInterface)[key])
  }
  return undefined
}

const setUserInterface = (key: string, value: string) => {
  const userInterface =
    window.localStorage.getItem('user-interface') ?? '{"pagenum": "1", "pagesize":"5", "sidebarCollapsed":"0"}'
  const userInterfaceObj = JSON.parse(userInterface)
  userInterfaceObj[key] = value
  window.localStorage.setItem('user-interface', JSON.stringify(userInterfaceObj))
}
export { getUserInterface, setUserInterface }
