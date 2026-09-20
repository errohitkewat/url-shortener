

export const generateShortCode = () => { 
    const mainString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let shortCode = "";

    for (let i = 1; i <= 6; i++) { 
        shortCode += mainString.charAt(Math.floor(Math.random() * 64));
    }

    return shortCode;
}


