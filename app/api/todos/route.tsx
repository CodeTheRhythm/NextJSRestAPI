import { NextRequest, NextResponse } from 'next/server';
import Todo from '@/app/data/todoData';

export async function GET(request: NextRequest) {
  try {
    const todos = await Todo.find();
    return NextResponse.json(
      { todos },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await Todo.addNew(body);
    return NextResponse.json({ message: 'Todo was created' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}