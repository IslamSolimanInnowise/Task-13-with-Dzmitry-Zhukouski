import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import i18n from '@shared/i18n/config';
import NotoSansBold from '@shared/styles/fonts/NotoSans-Bold.ttf';
import NotoSansRegular from '@shared/styles/fonts/NotoSans-Regular.ttf';
import NotoSansArabicBold from '@shared/styles/fonts/NotoSansArabic-Bold.ttf';
import NotoSansArabicRegular from '@shared/styles/fonts/NotoSansArabic-Regular.ttf';
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
import { useTranslation } from 'react-i18next';

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

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Noto Sans',
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
    marginBottom: 10,
    fontFamily: 'Noto Sans',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Noto Sans',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Noto Sans',
  },
  projectTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#C63031',
    textTransform: 'uppercase',
    fontFamily: 'Noto Sans',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Noto Sans',
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
    fontFamily: 'Noto Sans',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontFamily: 'Noto Sans',
  },
});

const registerFonts = () => {
  const currentLanguage = i18n.language;

  if (currentLanguage === 'ar') {
    Font.register({
      family: 'Noto Sans',
      fonts: [
        {
          src: NotoSansArabicRegular,
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
        {
          src: NotoSansArabicBold,
          fontWeight: 'bold',
          fontStyle: 'normal',
        },
      ],
    });
  } else {
    Font.register({
      family: 'Noto Sans',
      fonts: [
        {
          src: NotoSansRegular,
          fontWeight: 'normal',
        },
        {
          src: NotoSansBold,
          fontWeight: 'bold',
        },
      ],
    });
  }
};

const CVPdfDocument = ({ cvData }: CVPdfDocumentProps) => {
  const { t } = useTranslation('cvs');

  registerFonts();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.contentContainer}>
          <View style={styles.leftSection}>
            <Text style={styles.sectionTitle}>{t('preview.education')}</Text>
            <Text style={styles.text}>{cvData.education}</Text>

            <Text style={styles.sectionTitle}>
              {t('preview.languageProficiency')}
            </Text>
            {cvData.languages.map((language, index) => (
              <Text key={index} style={styles.text}>
                {language.name} — {language.proficiency}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>{t('preview.domains')}</Text>
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
          {index === 0 && (
            <Text style={styles.subtitle}>{t('preview.projects')}</Text>
          )}
          <View style={styles.contentContainer}>
            <View style={styles.leftSection}>
              <Text style={styles.projectTitle}>{project.name}</Text>
              <Text style={styles.text}>{project.description}</Text>
            </View>

            <View style={styles.rightSection}>
              <Text style={styles.sectionTitle}>
                {t('preview.projectRoles')}
              </Text>
              <Text style={styles.text}>
                {cvData.user?.position?.name || t('preview.notSpecified')}
              </Text>

              <Text style={styles.sectionTitle}>{t('preview.period')}</Text>
              <Text style={styles.text}>
                {formatCvDate(project.start_date)} –{' '}
                {formatCvDate(project.end_date)}
              </Text>

              <Text style={styles.sectionTitle}>
                {t('preview.responsibilities')}
              </Text>
              <Text style={styles.text}>
                {project.responsibilities?.join(', ') ||
                  t('preview.notSpecified')}
              </Text>

              <Text style={styles.sectionTitle}>
                {t('preview.environment')}
              </Text>
              <Text style={styles.text}>
                {project.environment?.join(', ') || t('preview.notSpecified')}
              </Text>
            </View>
          </View>
        </Page>
      ))}

      <Page size="A4" style={styles.page}>
        <Text style={styles.subtitle}>{t('preview.professionalSkills')}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>{t('preview.skills')}</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}>{t('preview.mastery')}</Text>
            <Text style={styles.tableCell}>
              {t('preview.experienceInYears')}
            </Text>
            <Text style={styles.tableCell}>{t('preview.lastUsed')}</Text>
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
};

export default CVPdfDocument;
