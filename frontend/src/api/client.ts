import { ApiError } from './errors'

const baseURL = import.meta.env.VITE_API_URL ?? ''

async function post<T>(path: string, body: unknown): Promise<T> {
  try {
    const response = await fetch(`${baseURL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const message =
        data && typeof data.error === 'string'
          ? data.error
          : 'Request failed'
      const code =
        data && typeof data.code === 'string' ? data.code : 'UNKNOWN_ERROR'
      throw new ApiError(response.status, code, message)
    }

    if (!data || typeof data.result !== 'number') {
      throw new ApiError(0, 'INVALID_RESPONSE', 'Invalid response from server')
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'NETWORK_ERROR', 'Unable to reach server')
  }
}

type ResultResponse = { result: number }

async function postResult(path: string, body: unknown): Promise<number> {
  const data = await post<ResultResponse>(path, body)
  return data.result
}

export function add(a: number, b: number): Promise<number> {
  return postResult('/api/v1/add', { a, b })
}

export function subtract(a: number, b: number): Promise<number> {
  return postResult('/api/v1/subtract', { a, b })
}

export function multiply(a: number, b: number): Promise<number> {
  return postResult('/api/v1/multiply', { a, b })
}

export function divide(a: number, b: number): Promise<number> {
  return postResult('/api/v1/divide', { a, b })
}

export function power(a: number, b: number): Promise<number> {
  return postResult('/api/v1/power', { a, b })
}

export function sqrt(a: number): Promise<number> {
  return postResult('/api/v1/sqrt', { a })
}

export function percentage(a: number, b: number): Promise<number> {
  return postResult('/api/v1/percentage', { a, b })
}
