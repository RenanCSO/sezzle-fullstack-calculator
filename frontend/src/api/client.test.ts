import { describe, expect, it, vi, beforeEach } from 'vitest'
import { add, divide } from './client'
import { ApiError } from './errors'

describe('api client', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('calls add endpoint with correct body', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ result: 5 }),
    } as Response)

    const result = await add(2, 3)

    expect(result).toBe(5)
    expect(fetchMock).toHaveBeenCalledWith('/api/v1/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 2, b: 3 }),
    })
  })

  it('throws ApiError on non-2xx response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ error: 'division by zero', code: 'DIVISION_BY_ZERO' }),
    } as Response)

    await expect(divide(10, 0)).rejects.toMatchObject({
      message: 'division by zero',
      code: 'DIVISION_BY_ZERO',
      status: 422,
    })
  })

  it('wraps network failures as ApiError', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'))

    await expect(add(1, 2)).rejects.toBeInstanceOf(ApiError)
  })
})
