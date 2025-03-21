import { VStack } from '@chakra-ui/react';
import Select from '@entities/ui/Select';
import { Skill, SkillMastery } from 'cv-graphql';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const masteryOptions = [
  'Novice',
  'Advanced',
  'Competent',
  'Proficient',
  'Expert',
];

type CVSkillFormProps = {
  control: Control<FormValues>;
  filteredSkills: Skill[] | undefined;
  loadings: boolean;
  updatingMode: boolean;
};

type FormValues = {
  skillName: SkillMastery['name'];
  mastery: SkillMastery['mastery'];
};

const CVSkillDialogForm = ({
  control,
  filteredSkills,
  loadings,
  updatingMode,
}: CVSkillFormProps) => {
  const { t } = useTranslation('cvs');

  return (
    <VStack as="form" display="flex" flexDirection={'column'} gap={8}>
      <Controller
        control={control}
        name="skillName"
        render={({ field }) => (
          <Select
            placeholderText={t(
              'skills.addCVSkillDialog.skillSelectPlaceholder',
            )}
            itemsList={filteredSkills?.map((skill: Skill) => ({
              id: skill.name,
              name: skill.name,
              group: skill.category_parent_name,
            }))}
            isReadOnly={loadings || updatingMode}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="mastery"
        render={({ field }) => (
          <Select
            placeholderText={t(
              'skills.addCVSkillDialog.masterySelectPlaceholder',
            )}
            itemsList={masteryOptions.map((name) => ({
              id: name,
              name,
            }))}
            isReadOnly={loadings}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </VStack>
  );
};

export default CVSkillDialogForm;
