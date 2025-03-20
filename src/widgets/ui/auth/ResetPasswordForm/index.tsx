import { InputGroup } from '@chakra-ui/input';
import useResetPassword from '@features/hooks/auth/useResetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  NewPassword,
  newPasswordSchema,
} from '@shared/schemas/newPasswordSchema';
import { Field } from '@shared/ui/field';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormBox,
  StyledEyeButton,
  StyledH1,
  StyledInput,
  StyledInputRightElement,
  StyledLink,
  StyledP,
  StyledSubmitButton,
} from './ResetPasswordForm.styles';

type ResetPasswordFormProps = {
  token: string | null;
};

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPassword>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'all',
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [ResetPassword, { loading }] = useResetPassword(token);

  const onSubmit = handleSubmit((credentials) => {
    ResetPassword({ variables: { auth: credentials } });
  });

  return (
    <FormBox>
      <StyledH1>{t('resetPassword.title')}</StyledH1>
      <StyledP>{t('resetPassword.subTitle')}</StyledP>
      <form onSubmit={onSubmit}>
        <Field
          errorText={t('resetPassword.passwordError')}
          invalid={Boolean(errors.newPassword)}
        >
          <InputGroup>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              {...register('newPassword')}
              placeholder={t('resetPassword.passwordPlaceholder')}
              autoComplete="on"
            />
            <StyledInputRightElement>
              <StyledEyeButton
                aria-label="Toggle Password Visibility"
                variant="plain"
                size="md"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </StyledEyeButton>
            </StyledInputRightElement>
          </InputGroup>
        </Field>
        <StyledSubmitButton type="submit" disabled={loading}>
          {t('resetPassword.confirmText')}
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/login">{t('resetPassword.backLink')}</StyledLink>
    </FormBox>
  );
};

export default ResetPasswordForm;
