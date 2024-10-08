//Connect to ChatGPT
//ChatGPT helped me connect this, so I take absolutely no credit for the code to connect it to the ChatGPT API.

document.getElementById('ask-question').addEventListener('click', async function () {
    const question = document.getElementById('player-question').value
  
    if (question.trim() === "") {
      alert("Please ask a question.")
      return
    }
  
    const response = await askChatGPT(question)
  
    document.getElementById('chat-response').innerHTML = `<img src="Pictures/Screenshot 2024-10-02 at 3.10.05 AM.png"/> <p>Professor Maple: "${response}"</p>`
  })
  
async function askChatGPT(question) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are Professor Maple, a 20-something-year-old Pokémon Professor who is friendly, bubbly, and always excited to help trainers. You love to reward your students with PokePoints, make silly jokes, give out gold stars and use an exorbitant amount of emojis to express yourself! You only respond in 250 characters or less. This is their first day of their Pokemon journey and you want to be as helpful and encouraging as possible, but you are so excited for them! The trainer has a rival, also a student of yours, named Jeremy, and he is sometimes a snarky jerk! He likes cat pokemon. Today, you gave the Trainer their first pokemon, a dog type, their choice of a Rockruff, Yamper or Lillipup. The Trainer also has 4 gym leaders to defeat, named Ashley, Aisha, Brittany and Tom. Once they defeat the four trainers and Jeremy, they graduate Pokemon Rival school. When they fight the gym leaders, both they and the gym leader will get a random pokemon to fight with. When they fight Jeremy, they use their first pokemon against his.'},
            { role: 'user', content: question }
          ],
          max_tokens: 250,
          temperature: 0.7
        })
      })
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }
  
      const data = await response.json()
      return data.choices[0].message.content.trim()
  
    } catch (error) {
      console.error("Error:", error)
      return "An error occurred."
    }
  }

//Gather HTML elements

const titleScreenElement = document.querySelector(`#titleScreen`)
const optnsContainerElement = document.querySelector(`#optnsContainer`)
const restartButtonElement = document.querySelector(`#restartButton`)
const starterSelectContainerElement = document.querySelector(`#starterSelectContainer`)
const yamperSelectElement = document.querySelector(`#yamperSelect`)
const lillipupSelectElement = document.querySelector(`#lillipupSelect`)
const rockruffSelectElement = document.querySelector(`#rockruffSelect`)
const selectionCongratsElement = document.querySelector(`#selectionCongrats`)
const okCongratsElement = document.querySelector(`#okCongrats`)
const youHaveSelectedElement = document.querySelector(`#youHaveSelected`)
const mainScreenElement = document.querySelector(`#mainScreen`)
const textBoxElement = document.querySelector(`#textBox`)
const nameYourStarterElement = document.querySelector(`#nameYourStarter`)
const nameInputElement = document.querySelector(`#nameInput`)
const fightButtonContainerElement = document.querySelector(`#fightButtonContainer`)
const fightButtonElement = document.querySelector(`#fightButton`)
const fight2ButtonElement = document.querySelector(`#fight2Button`)
const fight3ButtonElement = document.querySelector(`#fight3Button`)
const fight4ButtonElement = document.querySelector(`#fight4Button`)
const fight5ButtonElement = document.querySelector(`#fight5Button`)
const fight6ButtonElement = document.querySelector(`#fight6Button`)
const fightWindowElement = document.querySelector(`#fightWindow`)
const opponentSpriteContainerElement = document.querySelector(`#opponentSpriteContainer`)
const opponentSpriteElement = document.querySelector(`#opponentSprite`)
const opponentStatBlockElement = document.querySelector(`#opponentStatBlock`)
const playerSpriteContainerElement = document.querySelector(`#playerSpriteContainer`)
const playerSpriteElement = document.querySelector(`#playerSprite`)
const playerStatBlockElement = document.querySelector(`#playerStatBlock`)
const playerHPElement = document.querySelector(`#playerHP`)
const opponentHPElement = document.querySelector(`#opponentHP`)
const fightOptnsContainerElement = document.querySelector(`#fightOptnsContainer`)
const attackBtnElement = document.querySelector(`#attackBtn`)
const fleeBtnElement = document.querySelector(`#fleeBtn`)
const volumeSliderElement = document.querySelector(`#volumeSlider`)
const rockruffHighlightElement = document.querySelector(`#rockruffHighlight`)
const lillipupHighlightElement = document.querySelector(`#lillipupHighlight`)
const yamperHighlightElement = document.querySelector(`#yamperHighlight`)
const dialoguePicContainerElement = document.querySelector(`#dialoguePicContainer`)
const dialoguePicElement = document.querySelector(`#dialoguePic`)
const returnButtonContainerElement = document.querySelector(`#returnButtonContainer`)
const returnBtnElement = document.querySelector(`#returnBtn`)
let fighting = false
let randomPlayer = ""
let randomOpponent = ""
let opponentTrainer = ""
let audio
let audio2
let audio3
let audio4

// This is the input for a pokemon that is currently being built
// generatePokemon() fills this in and then it'll get pushed off
// to an object

//Empty Array for all generated Pokemon

let pokemonStorage = []

//Empty Array for Pokemon available to player during fight

let playerPokemon = []

//Empty Array for Pokemon available to opponent during fight

let opponentPokemon = []

//Empty variables for Pokemon generation before pushing to storage

let pokemonName = "Unknown Starter"
let pokemonSpecies = "Unknown Starter"
let pokemonType1 = "normal"
let pokemonType2 = "none"
let pokemonAudio = ""
let pokemonHp = 1
let pokemonAtk = 1
let pokemonDef = 1
let pokemonSpatk = 1
let pokemonSpdef = 1
let pokemonSpd = 1
let pokemonNature = "nondescript"
let pokemonFrontGif = "404 Pokemon Not Found"
let pokemonBackGif = "404 Pokemon Not Found"
let playerOwned = false
let rivalOwned = false
let wildOwned = false

