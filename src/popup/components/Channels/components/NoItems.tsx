import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px 36px;

  svg {
    margin: 0 0 24px;
    ${props => props.theme.transition('stroke', 'fill')};
  }
`;

const TextBig = styled.p`
  font-size: 16px;
  line-height: 19px;
  font-weight: 600;
  margin: 0 0 4px;
  text-align: center;
  ${props => props.theme.transition('color')};
`;

const TextSmall = styled.p`
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  margin: 0;
  color: ${props => props.theme.color.text.faded};
  ${props => props.theme.transition('color')};
`;

const NoItems: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <svg width="80px" height="63px" viewBox="0 0 80 66" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="nonzero" fill="none">
          <path
            d="m25.075 63c0-8.5604 6.9496-15.5 15.522-15.5s15.522 6.9396 15.522 15.5"
            stroke={theme.color.border.normal}
            strokeLinecap="round"
            strokeWidth="5.97"
          />
          <path
            transform="rotate(90 40 21.865)"
            d="m60.896 39.398c0 12.377-10.775 22.41-24.068 22.41h-16.235c-0.82216 0-1.4887-0.6665-1.4887-1.4887v-76.907c0-0.82216 0.6665-1.4887 1.4887-1.4887h16.235c13.292 0 24.068 10.033 24.068 22.41 0 7.0987-3.5447 13.426-9.076 17.532 5.5312 4.106 9.076 10.434 9.076 17.532z"
            fill={theme.color.border.normal}
          />
          <ellipse
            cx="23.881"
            cy="27.231"
            rx="5.97"
            ry="5.962"
            fill={theme.color.background.normal}
          />
          <ellipse
            cx="59.701"
            cy="27.231"
            rx="5.97"
            ry="5.962"
            fill={theme.color.background.normal}
          />
        </g>
      </svg>

      <TextBig>You are not blocking any channels yet.</TextBig>
      <TextSmall>
        Add a channel name you don't want to see on YouTube.
      </TextSmall>
    </Container>
  );
};

export default NoItems;
