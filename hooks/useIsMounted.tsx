import { useEffect } from 'react'
import useToggle from './useToggle'

export function useIsMounted() {
    const [isMounted, toggleIsMounted] = useToggle(false)
    useEffect(() => {
        toggleIsMounted(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return isMounted
}
