const skillType = Object.freeze({
    "electrician" : 0,
    "carpenter": 1,
    "computer_repair": 2
})


const dimensions = {
    boss_bar : {width: 1, height: 0.1},
    office_space: {width: 1, height: .75},
    repair_men_bar: {width: 1, height: 0.15}
}

const priceList = Object.freeze({
    "electrician" : 10,
    "carpenter": 10,
    "computer_repair": 10
})

const workTime = Object.freeze({
    "electrician" : 10,
    "carpenter": 10,
    "computer_repair": 10
})

const damageTime = Object.freeze({
    "electrician" : 20,
    "carpenter": 20,
    "computer_repair": 20
})

const repairManLimit = 3;

const wave = [
    {
        spawn: 8,
        tornado: 15,
        limit: 50
    }
]

export {skillType, dimensions, priceList, repairManLimit, workTime, damageTime, wave};