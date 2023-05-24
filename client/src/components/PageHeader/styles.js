import styled from "styled-components";

export const PageHeaderContainer = styled.section`
  h1 {
    font-family: "Rakkas", serif;
    font-size: 48px;
    color: ${(props) => props.theme.secondary};
    letter-spacing: 2px;
    margin: auto;
  }

  p {
    font-size: 20px;
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

