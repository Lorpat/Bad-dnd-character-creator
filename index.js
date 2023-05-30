let characterName = document.getElementById("name");
let classes = document.getElementById("class");
let race = document.getElementById("race");
let bonus = document.getElementById("bonus");

let weapon = document.getElementById("weapon");
let spells = document.getElementById("spells");

let what = document.getElementById("what");

let minBtns = document.getElementsByClassName("min");
let plusBtns = document.getElementsByClassName("plus");

let points = document.getElementById("points");

let err = document.getElementById("err");

let character =
{
    name: "",
    class: "",
    race: "",
    abStr: "0",
    abDex: "0",
    abCon: "0",
    abInt: "0",
    abWis: "0",
    abCha: "0",
    modStr: "0",
    modDex: "0",
    modCon: "0",
    modInt: "0",
    modWis: "0",
    modCha: "0",
    weapon: "",
    cantrip: "",
    lv1: "",
    spellslots:"0",
    maxHp:"0",
    currentHp:"0",
    magicMod:"",
    ac:"0",
};

function changeName() 
{
    character.name = characterName.value;
}

window.onload = () => 
{
    fetch("https://www.dnd5eapi.co/api/classes", 
    { method: "GET" })
        .then((res) => res.json())
        .then((data) => 
        {
            data.results.forEach((element) => 
            {
                classes.innerHTML += `<option value="${element.index}">${element.name}</option>`;
                classChange();
            });
        });

    fetch("https://www.dnd5eapi.co/api/races",
    { method: "GET" })
        .then((res) => res.json())
        .then((data) => 
        {
            data.results.forEach((element) => 
            {
                race.innerHTML += `<option value="${element.index}">${element.name}</option>`;
                raceChange();
            });
        });
};

/*
bard, vicious mockery, sleep
cle, sacred-flame, cure-wounds
dru, resistance, thunderwave
sorc, ray-of-frost, burning-hands
war, eldritch-blast, hellish-rebuke
wiz, fire-bolt, magic-missile
*/
function classChange() 
{
    character.class = classes.value;
    switch (character.class) 
    {
        case "barbarian":
            weapon.innerHTML="greataxe";
            spells.innerHTML="";
            character.cantrip="";
            character.lv1="";
            break;
        case "bard":
            weapon.innerHTML="rapier";
            spells.innerHTML=`<label for="cantrips">level 0 spell:</label><span id="cantrip">vicious-mockery</span><br>
                            <label for="lv1">level 1 spell:</label><span id="lv1">sleep</span><span> 2 times</span>`;
            character.cantrip="vicious-mockery";
            character.lv1="sleep";
            character.spellslots=2;
            character.magicMod="CHA";
            break;
        case "cleric":
            weapon.innerHTML="mace";
            spells.innerHTML=`<label for="cantrips">level 0 spell:</label><span id="cantrip">sacred-flame</span><br>
                            <label for="lv1">level 1 spell:</label><span id="lv1">cure-wounds</span><span> 2 times</span>`;
            character.cantrip="sacred-flame";
            character.lv1="cure-wounds";
            character.spellslots=2;
            character.magicMod="WIS";
            break;
        case "druid":
            weapon.innerHTML="club";
            spells.innerHTML=`<label for="cantrips">level 0 spell:</label><span id="cantrip">resistance</span><br>
                            <label for="lv1">level 1 spell:</label><span id="lv1">thunderwave</span><span> 2 times</span>`;
            character.cantrip="resistance";
            character.lv1="thunderwave";
            character.spellslots=2;
            character.magicMod="WIS";
            break;
        case "fighter":
            weapon.innerHTML="shortsword";
            spells.innerHTML="";
            character.cantrip="";
            character.lv1="";
            break;
        case "monk":
            weapon.innerHTML="quarterstaff";
            spells.innerHTML="";
            character.cantrip="";
            character.lv1="";
            break;
        case "paladin":
            weapon.innerHTML="longsword";
            spells.innerHTML="";
            character.cantrip="";
            character.lv1="";
            break;
        case "ranger":
            weapon.innerHTML="longbow";
            spells.innerHTML="";
            character.cantrip="";
            character.lv1="";
            break;
        case "rogue":
            weapon.innerHTML="dagger";
            spells.innerHTML="";
            character.cantrip="";
            character.lv1="";
            break;
        case "sorcerer":
            weapon.innerHTML="crossbow-light";
            spells.innerHTML=`<label for="cantrips">level 0 spell:</label><span id="cantrip">ray-of-frost</span><br>
                            <label for="lv1">level 1 spell:</label><span id="lv1">burning-hands</span><span> 2 times</span>`;
            character.cantrip="ray-of-frost";
            character.lv1="burning-hands";
            character.spellslots=2;
            character.magicMod="CHA";
            break;
        case "warlock":
            weapon.innerHTML="whip";
            spells.innerHTML=`<label for="cantrips">level 0 spell:</label><span id="cantrip">eldritch-blast</span><br>
                            <label for="lv1">level 1 spell:</label><span id="lv1">hellish-rebuke</span><span> 1 time</span>`;
            character.cantrip="eldritch-blast";
            character.lv1="hellish-rebuke";
            character.spellslots=1;
            character.magicMod="CHA";
            break;
        case "wizard":
            weapon.innerHTML="sickle";
            spells.innerHTML=`<label for="cantrips">level 0 spell:</label><span id="cantrip">fire-bolt</span><br>
                            <label for="lv1">level 1 spell:</label><span id="lv1">magic-missile</span><span> 2 times</span>`;
            character.cantrip="fire-bolt";
            character.lv1="magic-missile";
            character.spellslots=2;
            character.magicMod="INT";
            break;

        default:
            break;
    }
    character.weapon=weapon.innerHTML;
}

