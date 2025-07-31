// src/hooks/useRetry.ts

import { useCallback } from "react"

/**
 * Retry an asynchronous function with exponential backoff.
 *
 * @template T
 * @param {() => Promise<T>} fn - The async function to retry.
 * @param {number} [retries=3] - Number of retry attempts.
 * @param {number} [delayMs=1000] - Initial delay in milliseconds.
 * @returns {Promise<T>}
 *
 * @throws Will throw the last encountered error after all retries fail.
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  let attempt = 0
  let error: unknown

  while (attempt < retries) {
    try {
      return await fn()
    } catch (err) {
      error = err
      attempt++
      if (attempt >= retries) break
      // Exponential backoff
      await new Promise((res) => setTimeout(res, delayMs * 2 ** (attempt - 1)))
    }
  }

  // If all retries failed, throw the last error
  throw error
}

/**
 * useRetry
 * Returns a function to retry async calls with exponential backoff.
 *
 * @example
 * const retry = useRetry()
 * const data = await retry(() => fetchData(), 5, 500)
 *
 * @returns {(fn: () => Promise<any>, retries?: number, delayMs?: number) => Promise<any>}
 */
export const useRetry = () => {
  const retry = useCallback(
    <T>(fn: () => Promise<T>, retries?: number, delayMs?: number) => {
      return retryWithBackoff(fn, retries, delayMs)
    },
    []
  )
  return retry as typeof retryWithBackoff
}

export default useRetry
