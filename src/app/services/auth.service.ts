import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { SHA256, enc } from "crypto-js";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private userDataKey = "user";

  constructor() {
    this.users.push({
      username: "isra",
      password: "12345",
      type: "administrator"
    });
    this.users.push({
      username: "isra2",
      password: "12345",
      type: "administrator"
    });
    
  }

  login(username: string, password:string):boolean {
    const userFound = this.users.find((element) => {
      return element.username === username && element.password === password;
    });
    if (userFound) {
      const encryptedUsername = SHA256(username).toString();
      // Guardar los datos del usuario en el LocalStorage
      const userData = { username: encryptedUsername, /* otros datos del usuario */ };
      localStorage.setItem(this.userDataKey, JSON.stringify(userData));
      return true; // Usuario autenticado
    } else {
      return false; // Autenticación fallida
    }
  }

  isAuthenticated(): boolean {
    const userData = localStorage.getItem(this.userDataKey);

    if (userData) {
      // Parse y utiliza los datos del usuario para la autenticación automática
      // userData contiene los datos del usuario en formato JSON.
      // Inicia sesión automáticamente si los datos son válidos.
      return true; // Autenticación automática exitosa
    } else {
      return false; // No hay datos de usuario en el LocalStorage
    }
  }

  getDecryptedUsername(): string {
    const encryptedUsername = localStorage.getItem(this.userDataKey);

    if (encryptedUsername) {
      // Decifra el nombre de usuario
      const decryptedUsername = enc.Utf8.stringify(SHA256(encryptedUsername));
      return JSON.parse(decryptedUsername).username;
    }

    return ""; // No se encontró un nombre de usuario cifrado
  }

  logout() {
    localStorage.removeItem(this.userDataKey);
    // Otros pasos de cierre de sesión si es necesario
  }
}
