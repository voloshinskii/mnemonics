'use client';
import { useMnemonicsStore } from "@/app/store";

export default function Home() {
  const { mnemonics, actions } = useMnemonicsStore();
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      {mnemonics.map(mnemonic => (
        <div key={mnemonic.mnemonic} className="bg-white flex font-sans">
          <div className="flex flex-col flex-auto p-6 gap-4">
            <div className="flex flex-wrap">
              <div className="flex-auto text-lg font-semibold text-slate-900">
                {mnemonic.mnemonic}
              </div>
            </div>
            <input
              value={mnemonic.notes}
              onInput={(e) => actions.updateNote(mnemonic.mnemonic, e.currentTarget.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="notes" type="text" placeholder="Notes" />
          </div>
        </div>
      ))}
      <div className="flex space-x-4 mb-6 text-sm font-medium">
        <button onClick={actions.addMnemonic} className="bg-white h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button">
          Add mnemonic
        </button>
      </div>

    </main>
  );
}
