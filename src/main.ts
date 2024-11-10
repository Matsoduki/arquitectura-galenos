import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes'; // Asegúrate de que este archivo esté correctamente configurado
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Inicializa la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyByJAk8uT2BCASM1GZ23JHqN6jwpyfbMbg",
      authDomain: "arquitecturagalenos.firebaseapp.com",
      projectId: "arquitecturagalenos",
      storageBucket: "arquitecturagalenos.appspot.com",
      messagingSenderId: "596055097301",
      appId: "1:596055097301:web:5daca894ad71849f30475c"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
});