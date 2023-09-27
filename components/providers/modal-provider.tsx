'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { InviteModal } from '@/components/modals/invite-modal'
import { EditServerModal } from '@/components/modals/edit-server-modal'

export const ModalProvider = () => {
    const isMounted = useIsMounted()

    if (!isMounted) return null
    return (
        <>
            <EditServerModal />
            <CreateServerModal />
            <InviteModal />
        </>
    )
}
