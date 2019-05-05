import React, { Component } from 'react';
import Container from './components/Container';
import styled from 'styled-components';
import './App.css';

const Wrapper = styled.div`
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <Wrapper className="App">
        <Container />
      </Wrapper>
    );
  }
}

export default App;