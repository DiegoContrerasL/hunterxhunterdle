import { cookies } from "next/headers";

export function getGuessesCookie(): string[] {
  const cookieStore = cookies();
  const dayData = cookieStore.get("dayHxHdle")?.value || "";
  const today = new Date();
  if (dayData == today.toString()) {
    const guessesData = cookieStore.get("guessesHxHdle")?.value || "";
    const guessesArray = guessesData ? guessesData.split("_") : [];
    try {
      return guessesArray; // Ensure it's parsed into an array
    } catch {
      return [];
    }
  } else {
    return [];
  }
}

export function setGuessesCookie(newGuess : string): void {
  const cookieStore = cookies();
  const dayData = cookieStore.get("dayHxHdle")?.value || "";
  const today = new Date();
  if (dayData == today.toString()) {
    const guessesData = cookieStore.get("guessesHxHdle")?.value || "";
    const guessesArray = guessesData ? guessesData.split("_") : [];
    guessesArray.concat(newGuess);
    const newGuessesData = guessesArray.join("_");
    cookieStore.set("guessesHxHdle", newGuessesData);
    return;
  } else {
    cookieStore.set("guessesHxHdle", newGuess);
    cookieStore.set("dayHxHdle", today.toString());
    return;
  }
}