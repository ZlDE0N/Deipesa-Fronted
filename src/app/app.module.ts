import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

///Angular Material
import { InventarioManaguaComponent } from './components/inventario-managua/inventario-managua.component';
import { GestionMaterialesManaguaComponent } from './components/gestion-materiales-managua/gestion-materiales-managua.component';
import { ProveedoresManaguaComponent } from './components/proveedores-managua/proveedores-managua.component';
import { ContratosManaguaComponent } from './components/contratos-managua/contratos-managua.component';
import { AgendaContactosManaguaComponent } from './components/agenda-contactos-managua/agenda-contactos-managua.component';
import { InventarioChinandegaComponent } from './components/inventario-chinandega/inventario-chinandega.component';
import { GestionMaterialesChinandegaComponent } from './components/gestion-materiales-chinandega/gestion-materiales-chinandega.component';
import { ProveedoresChinandegaComponent } from './components/proveedores-chinandega/proveedores-chinandega.component';
import { ContratosChinandegaComponent } from './components/contratos-chinandega/contratos-chinandega.component';
import { AgendaContactosChinandegaComponent } from './components/agenda-contactos-chinandega/agenda-contactos-chinandega.component';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { PaginatedTableComponent } from './shared/components/paginated-table/paginated-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryEditDialogComponent } from './components/inventory-edit-dialog/inventory-edit-dialog.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ProveedorEditDialogComponent } from './components/proveedor-edit-dialog/proveedor-edit-dialog.component';
import { ContratoEditDialogComponent } from './components/contrato-edit-dialog/contrato-edit-dialog.component';
import { ContactEditDialogComponent } from './components/contact-edit-dialog/contact-edit-dialog.component';
import { TablaProformasComponent } from './components/tabla-proformas/tabla-proformas.component';
import { ProformaEditDialogComponent } from './components/proforma-edit-dialog/proforma-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    InventarioManaguaComponent,
    GestionMaterialesManaguaComponent,
    ProveedoresManaguaComponent,
    ContratosManaguaComponent,
    AgendaContactosManaguaComponent,
    InventarioChinandegaComponent,
    GestionMaterialesChinandegaComponent,
    ProveedoresChinandegaComponent,
    ContratosChinandegaComponent,
    AgendaContactosChinandegaComponent,
    PaginatedTableComponent,
    InventoryEditDialogComponent,
    ConfirmDialogComponent,
    ProveedorEditDialogComponent,
    ContratoEditDialogComponent,
    ContactEditDialogComponent,
    TablaProformasComponent,
    ProformaEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