//Empty variables for current fighting player-side Pokemon

let playerName = "Unknown Starter"
let playerType1 = "normal"
let playerType2 = "none"
let playerAudio = ""
let playerHp = 1
let playerCurrentHp = 1
let playerAtk = 1
let playerDef = 1
let playerSpatk = 1
let playerSpdef = 1
let playerSpd = 1
let playerBackGif = "404 Pokemon Not Found"

//Empty variables for current fighting opponent-side Pokemon

let opponentName = "Unknown Starter"
let opponentType1 = "normal"
let opponentType2 = "none"
let opponentAudio = ""
let opponentHp = 1
let opponentCurrentHp = 1
let opponentAtk = 1
let opponentDef = 1
let opponentSpatk = 1
let opponentSpdef = 1
let opponentSpd = 1
let opponentFrontGif = "404 Pokemon Not Found"

//Store Pokemon types for comparison during battle

let playerTypes = []
let opponentTypes = []

// Reseting values/menus when page opens or reset button is pressed

const startGame = () => {
    titleScreenElement.classList.remove(`inactive`)
    optnsContainerElement.classList.add(`inactive`)
    mainScreenElement.classList.add(`inactive`)
    mainScreenElement.style.display = `none`
    textBoxElement.innerText = ``
    nameYourStarterElement.classList.add(`inactive`)
    nameInputElement.classList.add(`inactive`)
    fightButtonContainerElement.classList.add(`inactive`)
    fightWindowElement.classList.add(`inactive`)
    fightButtonContainerElement.classList.add(`inactive`)
    selectionCongratsElement.classList.add(`inactive`)
    fightOptnsContainerElement.classList.add(`inactive`)
    dialoguePicContainerElement.classList.add(`inactive`)    
    pokemonStorage = []
    pokemonName = "Unknown Starter"
    pokemonSpecies = "Unknown Starter"
    pokemonType1 = "normal"
    pokemonType2 = "none"
    pokemonNature = "nondescript"
    pokemonHp = 0
    pokemonAtk = 0
    pokemonDef = 0
    pokemonSpatk = 0
    pokemonSpdef = 0
    pokemonSpd = 0
    pokemonFrontGif = ""
    pokemonBackGif = ""
    nameInputElement.value = ""
    playerOwned = false
    rivalOwned = false
    wildOwned = false
    playerName = ""
    playerType1 = ""
    playerType2 = ""
    playerHp = 0
    playerAtk = 0
    playerDef = 0
    playerSpatk = 0
    playerSpdef = 0
    playerSpd = 0
    playerBackGif = ""
    opponentName = ""
    opponentType1 = ""
    opponentType2 = ""
    opponentHp = 0
    opponentAtk = 0
    opponentDef = 0
    opponentSpatk = 0
    opponentSpdef = 0
    opponentSpd = 0
    opponentFrontGif = ""
    fighting = false
    randomPlayer = ""
    randomOpponent = ""
    opponentTrainer = ""

    if (audio) {
        audio.pause()
        audio.currentTime = 0
    }

    if (audio2) {
        audio2.pause()
        audio2.currentTime = 0
    }

    if (audio3) {
        audio3.pause()
        audio3.currentTime = 0
    }

    if (audio4) {
        audio4.pause()
        audio4.currentTime = 0
    }
}

//When the title screen is clicked, a random rival's pokemon is made

const generateRival = async () => {
    console.log(`Generating Rival...`)
    let rivalRandom = (Math.random() * 3)
    
    let rivalDetermination = "shinx"
    if (rivalRandom >= 0 && rivalRandom < 1) {
        rivalDetermination = "shinx"
    } else if (rivalRandom >= 1 && rivalRandom < 2) {
        rivalDetermination = "purrloin"
    } else {
        rivalDetermination = "skitty"
    }

    generatePokemon(rivalDetermination, "rival")
}

//Click or press enter on title screen to continue

titleScreenElement.addEventListener(`click`, () => {
    enterStart()
})

document.addEventListener(`keydown`, (e) => {
    if (e.key === `Enter` && !titleScreenElement.classList.contains('inactive')) {
    enterStart()
    }
}
)

//Open up options for starter selection after title screen

const enterStart = () => {
    let audioUrl = "/Sound Effects/click-buttons-ui-menu-sounds-effects-button-6-203600.mp3"
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    audio.play()

    optnsContainerElement.classList.remove(`inactive`)
    starterSelectContainerElement.classList.remove(`inactive`)
    mainScreenElement.classList.remove(`inactive`)
    mainScreenElement.style.display = `flex`
    textBoxElement.innerText = `Today you leave Assemblytown to embark on your very own Pokémon journey.
    Professor Maple is even giving you your first Pokémon! Which one will you choose?`

    //Leave this at the end so the menu goes away once everything is loaded
    titleScreenElement.classList.add(`inactive`)
    generateRival()
}

// Input player/opponent to start fight between them.
//Enter "random" for opponent to generate new.