function raceChange() 
{
    character.race = race.value;

    if (race.value != "") 
    {
        fetch("https://www.dnd5eapi.co/api/races/" + race.value,

            
        { method: "GET" })
            .then((res) => res.json())
            .then((data) => 
            {
                bonus.innerHTML = "Ability bonus: ";
                data.ability_bonuses.forEach((element) => 
                {
                    bonus.innerHTML += `${element.ability_score.name} +${element.bonus}/`;
                });
            });
    }
}

function whatBtn() 
{
    what.disabled = true;
    let mess = document.getElementById("mess");
    mess.innerHTML = "";
    this.disabled = true;
    fetch("https://www.dnd5eapi.co/api/ability-scores",
    { method: "GET" })
        .then((res) => res.json())
        .then((data) => 
        {
            data.results.forEach((element) => 
            {
                fetch("https://www.dnd5eapi.co/api/ability-scores/" + element.index,
                {
                        method: "GET",
                    })
                    .then((res) => res.json())
                    .then((data) => 
                    {
                        if (data != undefined) 
                        {
                            mess.innerHTML +=
                                data.name +
                                ": " +
                                data.desc[0] +
                                "<br>" +
                                data.desc[1] +
                                "<br>" +
                                "<br>";
                        }
                    });
            });
            console.log("a");
        })
        .then(function () 
        {
            setTimeout(() => 
            {
                mess.innerHTML += `<button type="button" onclick="closeDialog()">Close</button>`;
                mess.show();
                this.disabled = false;
            }, 1000);
        });
}

function closeDialog() 
{
    let mess = document.getElementById("mess");
    mess.close();
    what.disabled = false;
}

