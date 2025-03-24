import i18next from 'i18next';
import { z } from 'zod';

const maxFileSize = 500 * 1024;
const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/gif'];

const avatarSchema = z.object({
  avatar: z
    .custom<File>()
    .refine(
      (file) => file instanceof File,
      i18next.t('users:avatarSchema.required'),
    )
    .refine(
      (file) => file.size <= maxFileSize,
      i18next.t('users:avatarSchema.max_size', {
        size: (maxFileSize / (1024 * 1024)).toFixed(1),
      }),
    )
    .refine(
      (file) => acceptedImageTypes.includes(file.type),
      i18next.t('users:avatarSchema.invalid_type'),
    ),
});

type AvatarFormValues = z.infer<typeof avatarSchema>;

export { type AvatarFormValues, avatarSchema };