const initiateFight = async (player, opponent) => {
    console.log(playerPokemon)
    console.log(opponentPokemon)
    fighting = true

    if (player === "random") {
        await generatePokemon("random", "player")
        getPlayer(randomPlayer)
    }
    if (opponent === "random") {
        await generatePokemon("random", "rival")
        getOpponent(randomOpponent)
    } else {
    getPlayer(player)
    getOpponent(opponent)
    }
    playerName = playerPokemon[0].name
    playerType1 = playerPokemon[0].type1
    playerType2 = playerPokemon[0].type2
    playerHp = playerPokemon[0].hp
    playerCurrentHp = playerPokemon[0].hp
    playerAtk = playerPokemon[0].atk
    playerDef = playerPokemon[0].def
    playerSpatk = playerPokemon[0].spatk
    playerSpdef = playerPokemon[0].spdef
    playerSpd = playerPokemon[0].spd
    playerBackGif = playerPokemon[0].backGif

    opponentName = opponentPokemon[0].name
    opponentType1 = opponentPokemon[0].type1
    opponentType2 = opponentPokemon[0].type2
    opponentHp = opponentPokemon[0].hp
    opponentCurrentHp = opponentPokemon[0].hp
    opponentAtk = opponentPokemon[0].atk
    opponentDef = opponentPokemon[0].def
    opponentSpatk = opponentPokemon[0].spatk
    opponentSpdef = opponentPokemon[0].spdef
    opponentSpd = opponentPokemon[0].spd
    opponentFrontGif = opponentPokemon[0].frontGif

    fightWindowElement.classList.remove(`inactive`)
    fightOptnsContainerElement.classList.remove(`inactive`)
    fightButtonContainerElement.classList.add(`inactive`)
    playerSpriteElement.setAttribute(`src`, playerBackGif)
    opponentSpriteElement.setAttribute(`src`, opponentFrontGif)
    playerHPElement.innerText = `${playerName.toUpperCase()}: ${playerHp} / ${playerHp}`
    opponentHPElement.innerText = `${opponentName.toUpperCase()}: ${opponentHp} / ${opponentHp}`
    console.log(playerName)
    console.log(opponentName)
}

//Button for combat logic

attackBtnElement.addEventListener(`click`, () => {
    runAttackRound()
    console.log(`Trying to fight...`)
})

//Run combat logic

const runAttackRound = () => {
    let playerModifier =  Math.floor(Math.random() * 10)
    let opponentModifier = Math.floor(Math.random() * 10)

    //Compare playerAtk to opponentDef

    if (playerAtk > opponentDef) {
        playerModifier = playerModifier + 1
    } else if (playerAtk < opponentDef) {
        opponentModifier = opponentModifier + 1
    }

    //Compare playerDef to opponentAtk

    if (playerDef > opponentAtk) {
        playerModifier = playerModifier + 1
    } else if (playerDef < opponentAtk) {
        opponentModifier = opponentModifier + 1
    }

    //Compare playerSpatk to opponentSpdef

    if (playerSpatk > opponentSpdef) {
        playerModifier = playerModifier + 1
    } else if (playerSpatk < opponentSpdef) {
        opponentModifier = opponentModifier + 1
    }

    //Compare playerSpdef to opponentSpatk

    if (playerSpdef > opponentSpatk) {
        playerModifier = playerModifier + 1
    } else if (playerSpdef < opponentSpatk) {
        opponentModifier = opponentModifier + 1
    }

    //Compare playerSpd to opponentSpd

    if (playerSpd > opponentSpd) {
        playerModifier = playerModifier + 1
    } else if (playerSpd < opponentSpd) {
        opponentModifier = opponentModifier + 1
    }

    //Compare types

    playerTypes = []
    opponentTypes = []
    playerTypes.push(playerType1)
    playerTypes.push(playerType2)
    opponentTypes.push(opponentType1)
    opponentTypes.push(opponentType2)

    let playerDamageMultiplier = compareTypes(playerTypes, opponentTypes)
    let opponentDamageMultiplier = compareTypes(opponentTypes, playerTypes)

    //Deal damage

    console.log(`Player's damage is multiplied by ${playerDamageMultiplier} with a modifier of ${playerModifier}!`)
    console.log(`Opponent's damage is multiplied by ${opponentDamageMultiplier} with a modifier of ${opponentModifier}!`)

    if (playerModifier > (opponentModifier - 3)) {

        opponentCurrentHp = opponentCurrentHp - (10*playerDamageMultiplier)
    }

    if (opponentModifier > (playerModifier - 3)) {
        playerCurrentHp = playerCurrentHp - (10*opponentDamageMultiplier)
    }

    if (opponentCurrentHp < 0) {
        opponentCurrentHp = 0
    }

    if (playerCurrentHp < 0) {
        playerCurrentHp = 0
    }

    if (opponentCurrentHp === 0) {
        opponentCurrentHp = 0
        endFight("player")
    } else if (playerCurrentHp === 0) {
        endFight("rival")
    }

    playerHPElement.innerText = `${playerName.toUpperCase()}: ${playerCurrentHp} / ${playerHp}`
    opponentHPElement.innerText = `${opponentName.toUpperCase()}: ${opponentCurrentHp} / ${opponentHp}`
    
}

//Reset the game is the player clicks Flee

fleeBtnElement.addEventListener(`click`, () => {
    startGame()
})

//x2 multiplier for type advantage, 0.5 multiplier for disadvantage

const compareTypes = (attackingTypes, defendingTypes) => {
    let multiplier = 1

    attackingTypes.forEach(attacker => {
        defendingTypes.forEach(defender => {
            if (typeAdvantage[attacker].super.includes(defender)) {
                multiplier *= 2
            } else if (typeAdvantage[attacker].half.includes(defender)) {
                multiplier *= 0.5
            }
        })
    })
    return multiplier
}

//Take pokemon from storage and put into player-specific storage

const getPlayer = (name) => {
    const pokemon = pokemonStorage.find(pokemon => pokemon.name === name);
    playerPokemon = []
    playerPokemon.push(pokemon)
    console.log(playerPokemon)
}

//Take pokemon from storage and put into opponent-specific storage

const getOpponent = (name) => {
    const pokemon = pokemonStorage.find(pokemon => pokemon.name === name);
    opponentPokemon = []
    opponentPokemon.push(pokemon)
    console.log(opponentPokemon)
}

//When the fight is determined, initiate end battle dialogue and show end battle button

