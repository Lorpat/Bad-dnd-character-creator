let mosterData = document.getElementById("monsterData");

window.onload = () => 
{
    fetch("https://www.dnd5eapi.co/api/monsters/" + localStorage.getItem("enemy"),
    { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
        monsterData.innerHTML += "enemy name = "+data.name+"<br>";
        monsterData.innerHTML += data.desc+"<br>"
        monsterData.innerHTML += "enemy maxHp = "+data.hit_points+"<br>";
    })
}

function toIndex()
{
    window.location.replace("./index.html");
}

function toBattle()
{
    window.location.replace("./battle.html");
}