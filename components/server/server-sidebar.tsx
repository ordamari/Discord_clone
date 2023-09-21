import { redirect } from 'next/navigation'
import { Channel, ChannelType } from '@prisma/client'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ServerHeader } from './server-header'

type ServerSidebarProps = {
    serverId: string
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile()
    if (!profile) return redirect('/')

    const server = await db.server.findUnique({
        where: { id: serverId, members: { some: { profileId: profile.id } } },
        include: {
            channels: {
                orderBy: { createdAt: 'asc' },
            },
            members: {
                include: { profile: true },
                orderBy: {
                    role: 'asc',
                },
            },
        },
    })
    if (!server) return redirect('/')

    const { textChannels, audioChannels, videoChannels } =
        server.channels.reduce(
            (acc, channel) => {
                switch (channel.type) {
                    case ChannelType.TEXT:
                        acc.textChannels.push(channel)
                        break
                    case ChannelType.AUDIO:
                        acc.audioChannels.push(channel)
                        break
                    case ChannelType.VIDEO:
                        acc.videoChannels.push(channel)
                        break
                }
                return acc
            },
            {
                textChannels: [] as Channel[],
                audioChannels: [] as Channel[],
                videoChannels: [] as Channel[],
            }
        )

    const members = server.members.filter(
        (member) => member.profileId !== profile.id
    )

    const role = server.members.find(
        (member) => member.profileId === profile.id
    )?.role

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
            <ServerHeader server={server} role={role} />
        </div>
    )
}