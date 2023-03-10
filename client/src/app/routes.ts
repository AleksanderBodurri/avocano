import { Routes } from "@angular/router";
import { ContactComponent } from "./pages/contact.component";
import { HomeComponent } from "./pages/home.component";
import { NotFoundComponent } from "./pages/not-found.component";
import { ProductListComponent } from "./pages/product-list.component";
import { ProductComponent } from "./pages/product.component";
import { ShippingComponent } from "./pages/shipping.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'product/:id',
        component: ProductComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'shipping',
        component: ShippingComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    }
];