const endFight = (winner) => {
    fighting = false
    console.log(`The winner is ${winner}!`)
    dialoguePicContainer.classList.add(`inactive`)
    fightOptnsContainerElement.classList.add(`inactive`)
    if (winner === "player") {
        textBoxElement.innerText = `You win!`

        if (Math.random() >= 0.4) {
            playerPokemon[0].hp = playerPokemon[0].hp + 5
            console.log(`HP Level up!`)
            setTimeout(() => {
                textBoxElement.innerText = `${playerPokemon[0].name}'s HP has increased by 5!`
            }, 2000)
        }

        if (Math.random() >= 0.4) {
            playerPokemon[0].atk = playerPokemon[0].atk + 3
            console.log(`ATK Level up!`)
            setTimeout(() => {
                textBoxElement.innerText = `${playerPokemon[0].name}'s ATK has increased by 3!`
            }, 4000)
        }

        if (Math.random() >= 0.4) {
            playerPokemon[0].def = playerPokemon[0].def + 3
            console.log(`DEF Level up!`)
            setTimeout(() => {
                textBoxElement.innerText = `${playerPokemon[0].name}'s DEF has increased by 3!`
            }, 6000)
        }

        if (Math.random() >= 0.4) {
            playerPokemon[0].spatk = playerPokemon[0].spatk + 3
            console.log(`SP. ATK Level up!`)
            setTimeout(() => {
                textBoxElement.innerText = `${playerPokemon[0].name}'s SP. ATK has increased by 3!`
            }, 8000)
        }

        if (Math.random() >= 0.4) {
            playerPokemon[0].spdef = playerPokemon[0].spdef + 3
            console.log(`SP. DEF Level up!`)
            setTimeout(() => {
                textBoxElement.innerText = `${playerPokemon[0].name}'s SP. DEF has increased by 3!`
            }, 10000)
        }

        if (Math.random() >= 0.4) {
            playerPokemon[0].spd = playerPokemon[0].spd + 3
            console.log(`SPD Level up!`)
            setTimeout(() => {
                textBoxElement.innerText = `${playerPokemon[0].name}'s SPD has increased by 3!`
            }, 12000)
        }

        setTimeout(() => {
            textBoxElement.innerText = `${playerPokemon[0].name} is done leveling up!`
            returnButtonContainerElement.classList.remove(`inactive`)
        }, 14000)

    } else if (winner === "rival") {
        if (opponentTrainer === "Jeremy") {
            textBoxElement.innerText = `Jeremy wins!`
            setTimeout(() => {
                dialoguePicContainerElement.classList.remove(`inactive`)
                textBoxElement.innerText = `Jeremy: Ha! Better luck next time!`
                returnButtonContainerElement.classList.remove(`inactive`)
            }, 5000)
        } else if (opponentTrainer === "Ashley") {
            textBoxElement.innerText = `Gym Leader Ashley wins!`
            setTimeout(() => {
                dialoguePicContainerElement.classList.remove(`inactive`)
                textBoxElement.innerText = `Ashley: Hard work is worthless for those that don't believe in themselves!`
                returnButtonContainerElement.classList.remove(`inactive`)
            }, 5000)
        } else if (opponentTrainer === "Aisha") {
            textBoxElement.innerText = `Gym Leader Aisha wins!`
            setTimeout(() => {
                dialoguePicContainerElement.classList.remove(`inactive`)
                textBoxElement.innerText = `Aisha: Need an extension on effort?`
                returnButtonContainerElement.classList.remove(`inactive`)
            }, 5000) 
        } else if (opponentTrainer === "Brittany") {
            textBoxElement.innerText = `Gym Leader Brittany wins!`
            setTimeout(() => {
                dialoguePicContainerElement.classList.remove(`inactive`)
                textBoxElement.innerText = `Brittany: You getting stomped is music to my ears!`
                returnButtonContainerElement.classList.remove(`inactive`)
            }, 5000)
        } else {
            textBoxElement.innerText = `Gym Leader Tom wins!`
            setTimeout(() => {
                dialoguePicContainerElement.classList.remove(`inactive`)
                textBoxElement.innerText = `Tom: Office hours are closed.`
                returnButtonContainerElement.classList.remove(`inactive`)
            }, 5000)
        }
    } else {
        textBoxElement.innerText = "You lose!"
        returnButtonContainerElement.classList.remove(`inactive`)
    }
}

//Return to fight select menu
returnBtnElement.addEventListener(`click`, async () => {
    let audioUrl = "Sound Effects/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3"
    audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()

    if (audio) {
        audio.pause()
        audio.currentTime = 0
    }

    if (audio2) {
        audio2.pause()
        audio2.currentTime = 0
    }

    if (audio3) {
        audio3.pause()
        audio3.currentTime = 0
    }

    if (audio4) {
        audio4.pause()
        audio4.currentTime = 0
    }

    fightWindowElement.classList.add(`inactive`)
    returnButtonContainerElement.classList.add(`inactive`)
    dialoguePicContainerElement.classList.add(`inactive`)
    fightButtonContainerElement.classList.remove(`inactive`)
    textBoxElement.innerText = `Choose your next fight!`
})

//Fight button for the first rival fight, initiating the game

fightButtonElement.addEventListener('click', async () => {
    let audio3Url = "Sound Effects/1-05. Your Rival Appears.mp3"
    audio3 = new Audio(audio3Url)
    
    audio3.volume = parseFloat(volumeSliderElement.value)
    audio3.play()

    volumeSliderElement.addEventListener('input', () => {
        audio3.volume = parseFloat(volumeSliderElement.value)
    })
    updateVolume()
    
    opponentTrainer = "Jeremy"

    const pokemon = pokemonStorage.find(pokemon => pokemon.Pownership === true)
    const opponent = pokemonStorage.find(pokemon => pokemon.Rownership === true)
    dialoguePicContainer.classList.remove(`inactive`)
    yamperHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.add(`inactive`)
    textBoxElement.innerText = `You encounter your rival, Jeremy, and his pokemon, ${opponent.name.toUpperCase()}!`
    setTimeout(() => {
        if (fighting) {
            textBoxElement.innerText = `Jeremy: "Just give up. You'll never beat me with that pathetic ${pokemon.species}!"`
        }
    }, 5500)
    initiateFight(pokemon.name, opponent.name)
})

