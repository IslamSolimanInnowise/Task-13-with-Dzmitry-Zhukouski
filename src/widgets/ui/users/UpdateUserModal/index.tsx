import { Field, Input, NativeSelect } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UpdateUserModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
}

const formSchema = z.object({
  department_name: z.string(),
  position_name: z.string(),
  role: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setIsModalOpen(false);
  });

  return (
    <Modal
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
      titleText="TitleText"
      confirmText="Confirm Text"
      onConfirm={onSubmit}
      size="lg"
    >
      <form onSubmit={onSubmit}>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input disabled type="email" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input disabled type="password" />
        </Field.Root>
        <Field.Root>
          <Field.Label>First Name</Field.Label>
          <Input type="text" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last Name</Field.Label>
          <Input type="text" />
        </Field.Root>

        <Field.Root invalid={!!errors.department_name}>
          <Field.Label>Department</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field placeholder="" {...register('department_name')}>
              {departments.map((dep) => {
                return (
                  <option value={dep.value} key={dep.label}>
                    {dep.label}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.department_name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.position_name}>
          <Field.Label>Position</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field placeholder="" {...register('position_name')}>
              {positions.map((dep) => {
                return (
                  <option value={dep.value} key={dep.label}>
                    {dep.label}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.position_name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.role}>
          <Field.Label>Role</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field placeholder="" {...register('role')}>
              {roles.map((role) => {
                return (
                  <option value={role.value} key={role.label}>
                    {role.label}
                  </option>
                );
              })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.role?.message}</Field.ErrorText>
        </Field.Root>
      </form>
    </Modal>
  );
};

const departments = [
  { label: 'Node', value: 'node' },
  { label: 'Python', value: 'python' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Global', value: 'global' },
  { label: 'Quality Assurance', value: 'quality assurance' },
  { label: 'Blockchain', value: 'blockchain' },
  { label: 'Java', value: 'java' },
  { label: 'React', value: 'react' },
  { label: '.NET', value: '.net' },
  { label: 'Angular', value: 'angular' },
  { label: 'Vue', value: 'vue' },
  { label: 'Mobile', value: 'mobile' },
];

const positions = [
  { label: 'Systems Analyst', value: 'systems analyst' },
  { label: 'Network Engineer', value: 'network engineer' },
  { label: 'Database Administrator', value: 'database administrator' },
  { label: 'UX Designer', value: 'ux designer' },
  { label: 'Support Specialist', value: 'support specialist' },
  { label: 'Data Analyst', value: 'data analyst' },
  { label: 'Data Architect', value: 'data architect' },
  { label: 'DevOps Engineer', value: 'devops engineer' },
  { label: 'QA Engineer', value: 'qa engineer' },
  { label: 'Cloud Engineer', value: 'cloud engineer' },
  { label: 'Project Manager', value: 'project manager' },
  { label: 'AQA Engineer', value: 'aqa engineer' },
  { label: 'Software Engineer', value: 'software engineer' },
];

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Employee', value: 'employee' },
];

export default UpdateUserModal;
