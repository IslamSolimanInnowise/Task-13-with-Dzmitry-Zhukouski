import { InputGroup } from '@chakra-ui/input';
import useRegister from '@features/hooks/auth/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthForm,
  authFormSchema,
  defaultValues,
} from '@shared/schemas/authFormSchema';
import { Field } from '@shared/ui/field';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormBox,
  InputsContainer,
  StyledEyeButton,
  StyledH1,
  StyledInput,
  StyledInputRightElement,
  StyledLink,
  StyledP,
  StyledSubmitButton,
} from './RegisterForm.styles';

const RegisterForm: React.FC = () => {
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(authFormSchema),
    mode: 'all',
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [signUpUser, { loading }] = useRegister();

  const onSubmit = handleSubmit((credentials) => {
    signUpUser({ variables: { auth: credentials } });
  });

  return (
    <FormBox>
      <StyledH1>{t('register.title')}</StyledH1>
      <StyledP>{t('register.subTitle')}</StyledP>
      <form onSubmit={onSubmit}>
        <InputsContainer>
          <Field
            errorText={t('register.emailError')}
            invalid={Boolean(errors.email)}
          >
            <StyledInput
              type="email"
              {...register('email')}
              placeholder={t('register.emailPlaceholder')}
            />
          </Field>

          <Field
            errorText={t('register.passwordError')}
            invalid={Boolean(errors.password)}
          >
            <InputGroup>
              <StyledInput
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder={t('register.passwordPlaceholder')}
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
        </InputsContainer>

        <StyledSubmitButton type="submit" disabled={loading}>
          {t('register.confirmText')}
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/login">
        {t('register.iHaveAnAccountLink')}
      </StyledLink>
    </FormBox>
  );
};

export default RegisterForm;
