import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  Mail,
  verifyEmailSchema,
} from '@shared/schemas/verifyMailSchema';
import { Field } from '@shared/ui/field';
import useVerifyMail from '@widgets/hooks/auth/useVerifyMail';
import { useForm } from 'react-hook-form';

import {
  FormBox,
  StyledH1,
  StyledInput,
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
        <Field errorText={errors.otp?.message} invalid={Boolean(errors.otp)}>
          <StyledInput
            type="text"
            maxLength={6}
            {...register('otp')}
            placeholder="Verification Code"
          />
        </Field>

        <StyledSubmitButton type="submit" disabled={loading}>
          VERIFY EMAIL
        </StyledSubmitButton>
      </form>
    </FormBox>
  );
};
export default VerifyMailForm;
