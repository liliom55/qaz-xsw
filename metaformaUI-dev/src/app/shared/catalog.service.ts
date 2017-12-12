import { Injectable } from '@angular/core';
import { DataService } from "app/shared/data.service";

@Injectable()
export class CatalogService {

    constructor() {
    }

    mapProductsToCategories(products: Array<any>, categories: Array<any>) {
        categories.forEach(category => {
            products.forEach(product => {
                if (category.name.toUpperCase() === product.type.toUpperCase()) {
                    if (!category.products)
                        category.products = new Array<any>();
                    product.bodyPart = category.bodyPart;
                    product.layer = category.layer;
                    category.products.push(product);
                }
            });
        });
        return categories;
    }

    selectedCategoryProducts(categoryName: string) {
        //return this.categories.find(category => {
          //  return category.name == categoryName;
        //});
    }
}