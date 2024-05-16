import React from 'react';


interface NavbarProps {
    categories: string[];
    setActiveCategory: (category: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ categories, setActiveCategory }) => {
    return (
        <nav className="p-4">
            <ul className="flex space-x-4">
                <li
                    className="cursor-pointer"
                    onClick={() => setActiveCategory('All')}
                >
                    All
                </li>
                {categories.map(category => (
                    <li
                        key={category}
                        className="cursor-pointer"
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;