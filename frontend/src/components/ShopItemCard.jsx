import { useGame } from '../context/GameContext';

export default function ShopItemCard({ item }) {
    const { diamonds, purchaseItem, hasItem } = useGame();

    const owned = hasItem(item.id);
    const canAfford = diamonds >= item.precio;
    const missingDiamonds = item.precio - diamonds;

    const handlePurchase = () => {
        if (!owned && canAfford) {
            purchaseItem(item);
        }
    };

    return (
        <div className={`mystic-shop-card ${!canAfford && !owned ? 'insufficient' : ''} ${owned ? 'owned' : ''}`}>
            {/* Pill/Etiqueta de tipo (arriba) */}
            <div className="shop-item-type-pill-mystic">
                {item.tipo}
            </div>

            {/* Imagen del icono 3D - con filtro grayscale si no puede comprar */}
            <div className={`shop-item-icon-mystic ${!canAfford && !owned ? 'grayscale' : ''}`}>
                {item.img}
            </div>

            {/* Título del producto */}
            <h3 className={`shop-item-title-mystic ${!canAfford && !owned ? 'dimmed' : ''}`}>
                {item.titulo}
            </h3>

            {/* Descripción corta */}
            <p className={`shop-item-description-mystic ${!canAfford && !owned ? 'dimmed' : ''}`}>
                {item.descripcion}
            </p>

            {/* Precio */}
            <div className={`shop-item-price-mystic ${!canAfford && !owned ? 'dimmed' : ''}`}>
                <span className="diamond-icon-mystic">💎</span>
                <span className="price-value-mystic">{item.precio}</span>
            </div>

            {/* Botón de compra con lógica mejorada */}
            <button
                className={`mystic-buy-button ${owned ? 'owned' : canAfford ? 'can-afford' : 'insufficient'
                    }`}
                onClick={handlePurchase}
                disabled={owned || !canAfford}
            >
                {owned
                    ? '✓ Comprado'
                    : canAfford
                        ? 'Comprar'
                        : `Faltan ${missingDiamonds} 💎`
                }
            </button>
        </div>
    );
}
