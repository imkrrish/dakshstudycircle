import { getPage, getSite } from "@/lib/content"

// TEMPORARY wiring check: runs content validation at build. Replaced by the section renderer.
export default async function Home() {
  const site = await getSite()
  await getPage("home")
  return <h1>{site.name}</h1>
}
