import { InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button, IconButton, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  FormBox,
  StyledErrorP,
  StyledH1,
  StyledInput,
  StyledLink,
  StyledP,
  StyledSubmitButton,
} from './LoginForm.styles';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: { email: '', password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormBox>
      <StyledH1>Welcome back</StyledH1>
      <StyledP>Hello again! Log in to continue</StyledP>
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
            <InputRightElement>
              <IconButton
                aria-label="Toggle Password Visibility"
                variant="plain"
                size="sm"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <StyledErrorP>{errors.password.message}</StyledErrorP>
          )}
        </fieldset>

        <StyledSubmitButton type="submit">LOGIN</StyledSubmitButton>
      </form>
      <StyledLink href="#">FORGOT PASSWORD</StyledLink>
    </FormBox>
  );
};

export default LoginForm;
