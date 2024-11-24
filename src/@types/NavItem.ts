import { LucideIcon } from 'lucide-react';

export interface DropdownItem {
    name: string; // Nome do item no menu dropdown
    icon?: LucideIcon; // Ícone exibido ao lado do nome
    onClick: (event?: React.MouseEvent) => void; // Ação ao clicar no item
}

export interface NavSubItem {
    name: string; // Nome do subitem
    url: string; // URL do subitem
    dropdownMenuItems?: DropdownItem[]; // Itens adicionais no dropdown
}

export interface NavItem {
    name: string; // Nome principal do item
    url: string; // URL principal
    icon?: LucideIcon; // Ícone exibido no menu
    isActive?: boolean; // Indica se o item está ativo
    items?: NavSubItem[]; // Subitens aninhados
}
