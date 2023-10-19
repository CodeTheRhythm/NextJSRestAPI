import Link from 'next/link';
import './styles.css';
import { ITodo } from '@/app/types/ITodo';
import EditDeleteTodo from '@/app/components/editDeleteTodo/EditDeleteTodo';

const getTodos = async (): Promise<ITodo[]> => {
  try {
    const resp = await fetch('http://localhost:3000/api/todos', {
      cache: 'no-store'
    });

    if (!resp.ok) {
      throw new Error('Failed to fetch todos');
    }

    const { todos } = await resp.json();
    return todos;
  } catch (err: any) {
    console.log(err.message);
    return [];
  }
}

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <div className="container">
      <div className="title">
        <h2>Todos</h2>
      </div>
      <div className="content">
        <Link href="/todo-input" className="add-btn">
          Add New
        </Link>
        <table className="list">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map((todo: any) => (
                <tr key={todo._id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    <EditDeleteTodo id={todo._id} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
