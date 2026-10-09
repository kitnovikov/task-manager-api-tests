import * as yup from "yup";

export const workspaceSchema = yup
  .object({
    id: yup.string().required().uuid(),
    name: yup.string().required().min(3).max(30),
    slug: yup.string().required().min(3).max(5),
    description: yup.string().required().min(3).max(30),
    status: yup.string().required(), // [!]
    ownerId: yup.string().required().uuid(),
    currentUserRole: yup.string().required(), // [!]
    joinedAt: yup.string().required().datetime(),
    createdAt: yup.string().required().datetime(),
  })
  .noUnknown(true);
