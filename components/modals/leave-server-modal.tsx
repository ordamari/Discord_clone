'use client'

import { useModal } from '@/hooks/use-modal-store'
import useToggle from '@/hooks/use-toggle'
import {
    DialogHeader,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useMemo } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const LeaveServerModal = () => {
    const {
        onClose,
        isOpen,
        type,
        data: { server },
    } = useModal()
    const [isLoading, toggleIsLoading] = useToggle()
    const router = useRouter()
    const isModalOpen = useMemo(() => {
        return isOpen && type === 'leaveServer'
    }, [isOpen, type])

    const onConfirm = async () => {
        toggleIsLoading(true)
        try {
            await axios.patch(`/api/servers/${server?.id}/leave`)
            onClose()
            router.refresh()
            router.push('/')
        } catch (e) {
            console.log(e)
        } finally {
            toggleIsLoading(false)
        }
    }

    return (
        <Dialog onOpenChange={onClose} open={isModalOpen}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-center">
                        Are you sure you want to leave{' '}
                        <span className="font-semibold text-indigo-500">
                            {server?.name}
                        </span>
                        ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant="primary"
                            onClick={onConfirm}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
