const HumanLanguageFluencyThresholds = {
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

const ComputerLanguageFluencyThresholds = {
    100: "expert",
    75:  "proficient",
    50:  "intermediate",
    25:  "basic"
}

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
    let progressBars = document.getElementsByClassName("lang-progress-bar")

    Array.from(progressBars).forEach((progressBar) => {
	let progressLevel = progressBar.dataset.progressLevel
	let progressBarContainer = progressBar.parentElement;
	progressBarContainer.addEventListener("click", langClickHandler);
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


window.addEventListener("load", docLoadHandler)

