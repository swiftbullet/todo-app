import React, {
	useState,
	useCallback,
	FormEvent,
	MouseEvent
} from 'react';
import styled from 'styled-components';
import TodoItem from '../components/TodoItem';
import { IoIosAdd } from 'react-icons/io';

const Container = styled.div``;
const Contents = styled.div``;
const Button = styled.button`
  ${props => props.theme.addButton}
`;
const Title = styled.h1`
  font-size: 24px;
  color: #000;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  ${props => props.theme.resetInput}
  padding-left: 10px;
  height: 40px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 15px;
  &:focus {
    border-color: #ff7256;
  }
`;

type TTodo = {
	id: number;
	title: string;
	done: boolean;
};

function Todo() {
	const [todoList, setTodoList] = useState<TTodo[]>([]);
	const [value, setValue] = useState<string>('');
	const [uniqId, setUniqId] = useState<number>(0);

	const addTodo = useCallback((): void => {
		const newTodo: TTodo[] = [
			...todoList,
			{ id: uniqId, title: value, done: false }
		];
		setTodoList(newTodo);
	}, [todoList, uniqId, value]);

	const editTodo = useCallback(
		(id: number, title: string): void => {
			const newTodo: TTodo[] = todoList.map(todo => {
				if (todo.id === id) {
					todo.title = title;
				}
				return todo;
			});
			setTodoList(newTodo);
		},
		[todoList]
	);

	const deleteTodo = useCallback(
		(id: number): void => {
			const newTodo = todoList.filter(todo => todo.id !== id);
			setTodoList(newTodo);
		},
		[todoList]
	);

	const checkTodo = useCallback(
		(e: MouseEvent<HTMLButtonElement>, id: number): void => {
			e.preventDefault();
			const newTodo: TTodo[] = todoList.map(todo => {
				if (todo.id === id) {
					todo.done = !todo.done;
				}
				return todo;
			});

			setTodoList(newTodo);
		},
		[todoList]
	);

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>): void => {
			e.preventDefault();
			addTodo();
			setValue('');
			setUniqId(prev => prev + 1);
		},
		[addTodo]
	);

	return (
		<Container>
			<Title>Задачи</Title>
			<Contents>
				{todoList.length > 0 &&
					todoList.map((todo: TTodo, index: number) => (
						<TodoItem
							{...todo}
							editTodo={editTodo}
							deleteTodo={deleteTodo}
							checkTodo={checkTodo}
							key={index}
						/>
					))}
				<form onSubmit={handleSubmit}>
					<Row>
						<Input
							type='text'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
						<Button type='submit'>
							<IoIosAdd size={45} />
						</Button>
					</Row>
				</form>
			</Contents>
		</Container>
	);
}

export default Todo;