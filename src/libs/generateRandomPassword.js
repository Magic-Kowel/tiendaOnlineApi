import crypto from "crypto"
// Función para generar una contraseña aleatoria
export const generateRandomPassword = (length) => {
    // Longitud predeterminada de la contraseña si no se proporciona ninguna
    length = length || 12;
    // Caracteres permitidos en la contraseña
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()-_=+';
    let password = '';
    for (let i = 0; i < length; i++) {
        // Generar un índice aleatorio dentro del rango de caracteres permitidos
        const randomIndex = crypto.randomInt(0, charset.length);
        // Agregar el carácter correspondiente al índice aleatorio a la contraseña
        password += charset[randomIndex];
    }
    return password;
}
