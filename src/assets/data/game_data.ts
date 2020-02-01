const skillType = Object.freeze({
    "electrician" : 0,
    "carpenter": 1,
    "computer_repair": 2
})

const dimensions = {
    hud_bar : {width: window.innerWidth, height: 200},
    office_space: {width: window.innerWidth, height: window.innerHeight - 400},
    repair_men_bar: {width: window.innerWidth, height: 200}
}

export {skillType, dimensions};