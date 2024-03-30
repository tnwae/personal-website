const HumanLanguageFluencyThresholds_fr = {
    100: "natif",
    95:  "courant",
    90:  "courant",
    85:  "courant",
    80:  "avancé",
    75:  "avancé",
    70:  "avancé",
    65:  "à l'aise",
    60:  "à l'aise",
    55:  "à l'aise",
    50:  "à l'aise",
    45:  "à l'aise",
    40:  "à l'aise",
    35:  "débutant",
    30:  "débutant",
    25:  "débutant",
    20:  "débutant",
    15:  "débutant",
    10:  "basique",
    5:   "basique"
}

const HumanLanguageFluencyThresholds_en = {
    100: "native",
    95:  "fluent",
    90:  "fluent",
    85:  "fluent",
    80:  "advanced",
    75:  "advanced",
    70:  "advanced",
    65:  "intermediate",
    60:  "intermediate",
    55:  "intermediate",
    50:  "intermediate",
    45:  "intermediate",
    40:  "intermediate",
    35:  "beginner",
    30:  "beginner",
    25:  "beginner",
    20:  "beginner",
    15:  "beginner",
    10:  "basic",
    5:   "basic"
}

const ComputerLanguageFluencyThresholds_en = {
    100: "expert",
    75:  "proficient",
    50:  "intermediate",
    25:  "basic"
}

const ComputerLanguageFluencyThresholds_fr = {
    100: "expert",
    75:  "compétent",
    50:  "à l'aise",
    25:  "débutant"
}

const sections = document.querySelectorAll("section")
const menuNav = document.querySelectorAll(".site-nav menu li")
const headerHeight = document.getElementById("site-header").getBoundingClientRect().height + 30

let langClickHandler = (event) => {
    let here = event.currentTarget
    let explanation = here.getElementsByClassName("explanation")[0]

    if(explanation.style.height === "0px" || !explanation.style.height) {
		explanation.style.height = `${explanation.scrollHeight}px`
		explanation.offsetHeight
		explanation.addEventListener("transitionend", function handler() {
			explanation.style.height = "auto"
			explanation.removeEventListener("transitionend", handler)
		})
    } else {
		explanation.style.height = `${explanation.scrollHeight}px`
		explanation.offsetHeight
		explanation.style.height = "0"
    }
}

let docLoadHandler = (event) => {
	let HumanLanguageFluencyThresholds, ComputerLanguageFluencyThresholds
	
	switch(document.documentElement.lang) {
		case "en":
			HumanLanguageFluencyThresholds = HumanLanguageFluencyThresholds_en
			ComputerLanguageFluencyThresholds = ComputerLanguageFluencyThresholds_en
			break
		case "fr":
			HumanLanguageFluencyThresholds = HumanLanguageFluencyThresholds_fr
			ComputerLanguageFluencyThresholds = ComputerLanguageFluencyThresholds_fr
			break
	}
	
    let progressBars = document.getElementsByClassName("lang-progress-bar")
    Array.from(progressBars).forEach((progressBar) => {
		let progressLevel = progressBar.dataset.progressLevel
		let progressBarContainer = progressBar.parentElement
		progressBarContainer.addEventListener("click", langClickHandler)
		let fill = document.createElement("div")
		fill.style.width = `${progressLevel / 1.0}%`
		let caption = document.createElement("p")
		caption.style.zIndex = 2
		caption.innerHTML = HumanLanguageFluencyThresholds[progressLevel]
		fill.appendChild(caption)
		progressBar.appendChild(fill)
    })

    let plProgressBars = document.getElementsByClassName("proglang-progress-bar")
    Array.from(plProgressBars).forEach((progressBar) => {
		let progressLevel = progressBar.dataset.progressLevel
		let progressBarContainer = progressBar.parentElement;
		progressBarContainer.addEventListener("click", langClickHandler);
		let fill = document.createElement("div")
		fill.style.width = `${progressLevel / 1.0}%`
		let caption = document.createElement("p")
		caption.style.zIndex = 2
		caption.innerHTML = ComputerLanguageFluencyThresholds[progressLevel]
		fill.appendChild(caption)
		progressBar.appendChild(fill)
    })
}

let scrollEventHandler = (event) => {
	/* scroll progress bar at very top of page */	
	let windowScroll = document.body.scrollTop || document.documentElement.scrollTop
	let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
	let scrolled = (windowScroll / height) * 100
	document.getElementById("page-progress-bar").style.width = `${scrolled}%`
	
	/* section highlighter */
	let current = ""
	sections.forEach((section) => {
		const sectionTop = section.offsetTop
		if(window.scrollY >= (sectionTop - headerHeight)) {
			current = section.getAttribute("id")
		}
	})
	
	menuNav.forEach((li) => {
		li.classList.remove("active")
		if(li.id == current) {
			li.classList.add("active")
		}
	})
		
}

window.addEventListener("load", docLoadHandler)
window.addEventListener("scroll", scrollEventHandler)
