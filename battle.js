let character = JSON.parse(window.localStorage.getItem("character"));
let terminal = document.getElementById("terminale");
let curtain = document.getElementById("curtain");

let enemyImg = document.getElementById("enemyImg");
let enemyName = document.getElementById("name");
let enemyHealth = document.getElementById("health");
let enemyCard = document.getElementById("enemyCard");

let characterHP = document.getElementById("hp");
let slots = document.getElementById("slots");

let old_string = "";
let hover_string = "";

let weaponBtn = document.getElementById("weapon");
let cantripBtn = document.getElementById("cantrip");
let level1Btn = document.getElementById("lv1");
let runBtn = document.getElementById("run");

let init = false;
let dado = document.getElementById("dado");
let result = document.getElementById("result");
let mod = document.getElementById("mod");
let sum = document.getElementById("sum");

let enemy = {
    name: "",
    maxHp: "0",
    currentHp: "0",
    currentHpPerc: "0",
    actionBon: "0",
    actionDam: "0",
    ac: "0",
    img: "",
    dexMod: "",
    sleep: false,
};

function d4() { return (Math.floor(Math.random() * 4) + 1); }

function d6() { return (Math.floor(Math.random() * 6) + 1); }

function d8() { return (Math.floor(Math.random() * 8) + 1); }

function d10() { return (Math.floor(Math.random() * 10) + 1); }

function d12() { return (Math.floor(Math.random() * 12) + 1); }

function d20() { return (Math.floor(Math.random() * 20) + 1); }

window.onload = () => startGame();

function startGame() {
    setTimeout(() => {
        old_string = "suddenly you were attacked by";
        terminal.innerHTML = old_string;
        inizializeEnemy();
        inizializeCharater();
        setTimeout(() => {
            terminal.innerHTML = old_string;
            curtain.classList.remove("hidden");
        }, 5000);
    }, 3000);
    if ((d20() + enemy.modDex) > (d20() + character.modDex)) {
        init = false;
    }
    else {
        init = true;
    }

}

function inizializeCharater() {
    switch (character.class) {
        case "barbarian":
            character.maxHp = 12 - (-character.modCon);
            break;
        case "fighter":
        case "ranger":
        case "paladin":
            character.maxHp = 10 - (-character.modCon);
            break;
        case "bard":
        case "cleric":
        case "monk":
        case "druid":
        case "rogue":
        case "warlock":
            character.maxHp = 8 - (-character.modCon);
            break;
        case "sorcerer":
        case "wizard":
            character.maxHp = 6 - (-character.modCon);
            break;
        default:
            break;
    }
    character.currentHp = character.maxHp;
    characterHP.innerHTML = character.currentHp;
    slots.innerHTML = character.spellslots;
    weaponBtn.getElementsByTagName("button")[0].innerHTML = character.weapon;
    if (character.cantrip == "") {
        cantripBtn.classList.add("hidden");
        level1Btn.classList.add("hidden");
    }
    else {
        cantripBtn.classList.remove("hidden");
        level1Btn.classList.remove("hidden");
        switch (character.class) {
            case "bard":
            case "warlock":
            case "sorcerer":
                character.magicMod = character.modCha;
                break;
            case "cleric":
            case "druid":
                character.magicMod = character.modWis;
                break;
            case "wizard":
                character.magicMod = character.modInt;
                break;
            default:
                break;
        }
        cantripBtn.getElementsByTagName("button")[0].innerHTML = character.cantrip;
        level1Btn.getElementsByTagName("button")[0].innerHTML = character.lv1;
    }
}

