import { InputGroup } from '@chakra-ui/input';
import useLogin from '@features/hooks/auth/useLogin';
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
} from './LoginForm.styles';

const LoginForm: React.FC = () => {
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

  const [loginUser, { loading }] = useLogin();

  const onSubmit = handleSubmit((creds) => {
    loginUser({ variables: { auth: creds } });
  });

  return (
    <FormBox>
      <StyledH1>Welcome back</StyledH1>
      <StyledP>Hello again! Log in to continue</StyledP>
      <form onSubmit={onSubmit}>
        <InputsContainer>
          <Field
            errorText={errors.email?.message}
            invalid={Boolean(errors.email)}
          >
            <StyledInput
              type="email"
              {...register('email')}
              placeholder="Email"
            />
          </Field>

          <Field
            errorText={errors.password?.message}
            invalid={Boolean(errors.password)}
          >
            <InputGroup>
              <StyledInput
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Password"
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
          LOGIN
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/forgot-password">FORGOT PASSWORD</StyledLink>
    </FormBox>
  );
};

export default LoginForm;
