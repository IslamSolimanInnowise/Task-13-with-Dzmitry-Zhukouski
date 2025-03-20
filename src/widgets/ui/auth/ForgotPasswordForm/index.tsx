import useForgotPassword from '@features/hooks/auth/useForgotPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues, Email, emailSchema } from '@shared/schemas/emailSchema';
import { Field } from '@shared/ui/field';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormBox,
  StyledH1,
  StyledInput,
  StyledLink,
  StyledP,
  StyledSubmitButton,
} from './ForgotPasswordForm.styles';

const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Email>({
    resolver: zodResolver(emailSchema),
    mode: 'all',
    defaultValues,
  });

  const [forgotPassword, { loading }] = useForgotPassword();

  const onSubmit = handleSubmit((credentials) => {
    forgotPassword({ variables: { auth: credentials } });
  });

  return (
    <FormBox>
      <StyledH1>{t('forgotPassword.title')}</StyledH1>
      <StyledP>{t('forgotPassword.subTitle')}</StyledP>
      <form onSubmit={onSubmit}>
        <Field
          errorText={t('forgotPassword.emailError')}
          invalid={Boolean(errors.email)}
        >
          <StyledInput
            type="email"
            {...register('email')}
            placeholder={t('forgotPassword.emailPlaceholder')}
          />
        </Field>
        <StyledSubmitButton type="submit" disabled={loading}>
          {t('forgotPassword.confirmText')}
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/login">{t('forgotPassword.cancelLink')}</StyledLink>
    </FormBox>
  );
};

export default ForgotPasswordForm;