//Fight button for a random fight, initiating the game

fight2ButtonElement.addEventListener(`click`, async () => {
    let audio4Url = "Sound Effects/Battle! Gym Leader [8-bit VRC6] - Pokémon Sword and Shield.mp3"
    audio4 = new Audio(audio4Url)
        
    audio4.volume = parseFloat(volumeSliderElement.value)
    audio4.play()
    
    volumeSliderElement.addEventListener('input', () => {
        audio4.volume = parseFloat(volumeSliderElement.value)
    })
    updateVolume()
    
    let opponent = randomizeOpponent()

    opponentTrainer = opponent

    if (opponent === "Ashley") {
        dialoguePicElement.setAttribute(`src`, `Pictures/AshleyPic.webp`)
    } else if (opponent === "Aisha") {
        dialoguePicElement.setAttribute(`src`, `Pictures/AishaPic.webp`)
    } else if (opponent === "Brittany") {
        dialoguePicElement.setAttribute(`src`, `Pictures/BrittanyPic.webp`)
    } else {
        dialoguePicElement.setAttribute(`src`, `Pictures/TomPic.webp`)
    }

    dialoguePicContainer.classList.remove(`inactive`)
    yamperHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.add(`inactive`)
    textBoxElement.innerText = `You encounter Gym Leader ${opponent}!`
    setTimeout(() => {
        if (fighting && opponent === "Ashley") {
            textBoxElement.innerText = `${opponent}: Dattebayo!`
        } else if (fighting && opponent === "Aisha") {
            textBoxElement.innerText = `${opponent}: Great job on your homework, but that won't save you now!`
        } else if (fighting && opponent == "Brittany") {
            textBoxElement.innerText = `${opponent}: Did you see that concert last night?`
        } else {
            textBoxElement.innerText = `${opponent}: Post your name to the thread for a butt kicking!`
        }
    }, 5500)
    initiateFight("random", "random")
})

//Fight button for fighting Ashley, initiating the game

fight3ButtonElement.addEventListener(`click`, async () => {
    let audio4Url = "Sound Effects/Battle! Gym Leader [8-bit VRC6] - Pokémon Sword and Shield.mp3"
    audio4 = new Audio(audio4Url)
        
    audio4.volume = parseFloat(volumeSliderElement.value)
    audio4.play()
    
    volumeSliderElement.addEventListener('input', () => {
        audio4.volume = parseFloat(volumeSliderElement.value)
    })
    updateVolume()
    
    let opponent = "Ashley"

    opponentTrainer = opponent

    dialoguePicElement.setAttribute(`src`, `Pictures/AshleyPic.webp`)

    dialoguePicContainer.classList.remove(`inactive`)
    yamperHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.add(`inactive`)
    textBoxElement.innerText = `You encounter Gym Leader ${opponent}!`
    setTimeout(() => {
        if (fighting && opponent === "Ashley") {
            textBoxElement.innerText = `${opponent}: Dattebayo!`
        } else if (fighting && opponent === "Aisha") {
            textBoxElement.innerText = `${opponent}: Great job on your homework, but that won't save you now!`
        } else if (fighting && opponent == "Brittany") {
            textBoxElement.innerText = `${opponent}: Did you see that concert last night?`
        } else {
            textBoxElement.innerText = `${opponent}: Post your name to the thread for a butt kicking!`
        }
    }, 5500)
    initiateFight("random", "random")
})

//Fight button for fighting Aisha, initiating the game

fight4ButtonElement.addEventListener(`click`, async () => {
    let audio4Url = "Sound Effects/Battle! Gym Leader [8-bit VRC6] - Pokémon Sword and Shield.mp3"
    audio4 = new Audio(audio4Url)
        
    audio4.volume = parseFloat(volumeSliderElement.value)
    audio4.play()
    
    volumeSliderElement.addEventListener('input', () => {
        audio4.volume = parseFloat(volumeSliderElement.value)
    })
    updateVolume()
    
    let opponent = "Aisha"

    opponentTrainer = opponent

    dialoguePicElement.setAttribute(`src`, `Pictures/AishaPic.webp`)

    dialoguePicContainer.classList.remove(`inactive`)
    yamperHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.add(`inactive`)
    textBoxElement.innerText = `You encounter Gym Leader ${opponent}!`
    setTimeout(() => {
        if (fighting && opponent === "Ashley") {
            textBoxElement.innerText = `${opponent}: Dattebayo!`
        } else if (fighting && opponent === "Aisha") {
            textBoxElement.innerText = `${opponent}: Great job on your homework, but that won't save you now!`
        } else if (fighting && opponent == "Brittany") {
            textBoxElement.innerText = `${opponent}: Did you see that concert last night?`
        } else {
            textBoxElement.innerText = `${opponent}: Post your name to the thread for a butt kicking!`
        }
    }, 5500)
    initiateFight("random", "random")
})

//Fight button for fighting Brittany, initiating the game

fight5ButtonElement.addEventListener(`click`, async () => {
    let audio4Url = "Sound Effects/Battle! Gym Leader [8-bit VRC6] - Pokémon Sword and Shield.mp3"
    audio4 = new Audio(audio4Url)
        
    audio4.volume = parseFloat(volumeSliderElement.value)
    audio4.play()
    
    volumeSliderElement.addEventListener('input', () => {
        audio4.volume = parseFloat(volumeSliderElement.value)
    })
    updateVolume()
    
    let opponent = "Brittany"

    opponentTrainer = opponent

    dialoguePicElement.setAttribute(`src`, `Pictures/BrittanyPic.webp`)

    dialoguePicContainer.classList.remove(`inactive`)
    yamperHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.add(`inactive`)
    textBoxElement.innerText = `You encounter Gym Leader ${opponent}!`
    setTimeout(() => {
        if (fighting && opponent === "Ashley") {
            textBoxElement.innerText = `${opponent}: Dattebayo!`
        } else if (fighting && opponent === "Aisha") {
            textBoxElement.innerText = `${opponent}: Great job on your homework, but that won't save you now!`
        } else if (fighting && opponent == "Brittany") {
            textBoxElement.innerText = `${opponent}: Did you see that concert last night?`
        } else {
            textBoxElement.innerText = `${opponent}: Post your name to the thread for a butt kicking!`
        }
    }, 5500)
    initiateFight("random", "random")
})

