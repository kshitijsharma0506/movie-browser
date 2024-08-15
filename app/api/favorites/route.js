import { NextResponse } from 'next/server'

// Note: In a real application, you'd typically use a database here
let favorites = []

export async function GET() {
  return NextResponse.json(favorites)
}

export async function POST(request) {
  const { movieId } = await request.json()
  
  if (!favorites.includes(movieId)) {
    favorites.push(movieId)
  }

  return NextResponse.json(favorites)
}

export async function DELETE(request) {
  const { movieId } = await request.json()
  
  favorites = favorites.filter(id => id !== movieId)

  return NextResponse.json(favorites)
}