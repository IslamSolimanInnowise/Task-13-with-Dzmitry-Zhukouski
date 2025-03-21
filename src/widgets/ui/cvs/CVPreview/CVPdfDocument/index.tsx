import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import formatCvDate from '@shared/utils/formCvDate';
import sortProjectsByEndDate from '@shared/utils/sortProjectsByEndDate';
import {
  Cv,
  CvProject,
  LanguageProficiency,
  Position,
  Skill,
  SkillMastery,
} from 'cv-graphql';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftSection: {
    width: '40%',
    paddingRight: 15,
  },
  rightSection: {
    width: '60%',
    paddingLeft: 15,
    borderLeft: 1,
    borderColor: '#C63031',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  projectTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#C63031',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    width: '100%',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minHeight: 30,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  tableCategoryCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#C63031',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
});

type CVPdfDocumentProps = {
  cvData: {
    name: Cv['name'];
    description: Cv['description'];
    education: Cv['education'];
    languages: LanguageProficiency[];
    projects: CvProject[];
    user?: {
      position?: {
        name: Position['name'];
      };
    };
    domains: CvProject['domain'][];
    structuredSkills: {
      category: Skill['category_name'];
      skills: {
        name: Skill['category_name'];
        mastery: SkillMastery['mastery'];
      }[];
    }[];
    skillsTableData: {
      category: Skill['category_name'];
      skills: {
        name: Skill['category_name'];
        mastery: SkillMastery['mastery'];
        experienceYears: string | null;
        lastUsed: string | null;
      }[];
    }[];
  };
};

const CVPdfDocument = ({ cvData }: CVPdfDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.text}>{cvData.education}</Text>

          <Text style={styles.sectionTitle}>Language proficiency</Text>
          {cvData.languages.map((language, index) => (
            <Text key={index} style={styles.text}>
              {language.name} — {language.proficiency}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>Domains</Text>
          <Text style={styles.text}>{cvData.domains.join(',\n')}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.title}>{cvData.name}</Text>
          <Text style={styles.text}>{cvData.description}</Text>

          {cvData.structuredSkills.map((category, index) => (
            <View key={index}>
              <Text style={styles.sectionTitle}>{category.category}</Text>
              {category.skills.map((skill, skillIndex) => (
                <Text key={skillIndex} style={styles.text}>
                  {skill.name}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>

    {sortProjectsByEndDate(cvData.projects)?.map((project, index) => (
      <Page key={index} size="A4" style={styles.page}>
        {index === 0 && <Text style={styles.subtitle}>Projects</Text>}
        <View style={styles.contentContainer}>
          <View style={styles.leftSection}>
            <Text style={styles.projectTitle}>{project.name}</Text>
            <Text style={styles.text}>{project.description}</Text>
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.sectionTitle}>Project roles</Text>
            <Text style={styles.text}>
              {cvData.user?.position?.name || 'Not specified'}
            </Text>

            <Text style={styles.sectionTitle}>Period</Text>
            <Text style={styles.text}>
              {formatCvDate(project.start_date)} –{' '}
              {formatCvDate(project.end_date)}
            </Text>

            <Text style={styles.sectionTitle}>Responsibilities</Text>
            <Text style={styles.text}>
              {project.responsibilities?.join(', ') || 'Not specified'}
            </Text>

            <Text style={styles.sectionTitle}>Environment</Text>
            <Text style={styles.text}>
              {project.environment?.join(', ') || 'Not specified'}
            </Text>
          </View>
        </View>
      </Page>
    ))}

    <Page size="A4" style={styles.page}>
      <Text style={styles.subtitle}>Professional skills</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Category</Text>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}>Mastery</Text>
          <Text style={styles.tableCell}>Experience</Text>
          <Text style={styles.tableCell}>Last Used</Text>
        </View>
        {cvData.skillsTableData.map((category) =>
          category.skills.map((skill, index) => (
            <View
              key={`${category.category}-${skill.name}`}
              style={styles.tableRow}
            >
              {index === 0 && (
                <Text style={styles.tableCategoryCell}>
                  {category.category}
                </Text>
              )}
              {index !== 0 && <Text style={styles.tableCell}></Text>}
              <Text style={styles.tableCell}>{skill.name}</Text>
              <Text style={styles.tableCell}>{skill.mastery}</Text>
              <Text style={styles.tableCell}>{skill.experienceYears}</Text>
              <Text style={styles.tableCell}>{skill.lastUsed}</Text>
            </View>
          )),
        )}
      </View>
    </Page>
  </Document>
);

export default CVPdfDocument;
