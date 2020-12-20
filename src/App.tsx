import React from 'react';
import { StoreProvider } from './models/TodoModel'

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
		<StoreProvider>
			<Container>
				<Todo />
			</Container>
		</StoreProvider>
	);
}
export default App;