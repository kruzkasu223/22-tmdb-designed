import { useEffect, useState } from "react"

type DebouceState = <T>(initialValue: T, debounceDuration: number) => T

export const useDebouceState: DebouceState = (
  initialValue,
  debounceDuration = 500
) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (!initialValue) setValue(initialValue)
    const timeout = setTimeout(() => setValue(initialValue), debounceDuration)
    return () => clearTimeout(timeout)
  }, [initialValue, debounceDuration])

  return value
}
