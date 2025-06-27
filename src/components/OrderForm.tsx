export default function OrderForm() {
    return (
        <div className="w-full flex justify-center">
            <form className="w-[370px] md:w-[700px] bg-white rounded-2xl flex gap-6 p-6">
                <div className="w-1/2 flex items-center justify-end">
                    <label className="mr-1">Quantity</label>
                    <button className="py-1 px-2 bg-gray-300 text-custom-dark-brown border border-gray-400 rounded-md hover:bg-gray-200">+</button>
                    <input className="w-[30px] px-2" value="0" />
                    <button className="py-1 px-2 bg-gray-300 text-custom-dark-brown border border-gray-400 rounded-md hover:bg-gray-200">-</button>
                </div>
                <div className="w-1/2 flex items-center">
                    <button className="px-3 py-1 lg:px-6 h-fit bg-custom-brown-1 border-custom-dark-brown text-custom-yellow-1 rounded-3xl hover:bg-custom-yellow-2">Order</button>
                </div>
            </form>
        </div>
    )
}