function inizializeEnemy() {
    let enemyN = Math.floor(Math.random() * 3) + 1;

    enemy = {
        name: "",
        maxHp: "0",
        currentHp: "0",
        currentHpPerc: "0",
        actionBon: "0",
        actionDam: "0",
        ac: "0",
        img: "",
        modDex: "0",
    };

    switch (enemyN) {
        case 1:
            fetch("https://www.dnd5eapi.co/api/monsters/" + "bandit",
                { method: "GET" })
                .then((res) => res.json())
                .then((data) => {
                    enemy.name = data.name;
                    enemy.maxHp = data.hit_points;
                    enemy.currentHp = enemy.maxHp;
                    enemy.currentHpPerc = "100";
                    enemy.actionBon = data.actions[0].attack_bonus;
                    enemy.actionDam = data.actions[0].damage[0].damage_dice;
                    enemy.ac = data.armor_class[0].value;
                    enemy.img = data.name + ".png";
                    enemy.modDex = Math.floor((data.dexterity - 10) / 2);
                    old_string = enemy.name;
                    enemyImg.src = enemy.img;
                    enemyName.innerHTML = enemy.name;
                    enemyHealth.innerHTML = enemy.currentHpPerc;
                })
            localStorage.setItem("enemy", "bandit");
            break;
        case 2:
            fetch("https://www.dnd5eapi.co/api/monsters/" + "cultist",
                { method: "GET" })
                .then((res) => res.json())
                .then((data) => {
                    enemy.name = data.name;
                    enemy.maxHp = data.hit_points;
                    enemy.currentHp = enemy.maxHp;
                    enemy.currentHpPerc = "100";
                    enemy.actionBon = data.actions[0].attack_bonus;
                    enemy.actionDam = data.actions[0].damage[0].damage_dice;
                    enemy.ac = data.armor_class[0].value;
                    enemy.img = data.name + ".png";
                    enemy.modDex = Math.floor((data.dexterity - 10) / 2);
                    old_string = enemy.name;
                    enemyImg.src = enemy.img;
                    enemyName.innerHTML = enemy.name;
                    enemyHealth.innerHTML = enemy.currentHpPerc;
                })
            localStorage.setItem("enemy", "cultist");
            break;
        case 3:
            fetch("https://www.dnd5eapi.co/api/monsters/" + "guard",
                { method: "GET" })
                .then((res) => res.json())
                .then((data) => {
                    enemy.name = data.name;
                    enemy.maxHp = data.hit_points;
                    enemy.currentHp = enemy.maxHp;
                    enemy.currentHpPerc = "100";
                    enemy.actionBon = data.actions[0].attack_bonus;
                    enemy.actionDam = data.actions[0].damage[0].from.options[1].damage_dice;
                    enemy.ac = data.armor_class[0].value;
                    enemy.img = data.name + ".jpg";
                    enemy.modDex = Math.floor((data.dexterity - 10) / 2);
                    old_string = enemy.name;
                    enemyImg.src = enemy.img;
                    enemyName.innerHTML = enemy.name;
                    enemyHealth.innerHTML = enemy.currentHpPerc;
                })
            localStorage.setItem("enemy", "guard");
            break;

        default:
            break;
    }

}

function damageCharacter(n) {
    character.currentHp -= n;
    characterHP.innerHTML = character.currentHp + "-(" + n + ")";
    resetTerminal();
}

function healCharacter(n) {
    character.currentHp += n;
    if (character.currentHp > character.maxHp) { character.currentHp = character.maxHp };
    characterHP.innerHTML = character.currentHp + "+(" + n + ")";
    resetTerminal();
}

function damageEnemy(n) {
    enemyCard.classList.add("shake");
    enemy.currentHp -= n;
    enemy.currentHpPerc = Math.floor((enemy.currentHp * 100) / enemy.maxHp);
    enemyHealth.innerHTML = enemy.currentHpPerc;
}

function weapon() {
    terminal.innerHTML = "Use your weapon to damage you enemy (+" + character.modStr + ")";
}

function cantrip() {
    terminal.innerHTML = "Use your level 0 magic(infinite uses)";
}

function lv1() {
    terminal.innerHTML = "Use your level 1 magic";
}

function run() {
    terminal.innerHTML = "Run away(coward)";
}

function resetTerminal() {
    terminal.innerHTML = old_string;
}

function hit(bon, dif) {
    let n = d20();
    dado.classList.add("rotate");
    result.innerHTML = n;
    mod.innerHTML = bon + "+ 2";
    sum.innerHTML = n + 2 + bon;
    if (n + 2 + bon >= dif) {
        return true;
    }
    return false;
}

function hitE(bon, dif) {
    let n = d20();
    if (n + 2 + bon >= dif && !enemy.sleep) {
        return true;
    }
    if (enemy.sleep) {
        if (d20() >= 15) {
            sleep = false;
        }
    }
    return false;
}

function disableAllBtn() {
    weaponBtn.getElementsByTagName("button")[0].disabled = true;
    cantripBtn.getElementsByTagName("button")[0].disabled = true;
    level1Btn.getElementsByTagName("button")[0].disabled = true;
    runBtn.getElementsByTagName("button")[0].disabled = true;
}

function enAllBtn() {
    weaponBtn.getElementsByTagName("button")[0].disabled = false;
    cantripBtn.getElementsByTagName("button")[0].disabled = false;
    level1Btn.getElementsByTagName("button")[0].disabled = false;
    runBtn.getElementsByTagName("button")[0].disabled = false;
}

