import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues, Email, emailSchema } from '@shared/schemas/emailSchema';
import useForgotPassword from '@widgets/hooks/auth/useForgotPassword';
import { useForm } from 'react-hook-form';

import {
  FormBox,
  StyledErrorP,
  StyledH1,
  StyledInput,
  StyledLink,
  StyledP,
  StyledSubmitButton,
} from './ForgotPasswordForm.styles';

const ForgotPasswordForm: React.FC = () => {
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
      <StyledH1>Forgot password</StyledH1>
      <StyledP>We will send you an email with further instructions</StyledP>
      <form onSubmit={onSubmit}>
        <fieldset style={{ marginBottom: '16px' }}>
          <StyledInput
            type="email"
            {...register('email')}
            placeholder="Email"
            error={errors.email ? 'isError' : undefined}
          />
          {errors.email && <StyledErrorP>{errors.email.message}</StyledErrorP>}
        </fieldset>
        <StyledSubmitButton type="submit" disabled={loading}>
          RESET PASSWORD
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/login">CANCEL</StyledLink>
    </FormBox>
  );
};

export default ForgotPasswordForm;
