function ActionButtons({ onEncrypt }) {
    return (
        <button
            onClick={onEncrypt}
            className="w-full bg-blue-600 text-white py-3 rounded"
        >
            🔐 İşlemi Gerçekleştir
        </button>
    );
}

export default ActionButtons;
