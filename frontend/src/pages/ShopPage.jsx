import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { shopItems } from '../data/shopData';

export default function ShopPage() {
    const navigate = useNavigate();
    const { diamonds, purchaseItem, hasItem } = useGame();
    const [message, setMessage] = useState(null);
    const [purchasedItemId, setPurchasedItemId] = useState(null);

    const handlePurchase = (item) => {
        const result = purchaseItem(item);

        setMessage({
            text: result.message,
            type: result.success ? 'success' : 'error'
        });

        if (result.success) {
            setPurchasedItemId(item.id);
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
                setMessage(null);
                setPurchasedItemId(null);
            }, 3000);
        } else {
            // Limpiar mensaje de error después de 2 segundos
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        }
    };

    return (
        <div className="vista active">
            <div className="container">
                <div className="shop-container">
                    {/* Header */}
                    <div className="shop-header">
                        <h1>🛒 La Tienda del Psicólogo</h1>
                        <p className="shop-subtitle">Personaliza tu consultorio con objetos únicos</p>
                        <div className="shop-balance">
                            <span className="balance-label">Tu Saldo:</span>
                            <span className="balance-amount">
                                <span className="diamond-icon">💎</span>
                                {diamonds}
                            </span>
                        </div>
                    </div>

                    {/* Mensaje de feedback */}
                    {message && (
                        <div className={`shop-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Grid de productos */}
                    <div className="shop-grid">
                        {shopItems.map(item => {
                            const owned = hasItem(item.id);
                            const canAfford = diamonds >= item.price;
                            const justPurchased = purchasedItemId === item.id;

                            return (
                                <div
                                    key={item.id}
                                    className={`shop-item-card ${owned ? 'owned' : ''} ${justPurchased ? 'just-purchased' : ''}`}
                                >
                                    <div className="shop-item-category">{item.category}</div>
                                    <div className="shop-item-icon">{item.icon}</div>
                                    <h3 className="shop-item-name">{item.name}</h3>
                                    <p className="shop-item-description">{item.description}</p>
                                    <div className="shop-item-footer">
                                        <div className="shop-item-price">
                                            <span className="price-icon">💎</span>
                                            <span className="price-amount">{item.price}</span>
                                        </div>
                                        <button
                                            className={`shop-buy-button ${owned ? 'owned' : ''} ${!canAfford && !owned ? 'insufficient' : ''}`}
                                            onClick={() => handlePurchase(item)}
                                            disabled={owned}
                                        >
                                            {owned ? '✓ Comprado' : canAfford ? 'Comprar' : '🔒 Insuficiente'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Botón de volver */}
                    <div className="shop-actions">
                        <button className="btn-back" onClick={() => navigate('/dashboard')}>
                            ← Volver al Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
