import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexto de Gamificación
 * Maneja el estado global del sistema de gamificación: diamantes e inventario
 */

// Crear el contexto
const GameContext = createContext();

/**
 * Hook personalizado para usar el contexto de gamificación
 * @throws {Error} Si se usa fuera del GameProvider
 * @returns {Object} Contexto con diamantes, inventario y funciones
 */
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame debe usarse dentro de un GameProvider');
    }
    return context;
};

/**
 * Provider del contexto de gamificación
 * Provee estado global para diamantes e inventario con persistencia en localStorage
 */
export const GameProvider = ({ children }) => {
    // Estado de diamantes (inicia con 50 de regalo)
    const [diamonds, setDiamonds] = useState(() => {
        const saved = localStorage.getItem('userDiamonds');
        return saved ? parseInt(saved) : 50;
    });

    // Estado de inventario (items comprados por el usuario)
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

    /**
     * Agregar diamantes al saldo del usuario
     * @param {number} amount - Cantidad de diamantes a agregar
     */
    const addDiamonds = (amount) => {
        setDiamonds(prev => prev + amount);
    };

    /**
     * Comprar un item de la tienda
     * @param {Object} item - Item a comprar (debe tener id, name, price)
     * @returns {Object} Resultado de la compra {success: boolean, message: string}
     */
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

    /**
     * Verificar si el usuario tiene un item específico
     * @param {string} itemId - ID del item a verificar
     * @returns {boolean} true si el usuario tiene el item
     */
    const hasItem = (itemId) => {
        return inventory.includes(itemId);
    };

    /**
     * Resetear todo el progreso de gamificación (útil para testing)
     */
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
