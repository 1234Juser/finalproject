import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';

const CommunityLayout = () => {
  return (
    <div>
      <TabContainer>
        <StyledTab to="/community/companion">여행커뮤니티 게시판</StyledTab>
        <StyledTab to="/community/chat">실시간 채팅방</StyledTab>
      </TabContainer>
      <ContentArea>
        <Outlet />
      </ContentArea>
    </div>
  );
};

export default CommunityLayout;

// styled-components
const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
  border-bottom: 2px solid #ddd;
  background-color: #f9f9f9;
    justify-content: center;
`;

const StyledTab = styled(NavLink)`
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: #555;
  text-decoration: none;

  &.active {
    color: black;
    border-bottom : 1px solid black;
  }

  &:hover {
    background-color: #eee;
  }
`;

const ContentArea = styled.div`
  padding: 2rem;
`;
