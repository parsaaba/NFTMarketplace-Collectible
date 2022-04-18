import * as React from "react";
import styled from "styled-components";
import { FaRegCopy } from "react-icons/fa";

import { clipboardCopy } from "../utils/copyToClipboard";

const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  padding-right: 40px;

  svg {
    display: none;
    cursor: pointer;
    position: absolute;
    right: 0;

    &:active {
      transform: scale(1.4);
      fill: #626262;
    }
  }

  &:hover {
    svg {
      display: block;
    }
  }
`;

interface Props {
  text: string;
}
const CopyText: React.FC<Props> = ({ children, text }) => (
  <Wrapper>
    {children}
    <FaRegCopy onClick={() => clipboardCopy(text)} />
  </Wrapper>
);

export default CopyText;
