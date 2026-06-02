#!/usr/bin/env bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUT="${TMPDIR:-/tmp}/architecture-review-${TIMESTAMP}.html"
cat > "$OUT" <<'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Architecture Review — Sezzle Calculator</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
</head>
<body class="bg-zinc-50 text-zinc-900">
  <div class="max-w-5xl mx-auto px-6 py-10">
    <header class="mb-10">
      <h1 class="text-3xl font-bold">Architecture Review</h1>
      <p class="text-zinc-600 mt-2">Sezzle full-stack calculator — deepening opportunities after TDD pass</p>
    </header>

    <section class="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-xl">
      <h2 class="text-xl font-semibold text-emerald-900">Applied in this session</h2>
      <ul class="mt-3 list-disc pl-5 text-emerald-800 space-y-1">
        <li>Extracted <code>parseOperand</code> module — Operand validation now has its own test surface</li>
        <li>Handler tests now assert full Result and error JSON (not just HTTP status)</li>
        <li>Middleware module at 100% coverage (CORS + slog logging)</li>
        <li>Docker API port → 5001 (macOS AirPlay conflict on 5000)</li>
      </ul>
    </section>

    <article class="mb-8 p-6 bg-white border rounded-xl shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <span class="px-2 py-1 text-xs font-semibold rounded bg-amber-100 text-amber-800">Worth exploring</span>
        <h2 class="text-xl font-semibold">1. Calculation orchestration module (frontend)</h2>
      </div>
      <p class="text-sm text-zinc-600 mb-4"><strong>Files:</strong> hooks/useCalculator.ts, api/client.ts, types/operation.ts</p>
      <p class="mb-4"><strong>Problem:</strong> The hook is shallow at its interface — callers must know Operation → API function mapping, unary vs binary rules, and Operand parsing. Deletion test: removing the hook scatters orchestration into CalculatorForm.</p>
      <p class="mb-4"><strong>Solution:</strong> Introduce a deep <code>performCalculation(operation, operands)</code> module that hides the operation dispatch. Hook becomes: validate → performCalculation → set state.</p>
      <div class="grid md:grid-cols-2 gap-4 my-6">
        <div class="p-4 bg-red-50 rounded-lg text-sm"><strong>Before</strong><pre class="mt-2 whitespace-pre-wrap">Form → Hook (dispatch + validate + fetch)</pre></div>
        <div class="p-4 bg-green-50 rounded-lg text-sm"><strong>After</strong><pre class="mt-2 whitespace-pre-wrap">Form → Hook → Calculation module → API seam</pre></div>
      </div>
      <p><strong>Benefits:</strong> Higher leverage at hook interface; Calculation behavior testable without React.</p>
    </article>

    <article class="mb-8 p-6 bg-white border rounded-xl shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <span class="px-2 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">Strong</span>
        <h2 class="text-xl font-semibold">2. HTTP router integration test (backend)</h2>
      </div>
      <p class="text-sm text-zinc-600 mb-4"><strong>Files:</strong> cmd/server/main.go, internal/handler/*</p>
      <p class="mb-4"><strong>Problem:</strong> Handler tests call methods directly; route wiring and middleware stack are untested (0% on cmd/server).</p>
      <p class="mb-4"><strong>Solution:</strong> One httptest against the composed mux + middleware verifying a Calculation round-trip through real routes.</p>
      <p><strong>Benefits:</strong> Locality for wiring bugs; survives handler refactors.</p>
    </article>

    <article class="mb-8 p-6 bg-white border rounded-xl shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <span class="px-2 py-1 text-xs font-semibold rounded bg-zinc-200 text-zinc-700">Speculative</span>
        <h2 class="text-xl font-semibold">3. Shared Operation registry</h2>
      </div>
      <p class="text-sm text-zinc-600 mb-4"><strong>Files:</strong> backend routes, frontend types/operation.ts</p>
      <p class="mb-4"><strong>Problem:</strong> Operation list duplicated across Go routes, frontend dropdown, and docs.</p>
      <p class="mb-4"><strong>Solution:</strong> OpenAPI spec or code-gen — likely overkill for this scope.</p>
      <p class="text-xs text-zinc-500">Contradicts lean scope in ADR-0001 — only revisit if operations grow.</p>
    </article>

    <section class="p-6 bg-blue-50 border border-blue-200 rounded-xl">
      <h2 class="text-xl font-semibold text-blue-900">Top recommendation</h2>
      <p class="mt-3 text-blue-800">For the take-home deadline, the codebase is in good shape. If you have 30 more minutes, add the <strong>HTTP router integration test</strong> — highest ROI, no ADR conflict, proves the full Calculation path works through middleware.</p>
    </section>
  </div>
  <script>mermaid.initialize({ startOnLoad: true, theme: 'neutral' });</script>
</body>
</html>
HTMLEOF
echo "$OUT"
open "$OUT" 2>/dev/null || true
