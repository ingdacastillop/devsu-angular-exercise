import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRepository } from './domain/repositories';
import { RemoteProductRepository } from './infrastructure/repositories';
import { AuthorIdInterceptor } from './utils/author-id.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: ProductRepository,
      useClass: RemoteProductRepository
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorIdInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
