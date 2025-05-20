import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public getItem<T = unknown>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  public setItem<T = unknown>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
