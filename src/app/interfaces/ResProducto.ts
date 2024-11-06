import {Producto} from './Producto';

export interface ResProducto{
    products: Producto[],
    total: number,
    skip: number,
    limit: number,

}