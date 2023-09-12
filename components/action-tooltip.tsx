'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@/components/ui/tooltip'

type ActionTooltipProps = {
    children: React.ReactNode
    label: string
    side?: 'top' | 'right' | 'left' | 'bottom'
    align?: 'start' | 'center' | 'end'
}

const ActionTooltip = ({
    children,
    label,
    side = 'top',
    align = 'center',
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent align={align} side={side}>
                    <p className="font-semibold text-sm capitalize">
                        {label.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ActionTooltip
