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
      <StyledH1>Reset password</StyledH1>
      <StyledP>Please enter a new Password</StyledP>
      <form onSubmit={onSubmit}>
        <Field
          errorText={errors.newPassword?.message}
          invalid={Boolean(errors.newPassword)}
        >
          <InputGroup>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              {...register('newPassword')}
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
        <StyledSubmitButton type="submit" disabled={loading}>
          RESET PASSWORD
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/login">Back to Login</StyledLink>
    </FormBox>
  );
};

export default ResetPasswordForm;
