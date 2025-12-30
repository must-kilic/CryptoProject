function transpose(matrix) {
    return matrix[0].map((_, colIndex) =>
        matrix.map(row => row[colIndex])
    );
} export function ManualAESPanel({ steps }) {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="text-white">
            <h3 className="text-2xl font-bold mb-5 text-yellow-300">
                🧠 Manuel AES Adımları
            </h3>

            {/* YATAY TIMELINE */}
            <div className="flex flex-row flex-nowrap gap-6">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="w-[220px] flex-shrink-0 bg-gray-800 border border-gray-600 rounded-xl p-3"
                    >
                        <p className="text-sm font-semibold text-blue-300 mb-3 text-center">
                            {step.title}
                        </p>

                        <table className="border-collapse mx-auto table-fixed">
                            <tbody>
                                {transpose(step.matrix).map((row, r) => (
                                    <tr key={r}>
                                        {row.map((value, c) => (
                                            <td
                                                key={c}
                                                className="
                                                    w-12 h-12
                                                    border border-gray-700
                                                    bg-black
                                                    text-center
                                                    font-mono text-xs
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
        </div>
    );
}

