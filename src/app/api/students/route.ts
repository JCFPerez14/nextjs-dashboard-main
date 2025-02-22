import { NextResponse } from 'next/server';
import prismaClient from '@/lib/db';

export async function GET() {
  const students = await prismaClient.students.findMany({
    select: {
      id: true,
      student_name: true,
    },
  });
  return NextResponse.json(students);
}
