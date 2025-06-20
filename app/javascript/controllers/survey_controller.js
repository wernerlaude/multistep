// app/javascript/controllers/survey_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["step", "nextButton", "progressBar", "stepIndicator"]

    connect() {
        this.currentStep = 0
        this.selectedValues = {}
        this.multiSelectValues = {} // Für Schritte mit Mehrfachauswahl
        this.showStep(0)
    }

    showStep(index) {
        this.stepTargets.forEach((el, i) => {
            el.hidden = i !== index
        })

        // Fortschrittsbalken aktualisieren
        const percent = Math.round((index / (this.stepTargets.length - 1)) * 100)
        if (this.hasProgressBarTarget) {
            this.progressBarTarget.style.width = `${percent}%`
        }

        const stepKey = `step${index + 1}`
        const selectedValue = this.selectedValues[stepKey]

        const icons = this.stepTargets[index].querySelectorAll("[data-action]")
        icons.forEach(icon => {
            if (icon.dataset.value === selectedValue) {
                icon.classList.add("selected")
            } else {
                icon.classList.remove("selected")
            }
        })

        const nextButton = this.nextButtonTargets[index]
        if (nextButton) {
            nextButton.disabled = !selectedValue
        }

        if (this.hasStepIndicatorTarget) {
            this.stepIndicatorTarget.textContent = `Frage ${index + 1} von ${this.stepTargets.length}`
        }
    }

    next() {
        const stepKey = `step${this.currentStep + 1}`
        const selected = this.selectedValues[stepKey]

        if (!selected) {
            const nextButton = this.nextButtonTargets[this.currentStep]
            if (nextButton) {
                nextButton.classList.add("shake")
                setTimeout(() => nextButton.classList.remove("shake"), 300)
            }
            return
        }

        this.currentStep += 1
        this.showStep(this.currentStep)

        if (this.currentStep === this.stepTargets.length - 1) {
            // letzte Seite, fülle Hidden Fields
            Object.entries(this.selectedValues).forEach(([key, value]) => {
                const input = document.getElementById(`${key}_input`)
                if (input) input.value = value
            })
        }
    }

    select(event) {
        const stepNumber = this.currentStep + 1
        const stepKey = `step${stepNumber}`
        const code = event.currentTarget.dataset.value
        const label = this.labelMap[stepKey]?.[code] || code

        this.selectedValues[stepKey] = label

        // visuelles Feedback
        const icons = this.stepTargets[this.currentStep].querySelectorAll("[data-action]")
        icons.forEach(el => el.classList.remove("selected"))
        event.currentTarget.classList.add("selected")

        // Button aktivieren
        const nextButton = this.nextButtonTargets[this.currentStep]
        if (nextButton) {
            nextButton.disabled = false
        }
    }

    toggleMulti(event) {
        const stepKey = `step${this.currentStep + 1}`
        const value = event.currentTarget.dataset.value

        // init array wenn leer
        if (!this.multiSelectValues[stepKey]) {
            this.multiSelectValues[stepKey] = []
        }

        const list = this.multiSelectValues[stepKey]
        const index = list.indexOf(value)

        // add/remove
        if (index === -1) {
            list.push(value)
            event.currentTarget.classList.add("selected")
        } else {
            list.splice(index, 1)
            event.currentTarget.classList.remove("selected")
        }

        // Button aktivieren/deaktivieren
        const nextButton = this.nextButtonTargets[this.currentStep]
        if (nextButton) {
            nextButton.disabled = list.length === 0
        }

        // speichere Klartext (für spätere Übergabe im hidden input)
        this.selectedValues[stepKey] = list
            .map(v => this.labelMap[stepKey]?.[v] || v)
            .join(", ")
    }
    back() {
        if (this.currentStep > 0) {
            this.currentStep -= 1
            this.showStep(this.currentStep)
        }
    }
    labelMap = {
        step1: {
            gesundheitspraxis: "Gesundheitspraxis",
            buero: "Bürodienstleistung",
            gastro: "Gastronomie",
            handwerk: "Handwerksbetrieb",
            beratung: "Coaching/Seminare",
            handel: "Handel",
            wellness: "Wellness",
            immobilien: "Immobilien",
            dienst: "Dienstleistungen",
            kreativ: "Kreativwirtschaft",
            bildung: "Bildung & Unterricht",
            event: "Events & Veranstaltungen",
            tiere: "Tiere & Tierpflege",
            andere: "Andere"
        },
        step2: {
            unternehmen: "Unternehmensdarstellung",
            leads: "Kunden gewinnen / Leads",
            shop: "Online-Shop",
            portfolio: "Portfolio / Referenzen",
            buchung: "Online-Buchungen",
            blog: "Blog / Content"
        },
        step3: {
            b2b: "Geschäftskunden (B2B)",
            b2c: "Privatkunden (B2C)",
            lokal: "Lokale Kunden",
            national: "Deutschlandweit",
            international: "International"
        },
        step4: {
            neu: "Komplett neue Website",
            redesign: "Bestehende Website überarbeiten",
            update: "Kleinere Anpassungen"
        },
        step5: {
            unter1000: "Unter 1.000€",
            range_1000_3000: "1.000€ – 3.000€",
            range_3000_7000: "3.000€ – 7.000€",
            range_7000_15000: "7.000€ – 15.000€",
            ueber15000: "Über 15.000€"
        },
        step6: {
            seo: "Suchmaschinen-Optimierung",
            kontakt: "Kontaktformular",
            buchung: "Online-Buchung",
            shop: "Online-Shop",
            blog: "Blog / News",
            mehrsprachig: "Mehrsprachig"
        }
    }
}
