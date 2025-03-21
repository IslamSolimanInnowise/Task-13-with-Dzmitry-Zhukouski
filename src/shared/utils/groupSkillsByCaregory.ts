import { Skill, SkillMastery } from 'cv-graphql';

type GroupedSkills = {
  category: Skill['category_name'];
  skills: Skill['category_name'][];
};

const groupSkillsByCategory = (
  skills: SkillMastery[],
  allSkills: Skill[] | undefined,
): GroupedSkills[] => {
  return skills.reduce((acc, skill) => {
    const skillData = allSkills?.find((s) => s.name === skill.name);
    const categoryName =
      skillData?.category_parent_name || skillData?.category_name || 'Other';

    const existingCategory = acc.find((item) => item.category === categoryName);

    if (existingCategory) {
      existingCategory.skills.push(skill.name);
    } else {
      acc.push({
        category: categoryName,
        skills: [skill.name],
      });
    }

    return acc;
  }, [] as GroupedSkills[]);
};

export default groupSkillsByCategory;
