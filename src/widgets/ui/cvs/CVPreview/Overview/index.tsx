import {
  LeftTopicSection,
  RightTopicSection,
  TopicContentContainer,
  TopicsDivider,
  TopicSectionTitle,
} from '../cvpreview.styles';

const Overview: React.FC = () => {
  return (
    <>
      <TopicContentContainer>
        <LeftTopicSection>
          <TopicSectionTitle>Education</TopicSectionTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, perferendis.
          </p>
          <TopicSectionTitle>Language proficiency</TopicSectionTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, perferendis.
          </p>
          <TopicSectionTitle>Domains</TopicSectionTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, perferendis.
          </p>
        </LeftTopicSection>
        <RightTopicSection>
          <TopicSectionTitle>SOME CV NAME</TopicSectionTitle>
          <p>SOME CV DESC</p>
        </RightTopicSection>
      </TopicContentContainer>
      <TopicsDivider />
    </>
  );
};

export default Overview;
