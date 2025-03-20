import useVerifyMail from '@features/hooks/auth/useVerifyMail';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  Mail,
  verifyEmailSchema,
} from '@shared/schemas/verifyMailSchema';
import { Field } from '@shared/ui/field';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormBox,
  StyledH1,
  StyledInput,
  StyledP,
  StyledSubmitButton,
} from './VerifyMailForm.styles';

const VerifyMailForm: React.FC = () => {
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Mail>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'all',
    defaultValues,
  });

  const [verifyMail, { loading }] = useVerifyMail();

  const onSubmit = handleSubmit((credentials) => {
    verifyMail({ variables: { mail: credentials } });
  });

  return (
    <FormBox>
      <StyledH1>{t('verifyEmail.title')}</StyledH1>
      <StyledP>{t('verifyEmail.subTitle')}</StyledP>
      <form onSubmit={onSubmit}>
        <Field
          errorText={t('verifyEmail.inputError')}
          invalid={Boolean(errors.otp)}
        >
          <StyledInput
            type="text"
            maxLength={6}
            {...register('otp')}
            placeholder={t('verifyEmail.inputPlaceholder')}
          />
        </Field>

        <StyledSubmitButton type="submit" disabled={loading}>
          {t('verifyEmail.confirmText')}
        </StyledSubmitButton>
      </form>
    </FormBox>
  );
};
export default VerifyMailForm;
