import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  color?: string,
  onClick: () => void
}

export default function Button({ children, color = "bg-blue-500 hover:bg-blue-700", onClick }: Props) {
  return (
    <>
      <button className={`rounded px-4 py-2 text-white ${color}`} onClick={onClick}>
        {children}
      </button>
    </>
  );
}