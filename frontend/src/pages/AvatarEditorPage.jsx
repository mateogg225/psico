import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Scissors, Shirt, Glasses, Palette, Image } from 'lucide-react';

// Mock Data mejorado
const mockItems = {
    body: [
        { id: 1, name: 'Piel Clara', color: '#FFE0BD', locked: false },
        { id: 2, name: 'Piel Media', color: '#F4C49A', locked: false },
        { id: 3, name: 'Piel Oscura', color: '#8D5524', locked: false }
    ],
    hair: [
        { id: 4, name: 'Sin Pelo', icon: '🚫', locked: false },
        { id: 5, name: 'Corto', icon: '✂️', locked: false },
        { id: 6, name: 'Largo', icon: '💇', locked: false },
        { id: 7, name: 'Rizado', icon: '🌀', locked: true },
        { id: 8, name: 'Punk', icon: '⚡', locked: true },
        { id: 9, name: 'Moño', icon: '🎀', locked: true }
    ],
    shirt: [
        { id: 10, name: 'Básica', icon: '👕', color: 'bg-blue-400', locked: false },
        { id: 11, name: 'Polo', icon: '👔', color: 'bg-green-400', locked: false },
        { id: 12, name: 'Hoodie', icon: '🧥', color: 'bg-purple-400', locked: true },
        { id: 13, name: 'Traje', icon: '🤵', color: 'bg-gray-800', locked: true }
    ],
    glasses: [
        { id: 14, name: 'Sin Gafas', icon: '🚫', locked: false },
        { id: 15, name: 'Redondas', icon: '👓', locked: false },
        { id: 16, name: 'De Sol', icon: '🕶️', locked: true },
        { id: 17, name: 'Freud Premium', icon: '👓', locked: true }
    ]
};

const hairColors = ['#000000', '#3D2314', '#8B4513', '#D2691E', '#FFD700', '#FF6347'];
const shirtColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

const tabs = [
    { id: 'body', name: 'Cuerpo', icon: User },
    { id: 'hair', name: 'Pelo', icon: Scissors },
    { id: 'shirt', name: 'Ropa', icon: Shirt },
    { id: 'glasses', name: 'Accesorios', icon: Glasses }
];

export default function AvatarEditorPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('hair');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedItems, setSelectedItems] = useState({
        body: 1,
        hair: 5,
        shirt: 10,
        glasses: 14
    });

    const currentItems = mockItems[activeTab] || [];
    const currentColors = activeTab === 'hair' ? hairColors : activeTab === 'shirt' ? shirtColors : [];

    const handleSelectItem = (item) => {
        if (item.locked) {
            alert('🔒 Este ítem es Premium. ¡Visita la tienda para desbloquearlo!');
            return;
        }

        setSelectedItems({
            ...selectedItems,
            [activeTab]: item.id
        });
    };

    const handleSave = () => {
        localStorage.setItem('avatarSelection', JSON.stringify(selectedItems));
        alert('¡Avatar guardado! 🎉');
        navigate('/dashboard');
    };

    return (
        <div className="h-screen flex flex-col md:flex-row bg-gray-50">
            {/* ZONA 1: EL ESCENARIO DEL AVATAR */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-screen bg-gradient-to-b from-blue-100 to-indigo-50 flex items-center justify-center p-8">
                <div className="text-center">
                    {/* Avatar Placeholder Premium */}
                    <div className="w-72 h-72 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                        {/* Fondo decorativo */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>

                        {/* Icono y texto */}
                        <div className="relative z-10 text-center px-8">
                            <User size={80} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-400 text-sm font-medium">
                                Tu Avatar 3D aparecerá aquí
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Personaliza tu Avatar
                    </h2>
                    <p className="text-gray-500">
                        Selecciona opciones del panel →
                    </p>
                </div>
            </div>

            {/* ZONA 2: PANEL DE CONTROL */}
            <div className="w-full md:w-1/2 h-[60vh] md:h-screen bg-white rounded-t-[40px] md:rounded-l-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex flex-col relative">

                {/* Nivel A: TABS CON ICONOS GRANDES */}
                <div className="border-b border-gray-100">
                    <div className="overflow-x-auto">
                        <div className="flex space-x-8 p-6 min-w-max">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex flex-col items-center gap-2 pb-2 transition-all relative ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        <Icon size={32} strokeWidth={2} />
                                        <span className="text-xs font-semibold uppercase tracking-wide">
                                            {tab.name}
                                        </span>

                                        {/* Línea azul indicadora */}
                                        {isActive && (
                                            <div className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Nivel B: SELECTOR DE COLORES (Estilo Dolltoon) */}
                {currentColors.length > 0 && (
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                            Color
                        </p>
                        <div className="flex space-x-3 overflow-x-auto pb-2">
                            {currentColors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-10 h-10 rounded-full flex-shrink-0 cursor-pointer transition-all ${selectedColor === color
                                            ? 'ring-2 ring-blue-500 ring-offset-2 scale-110'
                                            : 'hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Color ${color}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Nivel C: GRILLA DE ÍTEMS (El Inventario) */}
                <div className="flex-1 overflow-y-auto p-6">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
                        Selecciona tu {tabs.find(t => t.id === activeTab)?.name}
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                        {currentItems.map(item => {
                            const isSelected = selectedItems[activeTab] === item.id;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelectItem(item)}
                                    className={`
                                        aspect-square rounded-2xl cursor-pointer transition-all relative
                                        ${item.color || 'bg-gray-50'}
                                        ${isSelected
                                            ? 'ring-4 ring-blue-500 ring-offset-2 shadow-lg'
                                            : 'hover:bg-gray-100 hover:shadow-md'
                                        }
                                        ${item.locked ? '' : 'hover:scale-105'}
                                    `}
                                    style={item.color && !item.color.startsWith('bg-') ? { backgroundColor: item.color } : {}}
                                >
                                    {/* Overlay de bloqueo */}
                                    {item.locked && (
                                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                                            <div className="text-4xl drop-shadow-lg">🔒</div>
                                        </div>
                                    )}

                                    {/* Contenido del item */}
                                    {item.icon && !item.locked && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-5xl">{item.icon}</span>
                                        </div>
                                    )}

                                    {item.locked && item.icon && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                            <span className="text-5xl grayscale">{item.icon}</span>
                                        </div>
                                    )}

                                    {/* Nombre del item */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl p-2">
                                        <p className="text-white text-xs font-medium text-center truncate">
                                            {item.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {currentItems.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <Image size={48} className="mx-auto mb-3 opacity-50" />
                            <p>No hay ítems en esta categoría</p>
                        </div>
                    )}
                </div>

                {/* BOTÓN DE GUARDAR (Sticky Bottom) */}
                <div className="border-t border-gray-100 p-6 bg-white">
                    <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        <span className="text-xl">💾</span>
                        <span>Guardar Cambios</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
