const skillType = Object.freeze({
    "electrician" : 0,
    "carpenter": 1,
    "computer_repair": 2
})

const dimensions = {
    hud_bar : {width: 1, height: 0.1},
    office_space: {width: 1, height: .75},
    repair_men_bar: {width: 1, height: 0.15}
}

export {skillType, dimensions};