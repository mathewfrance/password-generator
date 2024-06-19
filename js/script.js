const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberkCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector('#security-indicator-bar')
let passwordLength = 16

// Generates a random password, default range is sixteen
function generatePassword(){
    let chars = "abcdefghijklmnopqrstuvwxyz"
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numberChars = "0123456789"
    const symbolChars = "!@#$%^&*()-_=+[]{}'/<>?"
    if(upperCaseCheckEl.checked){
        chars += upperCaseChars
    }

    if(numberkCheckEl.checked){
        chars += numberChars
    }

    if(symbolCheckEl.checked){
        chars += symbolChars
    }
    
    let password = "";

    for (let i = 0; i < passwordLength; i++){
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber , randomNumber + 1)
    }
    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    // 20 - > critcal => 100 safe
    //64 / 64 = 1 => 100%
    // A*P1 + B*P2 + C*P3 + D*P4 = 100
    // T*0.25 + M*0.15 + N*0.25 + S*0.35 = 100
    // 25 + 15 + 25 + 35 = 100%
    const percent = Math.round((passwordLength / 64) * 100 * 0.25) + (upperCaseCheckEl.checked ? 15 : 0) + (numberkCheckEl.checked ? 25 : 0) + (symbolCheckEl.checked ? 35 : 0)
    securityIndicatorBarEl.style.width = `${percent}%`
    if(percent > 69){
        //safe
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    }else if (percent > 50){
        //warning
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.add('warning')
    }else {
        //critical 
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.remove('warning')
    }
    if(percent >= 100){
        securityIndicatorBarEl.classList.add('completed')
    }else{
        securityIndicatorBarEl.classList.remove('completed')
    }   
}

function calculateFontSize(){
    if(passwordLength > 45){
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')
    }else if(passwordLength > 32){
        inputEl.classList.remove('font-sm')
        inputEl.classList.add('font-xs')
        inputEl.classList.remove('font-xxs')

    }else if(passwordLength > 22){
        inputEl.classList.add('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')

    }else{
    }
}

// Copy the password generated
function copyPassword(){
    navigator.clipboard.writeText(inputEl.value)
}

// Change the range of the password and reload password generated
function passwordRangeReload(){
    const passwordLengthEl = document.querySelector("#password-length")
    passwordLengthEl.addEventListener("input", function() {
        passwordLength = passwordLengthEl.value
        document.querySelector('#password-length-text').innerText = passwordLength
        generatePassword()
    })
    upperCaseCheckEl.addEventListener('click', generatePassword)
    numberkCheckEl.addEventListener('click', generatePassword)
    symbolCheckEl.addEventListener('click', generatePassword)
    document.querySelector("#renew").addEventListener('click', generatePassword)

}

// Execute the action of copy the password to paste
function copyAction(){
    document.querySelector("#copy1").addEventListener('click', copyPassword)
    document.querySelector("#copy2").addEventListener('click', copyPassword)
}

generatePassword()
passwordRangeReload()
copyAction()

