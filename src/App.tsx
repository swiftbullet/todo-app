import React from 'react';
import styled from 'styled-components';
import Todo from './containers/Todo';

const Container = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  width: 100%;
  max-width: 800px;
`;

function App() {
	return (
		<Container>
			<Todo />
		</Container>
	);
}

export default App;