export function ManualAESPanel({ steps }) {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="bg-gray-900 text-white p-6 rounded-2xl mt-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-5 text-yellow-300">
                🧠 Manuel AES Adımları
            </h3>

            {steps.map((step, index) => (
                <div key={index} className="mb-8">
                    <p className="text-lg font-semibold text-blue-300 mb-4">
                        {step.title}
                    </p>

                    <table className="border-collapse">
                        <tbody>
                            {transpose(step.matrix).map((row, r) => (
                                <tr key={r}>
                                    {row.map((value, c) => (
                                        <td
                                            key={c}
                                            className="
                                                w-12 h-12
                                                border border-gray-700
                                                bg-gray-800
                                                text-center
                                                font-mono text-sm
                                            "
                                        >
                                            {value
                                                .toString(16)
                                                .padStart(2, "0")
                                                .toUpperCase()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

function transpose(matrix) {
    return matrix[0].map((_, colIndex) =>
        matrix.map(row => row[colIndex])
    );
}
