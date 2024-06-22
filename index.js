const minAbilityScore = 8
const maxAbilityScore = 15
const doublePointCost = 13
const maxPoints = 27
const abilityScores = {
    str: {
        score: minAbilityScore,
        element: document.getElementById("str-el"),
        modElement: document.getElementById("str-mod-el")
    },
    dex: {
        score: minAbilityScore,
        element: document.getElementById("dex-el"),
        modElement: document.getElementById("dex-mod-el")
    },
    con: {
        score: minAbilityScore,
        element: document.getElementById("con-el"),
        modElement: document.getElementById("con-mod-el")
    },
    int: {
        score: minAbilityScore,
        element: document.getElementById("int-el"),
        modElement: document.getElementById("int-mod-el")
    },
    wis: {
        score: minAbilityScore,
        element: document.getElementById("wis-el"),
        modElement: document.getElementById("wis-mod-el")
    },
    cha: {
        score: minAbilityScore,
        element: document.getElementById("cha-el"),
        modElement: document.getElementById("cha-mod-el")
    }
}
const addButtons = document.querySelectorAll(".add-btn")
const minusButtons = document.querySelectorAll(".minus-btn")
const pointsEl = document.getElementById("points-el")
const clearBtn = document.getElementById("clear-btn")
let points = maxPoints

addButtons.forEach(button => {
    button.addEventListener("click", function () {
        addScore(this.id.slice(0, 3))
    })
})

minusButtons.forEach(button => {
    button.addEventListener("click", function(){
        reduceScore(this.id.slice(0, 3))
    })
})

clearBtn.addEventListener("click", function () {
    clear()
})

function getModifier(abilityScore) {
    const modifier = Math.floor((abilityScore / 2) - 5)
    if (modifier >= 0) {
        return `(+${modifier})`
    }
    return `(${modifier})`
}

function clear() {
    for (const ability in abilityScores) {
        abilityScores[ability]["score"] = minAbilityScore
        abilityScores[ability]["element"].textContent = minAbilityScore
        abilityScores[ability]["modElement"].textContent = getModifier(minAbilityScore)
    }
    points = maxPoints
    pointsEl.textContent = `Remaining Points: ${points}`
}

function addScore(ability) {
    const abilityScoreObj = abilityScores[ability]
    const pointsToUse = Math.min(points, abilityScoreObj.score >= doublePointCost ? 2 : 1)
    
    if (pointsToUse < 1 || abilityScoreObj.score >= maxAbilityScore) return
    
    points -= pointsToUse
    abilityScoreObj.score += 1
    abilityScoreObj.element.textContent = abilityScoreObj.score
    abilityScoreObj.modElement.textContent = getModifier(abilityScoreObj.score)
    pointsEl.textContent = `Remaining Points: ${points}`
}

function reduceScore(ability) {
    const abilityScoreObj = abilityScores[ability]
    if (abilityScoreObj.score <= minAbilityScore) return
    
    const pointsToUse = abilityScoreObj.score > doublePointCost ? 2 : 1
    points += pointsToUse
    
    abilityScoreObj.score -= 1
    abilityScoreObj.element.textContent = abilityScoreObj.score
    abilityScoreObj.modElement.textContent = getModifier(abilityScoreObj.score)
    pointsEl.textContent = `Remaining Points: ${points}`
}