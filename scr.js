    /* variáveis */
    let passwordLength = 8

    const inputEl = document.querySelector("#password")
    const copyButton1 = document.querySelector("#copy-1")
    const reloadEl = document.querySelector("#reload")
    const passwordLengthEl = document.querySelector("#password-length")
    const upperCaseEl = document.querySelector("#uppercase-check")
    const numberCaseEl = document.querySelector("#number-check")
    const symbolCaseEl = document.querySelector("#symbol-check")
    const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")
    
    /* gerador de senha */
    function generatePassword() {

        let chars = "abcdefghjklmnpqrstuvwxyz"

        const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
       
        const numberCaseChars = "123456789"

        const symbolCaseChars = "?!@&*()[]"
        
        if (upperCaseEl.checked) {
            chars += upperCaseChars

        }
        if (numberCaseEl.checked) {
            chars += numberCaseChars

        }

        if (symbolCaseEl.checked) {
            chars += symbolCaseChars
        }
        

        let password = ""

        for (let i = 0; i < passwordLength; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length)
            password += chars.substring(randomNumber, randomNumber + 1)
        }

        inputEl.value = password

        calculateQuality()
    }

    /* barra de segurança */
    function calculateQuality () {

        const percent = Math.round(
            (passwordLength / 20) * 25 + 
            (upperCaseEl.checked ? 25 : 0) + 
            (numberCaseEl.checked ? 25 : 0) +
            (symbolCaseEl.checked ? 25 : 0)
            )
        
        securityIndicatorBarEl.style.width = `${percent}%`

        if (percent > 69) {   
          /* safe */
            securityIndicatorBarEl.classList.remove("critical")
            securityIndicatorBarEl.classList.add("safe")
            securityIndicatorBarEl.classList.remove("warning")
        } /* warning */
         else if (percent > 49) {
            securityIndicatorBarEl.classList.remove("critical")
            securityIndicatorBarEl.classList.remove("safe")
            securityIndicatorBarEl.classList.add("warning")
        } /* critical */
         else {
            securityIndicatorBarEl.classList.add("critical")
            securityIndicatorBarEl.classList.remove("safe")
            securityIndicatorBarEl.classList.remove("warning")
        }

          /* completed */
        if (percent >= 100) {
            securityIndicatorBarEl.classList.add("completed")
        } else {
            securityIndicatorBarEl.classList.remove("completed")
        }
    }

    /* botão de cópia */
    function copy() {
        navigator.clipboard.writeText(inputEl.value)
    }

    /* input do slider */
    passwordLengthEl.addEventListener("input", function() {
        passwordLength = passwordLengthEl.value
        document.querySelector('#password-length-text').innerText = passwordLength
        generatePassword()
    })

    /* botões */
    upperCaseEl.addEventListener("click", generatePassword)
    numberCaseEl.addEventListener("click", generatePassword)
    symbolCaseEl.addEventListener("click", generatePassword)
    copyButton1.addEventListener("click", copy)
    reloadEl.addEventListener("click", generatePassword)


    generatePassword()