// Validates internal links and anchors in the built site.
// Run after `pnpm build`. Exits non-zero if any root-relative link
// points at a missing route or a missing fragment.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const PAGES_DIR = '.next/server/pages'

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return htmlFiles(full)
    return name.endsWith('.html') ? [full] : []
  })
}

function routeToFile(route) {
  const clean = route.replace(/\/+$/, '') || '/index'
  const candidates = [
    join(PAGES_DIR, `${clean}.html`),
    join(PAGES_DIR, clean, 'index.html')
  ]
  return candidates.find((c) => existsSync(c)) ?? null
}

function idsIn(html) {
  const ids = new Set()
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) ids.add(match[1])
  return ids
}

const files = htmlFiles(PAGES_DIR)
const errors = []

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const source = `/${relative(PAGES_DIR, file).replace(/\.html$/, '')}`
  for (const match of html.matchAll(/\shref="(\/[^"#]*)(#[^"]*)?"/g)) {
    const [, route, fragment] = match
    if (route.startsWith('/_next')) continue
    // Static assets are served from public/, not the pages tree
    if (existsSync(join('public', route))) continue
    const target = routeToFile(route)
    if (!target) {
      errors.push(`${source}: broken link ${route}`)
      continue
    }
    if (fragment && fragment.length > 1) {
      const id = decodeURIComponent(fragment.slice(1))
      if (!idsIn(readFileSync(target, 'utf8')).has(id)) {
        errors.push(`${source}: missing anchor ${route}${fragment}`)
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`${errors.length} broken internal link(s):`)
  for (const error of [...new Set(errors)]) console.error(`  ${error}`)
  process.exit(1)
}
console.log(`Checked ${files.length} pages: all internal links and anchors resolve.`)
