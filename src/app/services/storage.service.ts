import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create()
    this._storage = storage
  }

  // Add a key-value pair
  public async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value)
  }

  // Get the value associated with a key
  public async get(key: string): Promise<any> {
    return await this._storage?.get(key)
  }

  // Remove a key-value pair
  public async remove(key: string): Promise<void> {
    await this._storage?.remove(key)
  }

  // Clear all key-value pairs
  public async clear(): Promise<void> {
    await this._storage?.clear()
  }

  // Update a key-value pair
  public async update(key: string, value: any): Promise<void> {
    await this.set(key, value)
  }
}
