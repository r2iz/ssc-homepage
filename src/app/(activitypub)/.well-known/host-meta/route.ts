export function GET() {
    const host = process.env.SITE_URL;
    const headers = new Headers([
        ['Content-Type', 'application/xrd+xml; charset=utf-8']
    ])
    return new Response(
        `
  <?xml version="1.0" encoding="UTF-8"?>
  <XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
    <Link rel="lrdd" template="https://${host}/.well-known/webfinger?resource={uri}"/>
  </XRD>`.trim(),
        {
            headers
        }
    )
}