import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  Mail,
  verifyEmailSchema,
} from '@shared/schemas/verifyMailSchema';
import useVerifyMail from '@widgets/hooks/auth/useVerifyMail';
import { useForm } from 'react-hook-form';

import {
  FormBox,
  StyledErrorP,
  StyledH1,
  StyledInput,
  StyledLink,
  StyledP,
  StyledSubmitButton,
} from './VerifyMailForm.styles';

const VerifyMailForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Mail>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'all',
    defaultValues,
  });

  const [verifyMail, { loading }] = useVerifyMail();

  const onSubmit = handleSubmit((credentials) => {
    verifyMail({ variables: { mail: credentials } });
  });

  return (
    <FormBox>
      <StyledH1>Verify Email</StyledH1>
      <StyledP>Please enter the verification code</StyledP>
      <form onSubmit={onSubmit}>
        <fieldset style={{ marginBottom: '16px' }}>
          <StyledInput
            type="number"
            {...register('otp')}
            placeholder="Verification Code"
            error={errors.otp ? 'isError' : undefined}
          />
          {errors.otp && <StyledErrorP>{errors.otp.message}</StyledErrorP>}
        </fieldset>

        <StyledSubmitButton type="submit" disabled={loading}>
          VERIFY EMAIL
        </StyledSubmitButton>
      </form>
      <StyledLink to="/auth/login">Back to Login</StyledLink>
    </FormBox>
  );
};
export default VerifyMailForm;
