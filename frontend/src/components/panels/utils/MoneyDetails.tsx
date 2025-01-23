import { FC } from "react"

interface MoneyDetailsProps {
  text: string,
  amount: number,
}

const MoneyDetails: FC<MoneyDetailsProps> = ({ text, amount }) => {
  return (
    <div className="flex justify-between items-center py-[10px] p-4 bg-zinc-700 rounded-lg shadow-md">
      <p className="text-white text-lg font-semibold">{text}:</p>
      <p className="text-green-500 text-lg font-bold">{amount.toFixed(2)}</p>
    </div>
  )
}

export default MoneyDetails
