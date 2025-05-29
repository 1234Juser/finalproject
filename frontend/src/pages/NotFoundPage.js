import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaPlaneDeparture } from "react-icons/fa";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #FFFFFF;
  text-align: center;
`;

const Float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const PlaneIcon = styled(FaPlaneDeparture)`
  font-size: 80px;
  color: #4682b4;
  animation: ${Float} 2.5s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 48px;
  margin: 24px 0 8px;
  color: #333;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #4682b4;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3b6c96;
  }
`;

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <NotFoundWrapper>
            <PlaneIcon />
            <Title>길을 잃으셨나요?</Title>
            <Message>
                해당 페이지를 찾을 수 없어요. <br /> 올바른 경로인지 다시 한 번 확인해주세요.
            </Message>
            <Button onClick={() => navigate("/")}>메인으로 돌아가기</Button>
        </NotFoundWrapper>
    );
}

export default NotFoundPage;
