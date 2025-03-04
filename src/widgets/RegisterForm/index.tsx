import { useMutation } from '@apollo/client';
import { InputGroup } from '@chakra-ui/input';
import { REGISTER_USER } from '@features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  FormValues,
  schema,
} from '@shared/schemas/authFormSchema';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FormBox,
  StyledErrorP,
  StyledEyeButton,
  StyledH1,
  StyledInput,
  StyledInputRightElement,
  StyledLink,
  StyledP,
  StyledSubmitButton,
} from './RegisterForm.styles';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();

  const [signUpUser, { loading, data }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log('Registration successful:', data);
      navigate({ to: '/login' });
    },
    // onError: (error) => {
    //   console.log(error);
    // },
  });

  const onSubmit = handleSubmit((credentials) => {
    signUpUser({ variables: { auth: credentials } });
  });

  return (
    <FormBox>
      <StyledH1>Register now</StyledH1>
      <StyledP>Welcome! Sign up to continue</StyledP>
      <form onSubmit={onSubmit}>
        <fieldset style={{ marginBottom: '16px' }}>
          <StyledInput
            type="email"
            {...register('email')}
            placeholder="Email"
          />
          {errors.email && <StyledErrorP>{errors.email.message}</StyledErrorP>}
        </fieldset>

        <fieldset style={{ marginBottom: '16px' }}>
          <InputGroup>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
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
          {errors.password && (
            <StyledErrorP>{errors.password.message}</StyledErrorP>
          )}
        </fieldset>

        <StyledSubmitButton type="submit" disabled={loading}>
          CREATE ACCOUNT
        </StyledSubmitButton>
      </form>
      <StyledLink to="/login">I HAVE AN ACCOUNT</StyledLink>
    </FormBox>
  );
};

export default RegisterForm;
