'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';
import { ITodo } from '@/app/types/ITodo';

interface SaveUpdateProps {
  id: string;
  todo: ITodo | null;
}

const SaveUpdateTodo: React.FC<SaveUpdateProps> = ({ id, todo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    (!id) ? addTodo() : updateTodo();
  }

  const addTodo = async () => {
    const resp = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    })

    if (resp.ok) {
      router.push('/todos');
      router.refresh();
    } else {
      throw new Error('Failed to add todo');
    }
  }

  const updateTodo = async () => {
    const resp = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    })

    if (resp.ok) {
      router.push('/todos');
      router.refresh();
    } else {
      throw new Error('Failed to update todo');
    }
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" value={title}
        onChange={(e) => setTitle(e.target.value) } />
      <label htmlFor="desc">Description</label>
      <input type="text" id="desc" value={description}
        onChange={(e) => setDescription(e.target.value) } />
      <button type="submit">Save</button>
    </form>
  );
};

export default SaveUpdateTodo;