import { useCallback, useState } from "react";

function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((state) => !state), []);
  const setOpen = useCallback((state: boolean) => setIsOpen(state), []);

  return { isOpen, onOpen: open, onClose: close, onToggle: toggle, setOpen };
}

export default useDisclosure;
