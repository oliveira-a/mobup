import { Prisma } from '@prisma/client';

export type TaskWithRelations = Prisma.TaskGetPayload<{
    include: {
        tags: true,
        user: true,
    }
}>;
