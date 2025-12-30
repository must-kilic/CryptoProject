    function ResultBox({ result }) {
    if (!result) return null;

    return (
        <div className="mt-4 p-3 bg-gray-100 rounded break-all">
            <strong>Sonuç:</strong>
            <div>{result}</div>
        </div>
    );
}

export default ResultBox;
