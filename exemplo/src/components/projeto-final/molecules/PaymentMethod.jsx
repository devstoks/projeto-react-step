// Molécula: opção de forma de pagamento (radio + ícone + label).
// Só visual — nenhum pagamento é processado de verdade.

const PaymentMethod = ({ value, label, icon, checked, onChange }) => {
    return (
        <label
            className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3.5 transition-colors ${
                checked
                    ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                    : 'border-gray-300 hover:border-blue-400 dark:border-gray-600'
            }`}
        >
            <input
                type="radio"
                name="payment"
                value={value}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 accent-blue-500"
            />
            <span className="text-xl">{icon}</span>
            <span className="font-semibold text-gray-900 dark:text-white">
                {label}
            </span>
        </label>
    );
};

export default PaymentMethod;