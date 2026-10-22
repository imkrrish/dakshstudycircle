import { create } from "zustand"

// Add new dialogs (e.g. "book-demo") to this union.
type DialogName = "contact"

type DialogState = {
  activeDialog: DialogName | null
  // Kept after close so the dialog can restore focus while it animates out.
  returnFocusTo: HTMLElement | null
  openDialog: (name: DialogName, returnFocusTo?: HTMLElement) => void
  closeDialog: () => void
}

const useDialogStore = create<DialogState>()((set) => ({
  activeDialog: null,
  returnFocusTo: null,
  openDialog: (name, returnFocusTo) =>
    set({ activeDialog: name, returnFocusTo: returnFocusTo ?? null }),
  closeDialog: () => set({ activeDialog: null }),
}))

export { useDialogStore }
export type { DialogName }
