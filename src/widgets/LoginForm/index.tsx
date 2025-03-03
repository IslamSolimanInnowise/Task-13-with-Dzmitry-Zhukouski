import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg="gray.50">
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        width="100%"
        maxWidth="400px"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Welcome back
        </Heading>
        <Text textAlign="center" mb={6}>
          Hello again! Log in to continue
        </Text>
        <form onSubmit={onSubmit}>
          <fieldset style={{ marginBottom: '16px' }}>
            <legend>Email</legend>
            <Input type="email" {...register('email')} placeholder="Email" />
            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email.message}
              </Text>
            )}
          </fieldset>

          <fieldset style={{ marginBottom: '16px' }}>
            <legend>Password</legend>
            <Input
              type="password"
              {...register('password')}
              placeholder="Password"
            />
            {errors.password && (
              <Text color="red.500" fontSize="sm">
                {errors.password.message}
              </Text>
            )}
          </fieldset>

          <Button type="submit" colorScheme="blue" width="full" mb={4}>
            LOGIN
          </Button>
        </form>
        <Text textAlign="center" mb={4}>
          <Link to="/register" color="blue.500">
            FORGOT PASSWORD
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginForm;