function attack() {
    disableAllBtn();
    if (init) {
        if (hit(character.modStr, enemy.ac)) {
            fetch("https://www.dnd5eapi.co/api/equipment/" + character.weapon,
                { method: "GET" })
                .then((res) => res.json())
                .then((data) => {
                    damageEnemy(decomposeDice(data.damage.damage_dice) - (-character.modStr));
                    if (enemy.currentHp <= 0) {
                        window.location.replace("./win.html");
                    }
                })
            enemyCard.classList.remove("shake");
        }
        if (hitE(enemy.actionBon, character.ac)) {
            let arr = enemy.actionDam.split("+");
            damageCharacter(decomposeDice(arr[0])) - (-arr[1]);
            if (character.currentHp <= 0) {
                window.location.replace("./lose.html");
            }
        }
    }
    else {
        if (hitE(enemy.actionBon, character.ac)) {
            let arr = enemy.actionDam.split("+");
            damageCharacter(decomposeDice(arr[0])) - (-arr[1]);
            if (character.currentHp <= 0) {
                window.location.replace("./lose.html");
            }
        }
        if (hit(character.modStr, enemy.ac)) {
            fetch("https://www.dnd5eapi.co/api/equipment/" + character.weapon,
                { method: "GET" })
                .then((res) => res.json())
                .then((data) => {
                    damageEnemy(decomposeDice(data.damage.damage_dice) - (-character.modStr));
                    if (enemy.currentHp <= 0) {
                        window.location.replace("./win.html");
                    }
                })
            enemyCard.classList.remove("shake");
        }
    }
    setTimeout(() => { dado.classList.remove("rotate"); enAllBtn() }, 2000);
}

function useRun() {
    disableAllBtn();
    if (d20() - (-character.modDex) >= d20() + 4) {
        window.location.replace("./index.html");
    }
    else {
        old_string = "You can't run";
        resetTerminal();
        if (hitE(enemy.actionBon, character.ac)) {
            let arr = enemy.actionDam.split("+");
            damageCharacter(decomposeDice(arr[0])) - (-arr[1]);
            if (character.currentHp <= 0) {
                window.location.replace("./lose.html");
            }
        }
    }
    setTimeout(() => { dado.classList.remove("rotate"); enAllBtn() }, 2000);
}

function useCantrip() {
    disableAllBtn();
    if (init) {

        switch (character.cantrip) {
            case "vicious-mockery":
                if (hit(character.modCha, d20())) {
                    damageEnemy(decomposeDice("1d4"));
                    enemy.actionBon = "0";
                }
                break;
            case "sacred-flame":
                if (hit(character.modWis, d20() - (-enemy.modDex))) {
                    damageEnemy(decomposeDice("1d8"));
                }
                break;
            case "resistance":
                character.ac -= -(d4());
                break;
            case "ray-of-frost":
                if (hit(character.modCha, enemy.ac)) {
                    damageEnemy(decomposeDice("1d8"));
                    enemy.actionBon = "0";
                }
                break;
            case "eldritch-blast":
                if (hit(character.modCha, enemy.ac)) {
                    damageEnemy(decomposeDice("1d10"));
                }
                break;
            case "fire-bolt":
                if (hit(character.modInt, enemy.ac)) {
                    damageEnemy(decomposeDice("1d10"));
                }
                break;

            default:
                break;
        }
        if (enemy.currentHp <= 0) {
            window.location.replace("./win.html");
        }

        if (hitE(enemy.actionBon, character.ac)) {
            let arr = enemy.actionDam.split("+");
            damageCharacter(decomposeDice(arr[0])) - (-arr[1]);
            if (character.currentHp <= 0) {
                window.location.replace("./lose.html");
            }
        }
    }
    else {
        if (hitE(enemy.actionBon, character.ac)) {
            let arr = enemy.actionDam.split("+");
            damageCharacter(decomposeDice(arr[0])) - (-arr[1]);
            if (character.currentHp <= 0) {
                window.location.replace("./lose.html");
            }
        }
        switch (character.cantrip) {
            case "vicious-mockery":
                if (hit(character.modCha, d20())) {
                    damageEnemy(decomposeDice("1d4"));
                    enemy.actionBon = "0";
                }
                break;
            case "sacred-flame":
                if (hit(character.modWis, d20() - (-enemy.modDex))) {
                    damageEnemy(decomposeDice("1d8"));
                }
                break;
            case "resistance":
                character.ac -= -(d4());
                break;
            case "ray-of-frost":
                if (hit(character.modCha, enemy.ac)) {
                    damageEnemy(decomposeDice("1d8"));
                    enemy.actionBon = "0";
                }
                break;
            case "eldritch-blast":
                if (hit(character.modCha, enemy.ac)) {
                    damageEnemy(decomposeDice("1d10"));
                }
                break;
            case "fire-bolt":
                if (hit(character.modInt, enemy.ac)) {
                    damageEnemy(decomposeDice("1d10"));
                }
                break;

            default:
                break;
        }
        if (enemy.currentHp <= 0) {
            window.location.replace("./win.html");
        }
    }
    setTimeout(() => { dado.classList.remove("rotate"); enAllBtn() }, 2000);
}

