import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { shopCategories } from '../data/shopCategories';
import ShopItemCard from '../components/ShopItemCard';

export default function ShopPage() {
    const navigate = useNavigate();
    const { diamonds } = useGame();
    const [message, setMessage] = useState(null);

    return (
        <div className="vista active">
            {/* HERO BANNER MÍSTICO - Bazar del Inconsciente */}
            <div className="mystic-hero-banner">
                <div className="mystic-hero-content">
                    {/* Contenido de texto */}
                    <div className="mystic-hero-text">
                        <h1 className="mystic-hero-title">Bazar del Inconsciente</h1>
                        <p className="mystic-hero-subtitle">
                            Objetos únicos de las profundidades de tu mente
                        </p>
                    </div>

                    {/* HUD Flotante - Saldo del usuario (esquina superior derecha) */}
                    <div className="mystic-hud-badge">
                        <span className="hud-diamond-icon">💎</span>
                        <span className="hud-balance">{diamonds}</span>
                    </div>
                </div>
            </div>

            {/* Contenedor principal de la tienda */}
            <div className="container">
                <div className="mystic-shop-container">
                    {/* Mensaje de feedback */}
                    {message && (
                        <div className={`shop-message-v2 ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Iterar sobre categorías */}
                    {shopCategories.map(categoria => (
                        <div key={categoria.id} className="mystic-category-section">
                            {/* Título de categoría */}
                            <h2 className="mystic-category-title">{categoria.titulo}</h2>

                            {/* Grid de items */}
                            <div className="mystic-items-grid">
                                {categoria.items.map(item => (
                                    <ShopItemCard
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Botón para volver al dashboard */}
                    <div className="shop-back-button-container">
                        <button
                            className="mystic-back-button"
                            onClick={() => navigate('/dashboard')}
                        >
                            ← Volver al Consultorio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
