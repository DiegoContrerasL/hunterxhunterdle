import Cookies from "js-cookie";
import { NextResponse } from "next/server";

export async function GET() {
  const dayData = Cookies.get("dayHxHdle") || "";
  const today = new Date().toDateString();
  if (dayData == today) {
    const guessesData = Cookies.get("guessesHxHdle") || "";
    return NextResponse.json({ guesses: guessesData ? guessesData.split("_") : [] });
  } else {
    return NextResponse.json({ guesses: [] });
  }
}

export async function POST(req: Request) {
  const { newGuess } = await req.json();
  const dayData = Cookies.get("dayHxHdle") || "";
  const today = new Date().toDateString();

  if (dayData === today) {
    const guessesData = Cookies.get("guessesHxHdle") || "";
    const guessesArray = guessesData ? guessesData.split("_") : [];
    guessesArray.push(newGuess);
    const newGuessesData = guessesArray.join("_");

    Cookies.set("guessesHxHdle", newGuessesData, { expires: 1 });
  } else {
    Cookies.set("guessesHxHdle", newGuess, { expires: 1 });
    Cookies.set("dayHxHdle", today, { expires: 1 });
  }

  return NextResponse.json({ success: true });
}
