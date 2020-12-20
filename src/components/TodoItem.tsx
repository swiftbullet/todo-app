import React, {
	useState,
	useRef,
	useCallback,
	MouseEvent,
	FormEvent
} from 'react';
import { observer } from 'mobx-react-lite'
import { IoMdCreate, IoIosTrash } from 'react-icons/io';
import { FaRegCheckCircle, FaRegCircle, } from 'react-icons/fa';
import { MdDone } from "react-icons/md"

import styled from 'styled-components';

type TStyledContainer = {
	isActive: boolean;
};

type TStyledColumn = {
	last?: boolean;
};

type TStyledInput = {
	isActive: boolean;
};

type TTodoItem = {
	id: number;
	title: string;
	done: boolean;
	editTodo: Function;
	deleteTodo: Function;
	checkTodo: Function;
};

const Container = styled.div<TStyledContainer>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  text-decoration: none;
  color: #000;
  ${props =>
		props.isActive &&
		`
    text-decoration: line-through;
  `}
`;

const Column = styled.div<TStyledColumn>`
  display: flex;
	align-items: center;
	
  padding: 0 0 0 10px;
  width: 90%;
  ${props =>
		props.last &&
		`
		justify-content: flex-end;
    padding: 0;
		width: 15%;
		min-width: 95px;
    text-align: right;
  `}
`;

const Title = styled.span``;

const Input = styled.input<TStyledInput>`
  ${props => props.theme.resetInput}
  position: absolute;
  top: -200%;
  left: -200%;
  opacity: 1;
  height: 40px;
  font-size: 15px;
	outline: none;
  ${props =>
		props.isActive &&
		`
    opacity: 1;
    position: static;
  `}
`;

const CompleteButton = styled.button`
  ${props => props.theme.resetButton};
  margin-right: 10px;
  outline: none;
  color: #019cdc;
`;

const EditButton = styled.button`
  ${props => props.theme.resetButton}
  margin: 0 7px;
  font-size: 1.4rem;
  color: #009acd;
`;

const DeleteButton = styled.button`
  ${props => props.theme.resetButton}
	margin: 0 7px;
  font-size: 1.4rem;
  color: #ff004c;
`;

function TodoItem({
	id,
	title,
	done,
	editTodo,
	deleteTodo,
	checkTodo
}: TTodoItem) {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [editText, setEditText] = useState<string>(title);

	const inputEl = useRef<HTMLInputElement>(null);

	const editStart = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setIsEdit(prev => !prev);
		if (inputEl.current === null) return;
		inputEl.current.focus();
	}, []);

	const editEnd = useCallback(
		(e: MouseEvent<HTMLButtonElement>): void => {
			e.preventDefault();
			editTodo(id, editText);
			setIsEdit(prev => !prev);
		},
		[editText, editTodo, id]
	);

	const handleInput = useCallback((e: FormEvent<HTMLInputElement>): void => {
		setEditText(e.currentTarget.value);
	}, []);

	return (
		<Container isActive={done}>
			<Column>
				<Input
					ref={inputEl}
					type='text'
					onChange={handleInput}
					isActive={isEdit}
					value={editText}
				/>
				{!isEdit && (
					<CompleteButton onClick={e => checkTodo(e, id)}>
						{done ? <FaRegCheckCircle size={25} /> : <FaRegCircle size={25} />}
					</CompleteButton>
				)}
				{!isEdit && <Title>{title}</Title>}
			</Column>
			<Column last={true}>
				{!done &&
					(isEdit ? (
						<EditButton onClick={editEnd}><MdDone /></EditButton>
					) : (
							<div>
								<EditButton onClick={editStart}>
									<IoMdCreate />
								</EditButton>
								<DeleteButton onClick={() => deleteTodo(id)}>
									<IoIosTrash />
								</DeleteButton>
							</div>
						))}
			</Column>
		</Container>
	);
}

export default TodoItem;