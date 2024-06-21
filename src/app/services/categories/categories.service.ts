import { Injectable } from '@angular/core';
import { Category } from '../../models/category.interface';
import { CATEGORIES_LIST } from './categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getAll(): Category[] {
    return CATEGORIES_LIST;
  }
}
