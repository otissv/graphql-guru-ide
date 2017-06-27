import React from 'react';
import Nav from '../components/Nav-app';
import styled from 'styled-components';
import Footer from './Footer-app';

const Page = styled.div`
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0
`;

const Layout = props => {
  const { children } = props;
  return (
    <div>
      <Nav />
      <Page>
        {children}
      </Page>
      <Footer {...props} />
    </div>
  );
};

export default Layout;
