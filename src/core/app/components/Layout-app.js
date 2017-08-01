import React from 'react';
import Nav from '../../../modules/navigation/components/Nav-app';
import styled from 'styled-components';

const Page = styled.div`
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Layout = props => {
  const { children } = props;
  return (
    <div>
      <Nav />
      <Page>
        {children}
      </Page>
    </div>
  );
};

export default Layout;
