import { ITodo } from '@/app/types/ITodo';
import SaveUpdateTodo from '@/app/components/saveUpdateTodo/SaveUpdateTodo';

async function getTodo(id: string): Promise<ITodo | null>  {
  if (id === undefined) return null;

  try {
    const resp = await fetch(`http://localhost:3000/api/todos/${id}`, {
      cache: 'no-store'
    });

    if (resp.ok) {
      const { todo } = await resp.json();
      return todo as ITodo;
    } else {
      throw new Error('Failed to fetch todo');
    }
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export default async function todoInput({ searchParams: { id } }: { 
  searchParams: { 
    id: string 
  } 
}) {
  const todo = await getTodo(id);

  return (
    <>
      <div className="title">
        <h2>Add Todo</h2>
      </div>
      <SaveUpdateTodo id={id} todo={todo} />
    </>
  )
}