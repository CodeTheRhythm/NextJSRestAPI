import { NextRequest, NextResponse } from 'next/server';
import Todo from '@/app/data/todoData';

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const todo = await Todo.findById(id);
    return NextResponse.json(
      { todo },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: any) {
  try {
    const id = context.params.id;
    const body = await request.json();
    await Todo.update(id, body);
    return NextResponse.json(
      { message: `Todo ${id} was updated` },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: any) {
  try {
    const id = context.params.id;
    await Todo.remove(id);
    return NextResponse.json(
      { message: `Todo ${id} was deleted` },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}