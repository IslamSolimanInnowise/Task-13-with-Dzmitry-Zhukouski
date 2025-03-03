import { InputGroup } from '@chakra-ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  FormValues,
  schema,
} from '@shared/schemas/authFormSchema';
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
} from './LoginForm.styles';

const LoginForm: React.FC = () => {
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

        <StyledSubmitButton type="submit">LOGIN</StyledSubmitButton>
      </form>
      <StyledLink href="#">FORGOT PASSWORD</StyledLink>
    </FormBox>
  );
};

export default LoginForm;
