import { useMemo } from 'react'
import { useIsMounted } from './use-is-mounted'

export function useOrigin() {
    const isMounted = useIsMounted()

    const origin = useMemo(() => {
        if (
            typeof window !== 'undefined' &&
            window.location.origin &&
            isMounted
        )
            return window.location.origin
        return ''
    }, [isMounted])

    return origin
}