//Fight button for fighting Tom, initiating the game

fight6ButtonElement.addEventListener(`click`, async () => {
    let audio4Url = "Sound Effects/Battle! Gym Leader [8-bit VRC6] - Pokémon Sword and Shield.mp3"
    audio4 = new Audio(audio4Url)
        
    audio4.volume = parseFloat(volumeSliderElement.value)
    audio4.play()
    
    volumeSliderElement.addEventListener('input', () => {
        audio4.volume = parseFloat(volumeSliderElement.value)
    })
    updateVolume()
    
    let opponent = "Tom"

    opponentTrainer = opponent

    dialoguePicElement.setAttribute(`src`, `Pictures/TomPic.webp`)

    dialoguePicContainer.classList.remove(`inactive`)
    yamperHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.add(`inactive`)
    textBoxElement.innerText = `You encounter Gym Leader ${opponent}!`
    setTimeout(() => {
            textBoxElement.innerText = `${opponent}: Post your name to the thread for a butt kicking!`
    }, 5500)
    initiateFight("random", "random")
})

//Randomize which trainer you fight in a random battle

const randomizeOpponent = () => {
    let opponent = "Tom"

    let opponentDetermination = Math.random()
    console.log(`Your opponent random number is: ${opponentDetermination}`)
    if (opponentDetermination <= .25) {
        opponent = "Ashley"
    } else if (opponentDetermination <= .5) {
        opponent = "Aisha"
    } else if (opponentDetermination <= .75) {
        opponent = "Brittany"
    } else {
        opponent = "Tom"
    } 
    console.log(`So your opponent is: ${opponent}`)
    return opponent
}

//mouseover to see Yamper details

yamperSelectElement.addEventListener(`mouseover`, () => {
    rockruffHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.add(`inactive`)
    yamperHighlightElement.classList.remove(`inactive`)
})

//Select Yamper for your starter

yamperSelectElement.addEventListener(`click`, () => {
    let audioUrl = "Sound Effects/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3"
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()
    generatePokemon("yamper", "player")
    starterSelectContainerElement.classList.add(`inactive`)
    selectionCongratsElement.classList.remove(`inactive`)
    textBoxElement.innerText = `You have selected Yamper!`
    nameYourStarterElement.classList.remove(`inactive`)
})

//mouseover to see Yamper details

lillipupSelectElement.addEventListener(`mouseover`, () => {
    yamperHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.add(`inactive`)
    lillipupHighlightElement.classList.remove(`inactive`)
})

//Select Yamper for your starter

lillipupSelectElement.addEventListener(`click`, () => {
    let audioUrl = "Sound Effects/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3"
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()
    generatePokemon("lillipup", "player")
    starterSelectContainerElement.classList.add(`inactive`)
    selectionCongratsElement.classList.remove(`inactive`)
    nameYourStarterElement.classList.remove(`inactive`)
    textBoxElement.innerText = `You have selected Lillipup!`
})

//Mouseover to see Rockruff details

rockruffSelectElement.addEventListener(`mouseover`, () => {
    lillipupHighlightElement.classList.add(`inactive`)
    yamperHighlightElement.classList.add(`inactive`)
    rockruffHighlightElement.classList.remove(`inactive`)
})

//Select Rockruff for your starter

rockruffSelectElement.addEventListener(`click`, () => {
    let audioUrl = "Sound Effects/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3"
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()
    generatePokemon("rockruff", "player")
    starterSelectContainerElement.classList.add(`inactive`)
    selectionCongratsElement.classList.remove(`inactive`)
    nameYourStarterElement.classList.remove(`inactive`)
    textBoxElement.innerText = `You have selected Rockruff!`
})

//Pull a Pokemon's stats from the API and put into storage

const generatePokemon = async (species, ownership) => {
    pokemonNature = determineNature()

    let randomPokemon = "bulbasaur"

    let search = species

    if (species === "random") {
        search = Math.floor(Math.random() * 625)
    }

    response1 = await axios.get (
        `https://pokeapi.co/api/v2/pokemon/${search}/`
    )

    if (species === "random") {
        randomPokemon = response1.data.species.name
        search = response1.data.species.name
        if (ownership === "player") {
            randomPlayer = response1.data.species.name
        } else {
            randomOpponent = response1.data.species.name
        }
    }

    if (species === "random") {
        response = await axios.get (
            `https://pokeapi.co/api/v2/pokemon/${randomPokemon}/`
        )
    } else {
        response = await axios.get (
            `https://pokeapi.co/api/v2/pokemon/${search}/`
        )
    }

    console.log(response)
    if (ownership === "player") {
        playerOwned = true
        rivalOwned = false
        wildOwned = false
    } else if (ownership === "rival") {
        playerOwned = false
        rivalOwned = true
        wildOwned = false
    } else {
        playerOwned = false
        rivalOwned = false
        wildOwned = true
    }


    pokemonName = response.data.name
    pokemonSpecies = response.data.name
    pokemonType1 = response.data.types[0].type.name
    if (response.data.types[1] === null || response.data.types[1] === undefined) {
        pokemonType2 = "none"
    } else {
    pokemonType2 = response.data.types[1].type.name
    }
    pokemonFrontGif = response.data.sprites.other.showdown.front_default
    pokemonBackGif = response.data.sprites.other.showdown.back_default
    pokemonHp = response.data.stats[0].base_stat
    pokemonAudio = response.data.cries.latest
    console.log(`You've made a ${pokemonNature} ${pokemonSpecies} named ${pokemonName} with ${pokemonHp} HP`)
    await generateATK(search, pokemonNature)
    await generateDEF(search, pokemonNature)
    await generateSPATK(search, pokemonNature)
    await generateSPDEF(search, pokemonNature)
    await generateSPD(search, pokemonNature)
    sendToStorage()
    if (ownership === "player") {
        getPlayer(search)

    }
    console.log(pokemonStorage)
}

