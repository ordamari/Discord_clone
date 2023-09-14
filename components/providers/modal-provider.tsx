'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { useIsMounted } from '@/hooks/use-is-mounted'

export const ModalProvider = () => {
    const isMounted = useIsMounted()

    if (!isMounted) return null
    return (
        <>
            <CreateServerModal />
        </>
    )
}
