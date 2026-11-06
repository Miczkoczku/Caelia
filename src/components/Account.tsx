import { UserRound } from "lucide-react";

export function Account() {
  return (
    <button
      type="button"
      aria-label="Konto użytkownika"
      title="Konto użytkownika — wkrótce"
      className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-800/95 text-white shadow-[0_6px_18px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors hover:bg-slate-700/95"
      onClick={() => {}}
    >
      <UserRound size={20} />
    </button>
  );
}
