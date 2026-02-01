export const mockRegister = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "exists@mail.com") {
        reject({ message: "User already exists" })
      } else {
        resolve({
          success: true,
          message: "Registration successful",
          user: data
        })
      }
    }, 1200)
  })
}

export const mockLogin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "test@mail.com" && data.password === "123456") {
        resolve({
          success: true,
          token: "fake-jwt-token",
          user: { email: data.email }
        })
      } else {
        reject({ message: "Invalid credentials" })
      }
    }, 1200)
  })
}
