import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  
    // jwt = untuk bikin token
    // tokennya berisi _id dari usernya
    //expiresIn = tokennya expired stlh berapa lama
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

  // Set JWT as an HTTP-Only Cookie
  //maxAge = durasi simpen cookienya
  //httponly = ini untuk mencegah dari sisi klien
  // mengakses datanya (misal memanipulasi cookie)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;