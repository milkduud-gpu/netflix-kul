const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function parseNumber(raw: string | null) {
  if (raw === null || raw.trim() === '') return NaN
  return Number(raw)
}

Deno.serve((req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const params = new URL(req.url).searchParams
  const problems: string[] = []
  const values: Record<string, number> = {}

  for (const name of ['a', 'b']) {
    const raw = params.get(name)
    if (raw === null || raw.trim() === '') {
      problems.push(`Query parameter "${name}" is missing`)
      continue
    }
    const n = parseNumber(raw)
    if (!Number.isFinite(n)) problems.push(`Query parameter "${name}" is not a valid number (got "${raw}")`)
    else values[name] = n
  }

  if (problems.length) return json({ error: problems.join('; ') }, 400)
  return json({ result: values.a + values.b })
})
