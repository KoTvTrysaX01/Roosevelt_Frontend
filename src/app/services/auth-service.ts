import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<UserInterface | null>(null)
}
