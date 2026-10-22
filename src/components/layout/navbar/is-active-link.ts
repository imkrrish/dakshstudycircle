// "/courses" stays active on "/courses/maths".
function isActiveLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export { isActiveLink }
