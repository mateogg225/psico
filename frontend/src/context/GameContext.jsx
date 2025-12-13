import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const GameContext = createContext();

// Hook personalizado para usar el contexto
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame debe usarse dentro de un GameProvider');
    }
    return context;
};

// Provider del contexto
export const GameProvider = ({ children }) => {
    // Estado de diamantes (inicia con 50 de regalo)
    const [diamonds, setDiamonds] = useState(() => {
        const saved = localStorage.getItem('userDiamonds');
        return saved ? parseInt(saved) : 50;
    });

    // Estado de inventario (items comprados)
    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('userInventory');
        return saved ? JSON.parse(saved) : [];
    });

    // Guardar diamantes en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('userDiamonds', diamonds.toString());
    }, [diamonds]);

    // Guardar inventario en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('userInventory', JSON.stringify(inventory));
    }, [inventory]);

    // Función para agregar diamantes
    const addDiamonds = (amount) => {
        setDiamonds(prev => prev + amount);
    };

    // Función para comprar un item
    const purchaseItem = (item) => {
        // Verificar si tiene suficientes diamantes
        if (diamonds < item.price) {
            return {
                success: false,
                message: 'No tienes suficientes diamantes 💎'
            };
        }

        // Verificar si ya tiene el item
        if (inventory.includes(item.id)) {
            return {
                success: false,
                message: 'Ya tienes este item'
            };
        }

        // Realizar la compra
        setDiamonds(prev => prev - item.price);
        setInventory(prev => [...prev, item.id]);

        return {
            success: true,
            message: `¡${item.name} comprado con éxito! 🎉`
        };
    };

    // Función para verificar si el usuario tiene un item
    const hasItem = (itemId) => {
        return inventory.includes(itemId);
    };

    // Función para resetear todo (útil para testing)
    const resetGame = () => {
        setDiamonds(50);
        setInventory([]);
        localStorage.removeItem('userDiamonds');
        localStorage.removeItem('userInventory');
    };

    const value = {
        diamonds,
        inventory,
        addDiamonds,
        purchaseItem,
        hasItem,
        resetGame
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
