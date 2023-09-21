import { Member, Profile, Server } from '@prisma/client'

export type MemberWithProfile = Member & {
    profile: Profile
}

export type ServerWithMembersWithProfile = Server & {
    members: MemberWithProfile[]
}
