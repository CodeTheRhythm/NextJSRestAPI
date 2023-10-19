'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';
interface EditDeleteProps {
  id: string
}

const EditDeleteTodo: React.FC<EditDeleteProps> = ({ id }) => {
  const router = useRouter();

  const editTodo = async (id: string) => {
    router.push(`/todo-input?id=${id}`);
  }

  const deleteTodo = async (id: string) => {
    if (confirm('Are you sure to delete selected item?') === false) return;

    const resp = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE'
    })

    if (resp.ok) {
      router.refresh();
    }
  }

  return (
    <>
      <i className="material-icons edit" onClick={() => editTodo(id)}>edit</i>
      <i className="material-icons delete" onClick={() => deleteTodo(id)}>delete</i>
    </>
  );
};

export default EditDeleteTodo;