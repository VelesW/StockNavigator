
const MoneyButtons = () => {
    return (
        <div className="flex w-full justify-between gap-[5px]">
            <button className="bg-blue-500 text-white font-semibold py-[10px] px-[20px] rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out">
                Deposit
            </button>
            <button className="bg-red-500 text-white font-semibold py-[10px] px-[20px] rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out">
                Withdraw
            </button>
        </div>
    )
}

export default MoneyButtons