function updateAbilityScores() 
{

    character.abStr = "0";
    character.abDex = "0";
    character.abCon = "0";
    character.abInt = "0";
    character.abWis = "0";
    character.abCha = "0";

    character.modStr = "0";
    character.modDex = "0";
    character.modCon = "0";
    character.modInt = "0";
    character.modWis = "0";
    character.modCha = "0";

    character.abStr -= -document.getElementById("str").innerText;
    character.abDex -= -document.getElementById("dex").innerText;
    character.abCon -= -document.getElementById("con").innerText;
    character.abInt -= -document.getElementById("int").innerText;
    character.abWis -= -document.getElementById("wis").innerText;
    character.abCha -= -document.getElementById("cha").innerText;

    character.modStr -= -document.getElementById("strMod").innerText;
    character.modDex -= -document.getElementById("dexMod").innerText;
    character.modCon -= -document.getElementById("conMod").innerText;
    character.modInt -= -document.getElementById("intMod").innerText;
    character.modWis -= -document.getElementById("wisMod").innerText;
    character.modCha -= -document.getElementById("chaMod").innerText;

    fetch("https://www.dnd5eapi.co/api/races/" + character.race,
    { method: "GET" })
        .then((res) => res.json())
        .then((data) => 
        {
            data.ability_bonuses.forEach((element) => 
            {
                console.log(element.bonus);
                switch (element.ability_score.name) 
                {
                    case "STR":
                        character.abStr -= -element.bonus;
                        character.modStr = Math.floor((character.abStr - 10) / 2);
                        break;
                    case "DEX":
                        character.abDex -= -element.bonus;
                        character.modDex = Math.floor((character.abDex - 10) / 2);
                        break;
                    case "CON":
                        character.abCon -= -element.bonus;
                        character.modCon = Math.floor((character.abCon - 10) / 2);
                        break;
                    case "INT":
                        character.abInt -= -element.bonus;
                        character.modInt = Math.floor((character.abInt - 10) / 2);
                        break;
                    case "WIS":
                        character.abWis -= -element.bonus;
                        character.modWis = Math.floor((character.abWis - 10) / 2);
                        break;
                    case "CHA":
                        character.abCha -= -element.bonus;
                        character.modCha = Math.floor((character.abCha - 10) / 2);
                        break;

                    default:
                        console.log("ahaha coglione non sai programmare");
                        break;
                }
            });
        });
        character.ac = 11-(-character.modDex);
}

for (let index = 0; index < minBtns.length; index++) 
{
    minBtns[index].addEventListener("click", function () 
    {
        if (this.nextElementSibling.innerHTML == "8") return;

        if (this.nextElementSibling.innerHTML >= 14) 
        {
            points.innerHTML -= -2;
        } else 
        {
            points.innerHTML -= -1;
        }
        this.nextElementSibling.innerHTML -= 1;
        this.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML =
            Math.floor((this.nextElementSibling.innerHTML - 10) / 2);
        disableBtn();
        updateAbilityScores();
        setTimeout(() => 
        {
            enableBtn();
        }, 400);
    });
}

for (let index = 0; index < plusBtns.length; index++) 
{
    plusBtns[index].addEventListener("click", function () 
    {
        // console.log(this.nextElementSibling);
        if (this.previousElementSibling.innerHTML == "15") return;

        if (this.previousElementSibling.innerHTML >= 13) 
        {
            if (points.innerHTML >= 2) 
            {
                points.innerHTML -= 2;
                this.previousElementSibling.innerHTML -= -1;
            }
        } else 
        {
            if (points.innerHTML >= 1) 
            {
                points.innerHTML -= 1;
                this.previousElementSibling.innerHTML -= -1;
            }
        }

        this.nextElementSibling.firstElementChild.innerHTML = Math.floor(
            (this.previousElementSibling.innerHTML - 10) / 2
        );
        disableBtn();
        updateAbilityScores();
        setTimeout(() => 
        {
            enableBtn();
        }, 400);
    });
}

function disableBtn() 
{
    for (let index = 0; index < plusBtns.length; index++) 
    {
        minBtns[index].disabled = true;
        plusBtns[index].disabled = true;
    }
}

function enableBtn() 
{
    for (let index = 0; index < plusBtns.length; index++) 
    {
        minBtns[index].disabled = false;
        plusBtns[index].disabled = false;
    }
}

function TOBATTLE()
{
    err.innerHTML="";
    if(character.name.trim()!=""&&points.innerHTML==0)
    {
        localStorage.setItem("character", JSON.stringify(character));
        window.location.replace("./battle.html")
    }
    else if(!character.name.trim()!="")
    {
        err.innerHTML="Give your character a name";
    }
    else
    {
        err.innerHTML="You still have some points to spend";
    }
}
