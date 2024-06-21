import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatChip, MatChipListbox, MatChipOption, MatChipSelectionChange } from '@angular/material/chips';
import { Category } from '../../models/category.interface';
import { CategoriesService } from '../../services/categories/categories.service';
import { Search } from '../../models/search.class';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    MatInput,
    MatIcon,
    MatLabel,
    MatFormField,
    MatSuffix,
    FormsModule,
    MatChipOption,
    MatChipListbox,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent { 
  search: Search = new Search();
  categories: Category[] = [];

  @Output() searchEvent: EventEmitter<Search> = new EventEmitter<Search>();
  @Output() categoryEvent: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(
    private categoryService: CategoriesService
  ){ 
  }

  ngOnInit(){
    this.categories = this.categoryService.getAll();
    this.search.searchText = '';
    this.search.category = this.categories[0];
  }

  Pesquisar(): void {
    if(this.search.searchText === '')
      return;
    this.searchEvent.emit(this.search);
    this.Clear();
  }

  Clear() {
    this.search.searchText = '';
  }

  ChangeCategory(event: MatChipSelectionChange, item: Category, index: number) {
    item.selected = event.selected;
    this.search.category = this.categories[index] = item;
    this.categoryEvent.emit(this.search.category);
  }
}