//Push a pokemon into storage

const sendToStorage = () => {

    const pokemon = {
        name: pokemonName,
        species: pokemonSpecies,
        audio: pokemonAudio,
        type1: pokemonType1,
        type2: pokemonType2,
        hp: pokemonHp,
        atk: pokemonAtk,
        def: pokemonDef,
        spatk: pokemonSpatk,
        spdef: pokemonSpdef,
        spd: pokemonSpd,
        nature: pokemonNature,
        frontGif: pokemonFrontGif,
        backGif: pokemonBackGif,
        Pownership: playerOwned,
        Rownership: rivalOwned,
        Wownership: wildOwned,
    };

    pokemonStorage.push(pokemon)
        
    console.log(`${pokemonName} has been stored!`)
}

//Confirm name for Starter

okCongratsElement.addEventListener(`click`, () => {
    let audioUrl = "Sound Effects/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3"
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()
    nameMyStarter()
})

nameInputElement.addEventListener(`keypress`, (e) => {
    let audioUrl = "Sound Effects/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3"
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()
    if (e.key === `Enter`) {
        nameMyStarter()
}}
)

//Click player pokemon to hear their sound (ANNOYING)

playerSpriteElement.addEventListener(`click`, () => {
    let audioUrl = playerPokemon[0].audio
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()
})

//Same for opponent pokemon

opponentSpriteElement.addEventListener(`click`, () => {
    let audioUrl = opponentPokemon[0].audio
    let audio = new Audio(audioUrl)

    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()
})

//Set Starter's name and progress story

const nameMyStarter = () => {
    starterSelectContainerElement.classList.add(`inactive`)
    selectionCongratsElement.classList.add(`inactive`)
    nameYourStarterElement.classList.add(`inactive`)
    fightButtonContainerElement.classList.remove(`inactive`)
    if (nameInputElement.value !== "") {
        playerName = nameInputElement.value.toUpperCase()
    } else {
        playerName = pokemonSpecies.toUpperCase()
        }
    const pokemon = pokemonStorage.find(pokemon => pokemon.Pownership === true);
    pokemon.name = playerName

    textBoxElement.innerText = `With ${playerName} the ${pokemonNature.toLowerCase()} ${pokemonSpecies}, at your side, you venture out into the wilds (despite being 10 years old)!`
}

//Generate stats according to nature

const generateATK = async (species, nature) => {
    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${species}/`
    )
    const speciesBonus = naturesObject[nature].bonus
    const speciesPen = naturesObject[nature].pen

    if (speciesBonus ==="atk" && speciesPen === "atk") {
        pokemonAtk = Math.floor(response.data.stats[1].base_stat)
    } else if  (speciesBonus === "atk") {
        pokemonAtk = Math.floor(response.data.stats[1].base_stat * 1.1)        
    } else if (speciesPen === "atk") {
        pokemonAtk = Math.floor(response.data.stats[1].base_stat * 0.9)
    } else {
        pokemonAtk = Math.floor(response.data.stats[1].base_stat)
    }
    console.log(`It has ${pokemonAtk} ATK!`)
}

const generateDEF = async (species, nature) => {
    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${species.toLowerCase()}/`
    )
    const speciesBonus = naturesObject[nature].bonus
    const speciesPen = naturesObject[nature].pen

    if (speciesBonus ==="def" && speciesPen === "def") {
        pokemonDef = Math.floor(response.data.stats[2].base_stat)
    } else if  (speciesBonus === "def") {
        pokemonDef = Math.floor(response.data.stats[2].base_stat * 1.1)        
    } else if (speciesPen === "def") {
        pokemonDef = Math.floor(response.data.stats[2].base_stat * 0.9)
    } else {
        pokemonDef = Math.floor(response.data.stats[2].base_stat)
    }
    console.log(`It has ${pokemonDef} DEF!`)
}

const generateSPATK = async (species, nature) => {
    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${species.toLowerCase()}/`
    )
    const speciesBonus = naturesObject[nature].bonus
    const speciesPen = naturesObject[nature].pen

    if (speciesBonus ==="spatk" && speciesPen === "spatk") {
        pokemonSpatk = Math.floor(response.data.stats[3].base_stat)
    } else if  (speciesBonus === "spatk") {
        pokemonSpatk = Math.floor(response.data.stats[3].base_stat * 1.1)        
    } else if (speciesPen === "spatk") {
        pokemonSpatk = Math.floor(response.data.stats[3].base_stat * 0.9)
    } else {
        pokemonSpatk = Math.floor(response.data.stats[3].base_stat)
    }
    console.log(`It has ${pokemonSpatk} SP. ATK!`)
}

const generateSPDEF = async (species, nature) => {
    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${species.toLowerCase()}/`
    )
    const speciesBonus = naturesObject[nature].bonus
    const speciesPen = naturesObject[nature].pen

    if (speciesBonus ==="spdef" && speciesPen === "spdef") {
        pokemonSpdef = Math.floor(response.data.stats[4].base_stat)
    } else if  (speciesBonus === "spdef") {
        pokemonSpdef = Math.floor(response.data.stats[4].base_stat * 1.1)        
    } else if (speciesPen === "spdef") {
        pokemonSpdef = Math.floor(response.data.stats[4].base_stat * 0.9)
    } else {
        pokemonSpdef = Math.floor(response.data.stats[4].base_stat)
    }
    console.log(`It has ${pokemonSpdef} SP. DEF!`)
}

