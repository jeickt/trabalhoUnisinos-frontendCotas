import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { CursoComponent } from './views/curso/curso.component';

import { CursoService } from './services';
import { CandidatoService } from './services';
import { EventEmitterService } from './services';

import { AppRoutingModule } from './app-routing.module';
import { ChamadaSelecionadaDirective } from './directives/chamada-selecionada.directive';
import { ChamadaInexistenteDirective } from './directives/chamada-inexistente.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CursoComponent,
    ChamadaSelecionadaDirective,
    ChamadaInexistenteDirective,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CursoService, CandidatoService, EventEmitterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
