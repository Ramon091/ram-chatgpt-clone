import type { CHAT } from "@/server/api/types";
import { useLocalStorage } from "@vueuse/core";

export const CHATS = useLocalStorage<CHAT[]>("CHATS", [
  { role: "system", content: "This is a content" },
]);