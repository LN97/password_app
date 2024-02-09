export function generateStrongPassword(length = 20 ) {
    console.log( 'Length passd' , length )
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]:;<>,.?~";
    const upper = 'ABCDS'
    const special = '@#$%^'
    const pick = [ upper, special ]
    
    let password = "";
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    console.log(password);
    return password;
}

export function checkPasswordStrength(password) {
    // Define criteria
    const minLength = 8; // Minimum length requirement
  
    // Helper functions to check individual criteria
    function hasUppercase() {
        return /[A-Z]/.test(password);
    }
  
    function hasLowercase() {
        return /[a-z]/.test(password);
    }
  
    function hasNumbers() {
        return /\d/.test(password);
    }
  
    function hasSpecialChars() {
        return /[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password);
    }
  
    function hasCommonWords() {
        return /(password|123456|qwerty)/i.test(password);
    }
  
    // Calculate strength score based on criteria met
    function calculateStrengthScore() {
        let strength = 0;
  
        if (password.length >= minLength) {
            strength += 1;
        }
  
        if (hasUppercase()) {
            strength += 1;
        }
  
        if (hasLowercase()) {
            strength += 1;
        }
  
        if (hasNumbers()) {
            strength += 1;
        }
  
        if (hasSpecialChars()) {
            strength += 1;
        }
  
        if (!hasCommonWords()) {
            strength += 1;
        }
  
        return strength;
    }
    return calculateStrengthScore();
}