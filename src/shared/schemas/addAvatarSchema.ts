import { z } from 'zod';

const maxFileSize = 500 * 1024;
const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/gif'];

const avatarSchema = z.object({
  avatar: z
    .custom<File>()
    .refine((file) => file instanceof File, 'File is required')
    .refine((file) => file.size <= maxFileSize, 'Max file size is 0.5MB')
    .refine(
      (file) => acceptedImageTypes.includes(file.type),
      'Only .png, .jpg, .jpeg, and .gif formats are supported',
    ),
});

type AvatarFormValues = z.infer<typeof avatarSchema>;

export { type AvatarFormValues, avatarSchema };