function useLevel1() {
    if (character.spellslots > 0) {
        disableAllBtn();
        if (init) {

            switch (character.lv1) {
                case "sleep":
                    enemy.sleep = true;
                    break;
                case "cure-wounds":
                    healCharacter(decomposeDice("1d8") - (-character.modWis));
                    break;
                case "thunderwave":
                    if (hit(character.modWis, d20())) {
                        damageEnemy(decomposeDice("2d8"));
                    }
                    else {
                        damageEnemy(decomposeDice("2d8") / 2);
                    }
                    break;
                case "burning-hands":
                    if (hit(character.modCha, d20() - (-enemy.dexMod))) {
                        damageEnemy(decomposeDice("3d6"));
                    }
                    else {
                        damageEnemy(decomposeDice("3d6") / 2);
                    }
                    break;
                case "hellish-rebuke":
                    if (hit(character.modCha, d20() - (-enemy.dexMod))) {
                        damageEnemy(decomposeDice("2d10"));
                    }
                    else {
                        damageEnemy(decomposeDice("2d10") / 2);
                    }
                    break;
                case "magic-missile":
                    damageEnemy(decomposeDice("3d4") + 3);
                    break;

                default:
                    break;
            }
            if (enemy.currentHp <= 0) {
                window.location.replace("./win.html");
            }

            if (hitE(enemy.actionBon, character.ac)) {
                let arr = enemy.actionDam.split("+");
                damageCharacter(decomposeDice(arr[0])) - (-arr[1]);
                if (character.currentHp <= 0) {
                    window.location.replace("./lose.html");
                }
            }
        }
        else {
            if (hitE(enemy.actionBon, character.ac)) {
                let arr = enemy.actionDam.split("+");
                damageCharacter(decomposeDice(arr[0])) - (-arr[1]);
                if (character.currentHp <= 0) {
                    window.location.replace("./lose.html");
                }
            }
            switch (character.lv1) {
                case "sleep":
                    enemy.sleep = true;
                    break;
                case "cure-wounds":
                    healCharacter(decomposeDice("1d8") - (-character.modWis));
                    break;
                case "thunderwave":
                    if (hit(character.modWis, d20())) {
                        damageEnemy(decomposeDice("2d8"));
                    }
                    else {
                        damageEnemy(decomposeDice("2d8") / 2);
                    }
                    break;
                case "burning-hands":
                    if (hit(character.modCha, d20() - (-enemy.dexMod))) {
                        damageEnemy(decomposeDice("3d6"));
                    }
                    else {
                        damageEnemy(decomposeDice("3d6") / 2);
                    }
                    break;
                case "hellish-rebuke":
                    if (hit(character.modCha, d20() - (-enemy.dexMod))) {
                        damageEnemy(decomposeDice("2d10"));
                    }
                    else {
                        damageEnemy(decomposeDice("2d10") / 2);
                    }
                    break;
                case "magic-missile":
                    damageEnemy(decomposeDice("3d4") + 3);
                    break;

                default:
                    break;
            }
            
            if (enemy.currentHp <= 0) {
                window.location.replace("./win.html");
            }
        }
        setTimeout(() => { dado.classList.remove("rotate"); enAllBtn() }, 2000);
        character.spellslots-=1;
        slots.innerHTML=character.spellslots;
    }
    else
    {
        old_string="You have no spell slots";
        resetTerminal();
    }
}

function decomposeDice(string) {
    let arr = string.split("d");
    let sum = 0;
    for (let index = 0; index < arr[0]; index++) {
        switch (arr[1]) {
            case "4":
                sum += d4();
                break;
            case "6":
                sum += d6();
                break;
            case "8":
                sum += d8();
                break;
            case "10":
                sum += d10();
                break;
            case "12":
                sum += d12();
                break;
        }
    }
    return sum;
}


stickyElem = document.querySelector(".sticky-div");


currStickyPos = stickyElem.getBoundingClientRect().top + window.pageYOffset;
window.onscroll = function () {


    if (window.pageYOffset > currStickyPos) {
        stickyElem.style.position = "fixed";
        stickyElem.style.top = "0px";
    } else {
        stickyElem.style.position = "relative";
        stickyElem.style.top = "0px";
    }
}
