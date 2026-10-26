import { SignJWT, jwtVerify } from "jose";

// jose ต้องการ secret ในรูปแบบ bytes ไม่ใช่ string ธรรมดา
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// สร้าง token ที่เซ็นแล้ว หมดอายุใน 1 ชั่วโมง
export function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

// คืน payload หาก token ถูกต้อง หากไม่ถูกต้องคืน null
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null; // ไม่มี token, token ถูกแก้ไข หรือหมดอายุ
  }
}