'use client'

import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import useToggle from '@/hooks/use-toggle'
import { useTimeoutRef } from '@/hooks/use-timeout-ref'
import {
    DialogHeader,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useMemo } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import axios from 'axios'
import { Server } from '@prisma/client'

export const InviteModal = () => {
    const {
        onOpen,
        onClose,
        isOpen,
        type,
        data: { server },
    } = useModal()
    const origin = useOrigin()

    const [isCopied, toggleIsCopied] = useToggle()
    const [isLoading, toggleIsLoading] = useToggle()
    const timeOutRef = useTimeoutRef()

    const isModalOpen = useMemo(() => {
        return isOpen && type === 'invite'
    }, [isOpen, type])

    const inviteUrl = useMemo(() => {
        return `${origin}/invite/${server?.inviteCode}`
    }, [origin, server])

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        toggleIsCopied(true)
        if (timeOutRef.current) clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            toggleIsCopied(false)
        }, 1000)
    }

    const onNew = async () => {
        try {
            toggleIsLoading(true)
            const { data } = (await axios.patch(
                `/api/servers/${server?.id}/invite-code`
            )) as { data: Server }
            onOpen('invite', { server: data })
        } catch (err) {
            console.log(err)
        } finally {
            toggleIsLoading(false)
        }
    }

    return (
        <Dialog onOpenChange={onClose} open={isModalOpen}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                            disabled={isLoading}
                            readOnly
                        />
                        <Button
                            onClick={onCopy}
                            disabled={isCopied || isLoading}
                            size="icon"
                        >
                            {isCopied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onNew}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