const generateSPD = async (species, nature) => {
    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${species.toLowerCase()}/`
    )
    const speciesBonus = naturesObject[nature].bonus
    const speciesPen = naturesObject[nature].pen

    if (speciesBonus ==="spd" && speciesPen === "spd") {
        pokemonSpd = Math.floor(response.data.stats[5].base_stat)
    } else if  (speciesBonus === "spd") {
        pokemonSpd = Math.floor(response.data.stats[5].base_stat * 1.1)        
    } else if (speciesPen === "spd") {
        pokemonSpd = Math.floor(response.data.stats[5].base_stat * 0.9)
    } else {
        pokemonSpd = Math.floor(response.data.stats[5].base_stat)
    }
    console.log(`It has ${pokemonSpd} SPD!`)
}

//Randomly determine nature from Array

const determineNature = () => {
    const randomNature = naturesArray[Math.floor(Math.random() * naturesArray.length)];
    return randomNature
}

//Nature Array

const naturesArray = [
    "Adamant", "Bashful", "Bold", "Brave", "Calm",
    "Careful", "Docile", "Gentle", "Hardy", "Hasty",
    "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest",
    "Naive", "Naughty", "Quiet", "Quirky", "Rash",
    "Relaxed", "Sassy", "Serious", "Timid"
]

//Object to consult for nature bonuses and penalties

const naturesObject = {
    Adamant: { bonus: "atk", pen: "spatk" },
    Bashful: { bonus: "spatk", pen: "spatk" },
    Bold: { bonus: "def", pen: "atk" },
    Brave: { bonus: "atk", pen: "spd" },
    Calm: { bonus: "spdef", pen: "atk" },
    Careful: { bonus: "spdef", pen: "spatk" },
    Docile: { bonus: "def", pen: "def" },
    Gentle: { bonus: "spdef", pen: "def" },
    Hardy: { bonus: "atk", pen: "atk" },
    Hasty: { bonus: "spd", pen: "def" },
    Impish: { bonus: "def", pen: "spatk" },
    Jolly: { bonus: "spd", pen: "spatk" },
    Lax: { bonus: "def", pen: "spdef" },
    Lonely: { bonus: "atk", pen: "def" },
    Mild: { bonus: "spatk", pen: "def" },
    Modest: { bonus: "spatk", pen: "atk" },
    Naive: { bonus: "spd", pen: "spdef" },
    Naughty: { bonus: "atk", pen: "spdef" },
    Quiet: { bonus: "spatk", pen: "spd" },
    Quirky: { bonus: "spdef", pen: "spdef" },
    Rash: { bonus: "spatk", pen: "spdef" },
    Relaxed: { bonus: "def", pen: "spd" },
    Sassy: { bonus: "spdef", pen: "spd" },
    Serious: { bonus: "spd", pen: "spd" },
    Timid: { bonus: "spd", pen: "atk" },
}

//type chart for damage modifiers

const typeAdvantage = {
    "none": {
        super: [],
        half: []
    },
    "normal": {
        super: [],
        half: ["rock", "ghost", "steel"]
    },
    "fire": {
        super: ["grass", "ice", "bug", "steel"],
        half: ["fire", "water", "rock", "dragon"]
    },
    "water": {
        super: ["fire", "ground", "rock"],
        half: ["water", "grass", "dragon"]
    },
    "electric": {
        super: ["water", "flying"],
        half: ["electric", "grass", "ground", "dragon"]
    },
    "grass": {
        super: ["water", "ground", "rock"],
        half: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"]
    },
    "ice": {
        super: ["grass", "ground", "flying", "dragon"],
        half: ["fire", "water", "ice", "steel"]
    },
    "fighting": {
        super: ["normal", "ice", "rock", "dark", "steel"],
        half: ["poison", "flying", "psychic", "bug", "fairy"]
    },
    "poison": {
        super: ["grass", "fairy"],
        half: ["poison", "ground", "rock", "ghost", "steel"]
    },
    "ground": {
        super: ["fire", "electric", "poison", "rock", "steel"],
        half: ["grass", "flying", "bug"]
    },
    "flying": {
        super: ["grass", "fighting", "bug"],
        half: ["electric", "rock", "steel"]
    },
    "psychic": {
        super: ["fighting", "poison"],
        half: ["psychic", "dark", "steel"]
    },
    "bug": {
        super: ["grass", "psychic", "dark"],
        half: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"]
    },
    "rock": {
        super: ["fire", "ice", "flying", "bug"],
        half: ["fighting", "ground", "steel"]
    },
    "ghost": {
        super: ["psychic", "ghost"],
        half: ["normal", "dark"]
    },
    "dragon": {
        super: ["dragon"],
        half: ["steel", "fairy"]
    },
    "dark": {
        super: ["psychic", "ghost"],
        half: ["fighting", "dark", "fairy"]
    },
    "steel": {
        super: ["ice", "rock", "fairy"],
        half: ["fire", "water", "electric", "steel"]
    },
    "fairy": {
        super: ["fighting", "dragon", "dark"],
        half: ["fire", "poison", "steel"]
    }
}

//Update the volume of currently playing sounds when slider
//is interacted with.

const updateVolume = () => {
    const audios = document.querySelectorAll('audio')
    const volumeValue = parseFloat(volumeSliderElement.value)
    
    audios.forEach(audio => {
        audio.volume = volumeValue
    })
}

//Restart button to restart all values and screens

restartButtonElement.addEventListener(`click`, () => {
    let audioUrl = "Sound Effects/click-buttons-ui-menu-sounds-effects-button-7-203601.mp3"
    let audio = new Audio(audioUrl)
    
    audio.volume = parseFloat(volumeSliderElement.value)
    console.log
    audio.play()

    startGame()
})

//Start the game after all of the scripts load

startGame()