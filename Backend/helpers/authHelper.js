import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    try {
        const saltRouter = 10;
        const hashedPassword = await bcrypt.hash(password, saltRouter)
        return hashedPassword
    } catch (error) {
        console.error(error)
    }
}

export const comparePassword = async (password, hashedPassword) => { 
    try {
        return bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.error(error)
    }
}