import { InputGroup } from '@chakra-ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  NewPassword,
  newPasswordSchema,
} from '@shared/schemas/newPasswordSchema';
import useResetPassword from '@widgets/hooks/auth/useResetPassword';
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
} from './ResetPasswordForm.styles';

const ResetPasswordForm: React.FC = () => {
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

  const [ResetPassword, { loading }] = useResetPassword();

  const onSubmit = handleSubmit((credentials) => {
    ResetPassword({ variables: { auth: credentials } });
  });

  return (
    <FormBox>
      <StyledH1>Reset password</StyledH1>
      <StyledP>We will send you an email with further instructions</StyledP>
      <form onSubmit={onSubmit}>
        <fieldset style={{ marginBottom: '16px' }}>
          <InputGroup>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              {...register('newPassword')}
              placeholder="Password"
              error={errors.newPassword ? 'isError' : undefined}
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
          {errors.newPassword && (
            <StyledErrorP>{errors.newPassword.message}</StyledErrorP>
          )}
        </fieldset>
        <StyledSubmitButton type="submit" disabled={loading}>
          RESET PASSWORD
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/login">CANCEL</StyledLink>
    </FormBox>
  );
};

export default ResetPasswordForm;
