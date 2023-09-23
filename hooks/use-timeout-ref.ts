import { useEffect, useRef } from 'react'

export function useTimeoutRef() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const currentTimeoutRef = timeoutRef.current

        return () => {
            if (currentTimeoutRef) {
                clearTimeout(currentTimeoutRef)
            }
        }
    }, [])

    return timeoutRef
}
