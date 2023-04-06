import { builder } from "../builder";
import { prisma } from '../db'
import { UserUniqueInput } from './user';

builder.prismaObject('Profile', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    bio: t.exposeString('bio', { nullable: true }),
    user: t.relation('user'),
  }),
})

builder.mutationField('createProfile', (t) =>
  t.prismaField({
    type: 'Profile',
    args: {
      bio: t.arg.string({ required: true }),
      data: t.arg({ type: UserUniqueInput })
    },
    resolve: async (query, _parent, args, _context) =>
      prisma.profile.create({
        ...query,
        data: {
          bio: args.bio,
          user: {
            connect: {
              id: args.data?.id || undefined,
              email: args.data?.email || undefined
            }
          }
        }
      })
  })
)
