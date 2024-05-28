import {createJSONStorage, persist} from "zustand/middleware";
import {create} from "zustand";
import {generateMnemonic, mnemonicToKeyPair} from "tonweb-mnemonic";

export interface IMnemonics {
  mnemonics: {
    mnemonic: string;
    pubKey: string;
    notes: string;
  }[]
  actions: {
    addMnemonic: () => Promise<void>;
    updateNote: (mnemonic: string, note: string) => void;
  }
}

const initialState: Omit<IMnemonics, 'actions'> = {
  mnemonics: [],
};

export const useMnemonicsStore = create(
  persist<IMnemonics>(
    (set, getState) => ({
      ...initialState,
      actions: {
        addMnemonic: async () => {
          const mnemonic = await generateMnemonic();
          const keyPair = await mnemonicToKeyPair(mnemonic);
          const newNote = { mnemonic: mnemonic.join(' '), pubKey: keyPair.publicKey.toString(), notes: '' };
          set((state) => ({ ...state, mnemonics: [...state.mnemonics, newNote] }));
        },
        updateNote: (mnemonic, note) => {
          set((state) => ({
            ...state,
            mnemonics: state.mnemonics.map((m) => {
              if (m.mnemonic === mnemonic) {
                return { ...m, notes: note };
              }
              return m;
            }),
          }));
        }
      },
    }),
    {
      name: 'mnemonics',
      partialize: ({ mnemonics }) => ({ mnemonics } as IMnemonics),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
