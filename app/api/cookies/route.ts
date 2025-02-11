import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const dayData = cookieStore.get("dayHxHdle")?.value || "";
  const today = new Date().toDateString();
  if (dayData == today) {
    const guessesData = cookieStore.get("guessesHxHdle")?.value || "";
    return NextResponse.json({ guesses: guessesData ? guessesData.split("_") : [] });
  } else {
    return NextResponse.json({ guesses: [] });
  }
}

export async function POST(req: Request) {
  const { newGuess } = await req.json();
  const cookieStore = cookies();
  const dayData = cookieStore.get("dayHxHdle")?.value || "";
  const today = new Date().toDateString();

  if (dayData === today) {
    const guessesData = cookieStore.get("guessesHxHdle")?.value || "";
    const guessesArray = guessesData ? guessesData.split("_") : [];
    guessesArray.push(newGuess);
    const newGuessesData = guessesArray.join("_");

    cookieStore.set("guessesHxHdle", newGuessesData);
  } else {
    cookieStore.set("guessesHxHdle", newGuess);
    cookieStore.set("dayHxHdle", today);
  }

  return NextResponse.json({ success: true });
}
