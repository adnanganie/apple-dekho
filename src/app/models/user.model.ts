export interface User {
  uid: string
  email?: string | null
  emailVerified: boolean
  name?: string | null
  phoneNumber?: string | null
  photoURL?: string | null
  stsTokenManager?: {
    refreshToken: string
    accessToken: string
    expirationTime: number
  }
  createdAt?: string // Assuming this is a timestamp
  lastLoginAt?: string // Assuming this is a timestamp
}
