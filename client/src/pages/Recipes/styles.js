import styled from "styled-components";
import { BasePageContainer } from "../../styles/global";

export const RecipesContainer = styled(BasePageContainer)``;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 12.5px;
  border: 1px solid ${(props) => props.theme.text};
  margin-top: 20px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  transition: 0.4s;
  text-align: center;

  &:focus {
    border-color: ${(props) => props.theme.focus};
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.text};
  }
`;
