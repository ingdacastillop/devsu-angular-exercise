import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRepository } from './domain/repositories';
import { RemoteProductRepository } from './infrastructure/repositories';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: ProductRepository,
      useClass: RemoteProductRepository
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
