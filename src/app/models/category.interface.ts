import { ThemePalette } from "@angular/material/core";

export interface Category {
    id: number;
    Nome: string;
    selected: boolean;
    color: ThemePalette;
}