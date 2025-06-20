import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["name", "email", "submit", "nameError", "emailError"]

    validate(event) {
        let valid = true

        if (!this.validateName()) valid = false
        if (!this.validateEmail()) valid = false

        if (!valid) event.preventDefault()
    }

    validateField(event) {
        if (event.target === this.nameTarget) {
            this.validateName()
        } else if (event.target === this.emailTarget) {
            this.validateEmail()
        }
    }

    validateName() {
        const value = this.nameTarget.value.trim()
        const namePattern = /^[A-Za-zÄÖÜäöüß\s\-]+$/

        if (value === "") {
            this.nameTarget.style.border = "2px solid red"
            this.nameErrorTarget.textContent = "Bitte gib deinen Namen ein."
            return false
        } else if (!namePattern.test(value)) {
            this.nameTarget.style.border = "2px solid red"
            this.nameErrorTarget.textContent = "Nur Buchstaben und Leerzeichen erlaubt."
            return false
        } else {
            this.nameTarget.style.border = ""
            this.nameErrorTarget.textContent = ""
            return true
        }
    }

    validateEmail() {
        const email = this.emailTarget.value.trim()
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
        if (!emailPattern.test(email)) {
            this.emailTarget.style.border = "2px solid red"
            this.emailErrorTarget.textContent = "Bitte gib eine gültige E-Mail-Adresse ein."
            return false
        } else {
            this.emailTarget.style.border = ""
            this.emailErrorTarget.textContent = ""
            return true
        }
    }
}
