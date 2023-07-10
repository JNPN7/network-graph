import { useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface Props {
  x: number;
  y: number;
  closeContextMenu: () => void;
  deleteNode: () => void;
}

export default function ContextMenu({ x, y, closeContextMenu, deleteNode}: Props) {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(contextMenuRef, closeContextMenu);

  const handleClick =  () => {
    deleteNode()
    closeContextMenu()
  }

  return (
    <>
      <div
        ref={contextMenuRef}
        className="absolute z-20 bg-white"
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        <div className="max-w-sm rounded overflow-hidden shadow-[0px_0px_20px_rgba(0,0,0,0.4)]">
          <div className="px-3 py-2">
            <button className="hover:text-red-600" onClick={handleClick}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}
