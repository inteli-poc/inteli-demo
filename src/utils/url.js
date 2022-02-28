export const getCurrentBaseUrl = () => {
  const protocol = window.location.protocol
  const domain = window.location.hostname
  const port = window.location.port

  return `${protocol}//${domain}:${port ? port : ''}`
}
