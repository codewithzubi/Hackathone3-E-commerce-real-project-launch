import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return verified.payload
  } catch (err) {
    throw new Error("Invalid token")
    console.log(err)
  }


}


export async function getUser(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token) {
    return null
  }

  try {
    const payload = await verifyAuth(token)
    return payload
  } catch {
    return null
  }
}

