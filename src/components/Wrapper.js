import styled from 'styled-components';

const Wrapper = (backgroundUrl) =>styled.div`
  background: url('${backgroundUrl}') no-repeat;
  background-size: cover;
  height: 100%;
  overflow: hidden;
`;

export default Wrapper;
