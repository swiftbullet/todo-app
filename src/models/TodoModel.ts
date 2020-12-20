import { types, Instance } from "mobx-state-tree"
import { createContext, useContext } from 'react'
import makeInspectable from 'mobx-devtools-mst'
import { useLocalStore } from 'mobx-react-lite';
import { useObserver } from 'mobx-react-lite';
import { optional } from "mobx-state-tree/dist/internal"

export interface ITodoModel extends Instance<typeof TodoModel> { }
export type TodoModelType = typeof TodoModel

export const TodoModel = types
	.model("TodoModel", {
		id: types.identifierNumber,
		title: types.string,
		completed: false
	})
	.actions(self => ({
		changeText() {

		},
		toggleDone() {

		},
		removeTodo() {

		},
	})
	)

export interface IRootStoreModel extends Instance<typeof RootStore> { };
export type RootStoreType = typeof RootStore;

export const RootStore = types
	.model("RootStore", {
		todos: types.array(types.frozen<TodoModelType>()),
	})
	.actions(self => ({
		addTodo() { }
	}))

export const getDefaultStore = () => RootStore.create({});

export const RootStoreContext = createContext<RootStoreType | null>(null);

export const StoreProvider: React.FC = ({ children?: ReactNode }) => {
	const store = useLocalStore(getDefaultStore);
	makeInspectable(store);
	return (
		<RootStoreContext.Provider value= { store } >
		{ children }
		< /RootStoreContext.Provider>
  );
};

export default StoreProvider;