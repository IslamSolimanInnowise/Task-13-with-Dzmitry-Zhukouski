import i18n from '@shared/i18n/config';
import { Skill, SkillMastery } from 'cv-graphql';

type GroupedSkills = {
  category: Skill['category_name'];
  skills: {
    name: Skill['category_name'];
    mastery: SkillMastery['mastery'];
  }[];
};

const groupSkillsByCategory = (
  skills: SkillMastery[],
  allSkills: Skill[] | undefined,
): GroupedSkills[] => {
  return skills.reduce((acc, skill) => {
    const skillData = allSkills?.find((s) => s.name === skill.name);
    const categoryName =
      skillData?.category_parent_name ||
      skillData?.category_name ||
      i18n.t('others:select.others');

    const existingCategory = acc.find((item) => item.category === categoryName);

    if (existingCategory) {
      existingCategory.skills.push({
        name: skill.name,
        mastery: skill.mastery,
      });
    } else {
      acc.push({
        category: categoryName,
        skills: [
          {
            name: skill.name,
            mastery: skill.mastery,
          },
        ],
      });
    }

    return acc;
  }, [] as GroupedSkills[]);
};

export default groupSkillsByCategory;
