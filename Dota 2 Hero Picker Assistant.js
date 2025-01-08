const apiKey = 'YOUR_API_KEY'; // Замените на ваш API-ключ
const heroes = {
    "Anti-Mage": { counter: [], role: "carry" },
    "Axe": { counter: [], role: "offlane" },
    "Bane": { counter: [], role: "support" },
    "Bloodseeker": { counter: [], role: "carry" },
    "Crystal Maiden": { counter: [], role: "support" },
    "Dazzle": { counter: [], role: "support" },
    "Dragon Knight": { counter: [], role: "mid" },
    "Earthshaker": { counter: [], role: "support" },
    "Faceless Void": { counter: [], role: "carry" },
    "Invoker": { counter: [], role: "mid" },
    "Kunkka": { counter: [], role: "mid" },
    "Lina": { counter: [], role: "mid" },
    "Lion": { counter: [], role: "support" },
    "Mirana": { counter: [], role: "carry" },
    "Naga Siren": { counter: [], role: "carry" },
    "Nature's Prophet": { counter: [], role: "offlane" },
    "Pudge": { counter: [], role: "offlane" },
    "Riki": { counter: [], role: "carry" },
    "Sand King": { counter: [], role: "offlane" },
    "Sven": { counter: [], role: "carry" },
    "Tidehunter": { counter: [], role: "offlane" },
    "Vengeful Spirit": { counter: [], role: "support" },
    "Witch Doctor": { counter: [], role: "support" },
    "Zeus": { counter: [], role: "mid" },
    // Добавьте остальных героев...
    "Aether Remnant": { counter: [], role: "support" },
    "Bristleback": { counter: [], role: "offlane" },
    "Chaos Knight": { counter: [], role: "carry" },
    "Disruptor": { counter: [], role: "support" },
    "Elder Titan": { counter: [], role: "offlane" },
    "Grimstroke": { counter: [], role: "support" },
    "Hoodwink": { counter: [], role: "support" },
    "Khadgar": { counter: [], role: "mid" },
    "Lifestealer": { counter: [], role: "carry" },
    "Mars": { counter: [], role: "offlane" },
    "Medusa": { counter: [], role: "carry" },
    "Morphling": { counter: [], role: "carry" },
    "Oracle": { counter: [], role: "support" },
    "Pangolier": { counter: [], role: "offlane" },
    "Pugna": { counter: [], role: "mid" },
    "Shadow Demon": { counter: [], role: "support" },
    "Spectre": { counter: [], role: "carry" },
    "Tinker": { counter: [], role: "mid" },
    "Treant Protector": { counter: [], role: "support" },
    "Troll Warlord": { counter: [], role: "carry" },
    "Underlord": { counter: [], role: "offlane" },
    "Void Spirit": { counter: [], role: "mid" },
    "Wraith King": { counter: [], role: "carry" },
    "Zephyr": { counter: [], role: "support" },
};

async function fetchHeroes() {
    const url = `https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.result.heroes.forEach(hero => {
            if (!heroes[hero.name]) {
                heroes[hero.name] = { counter: [], role: "unknown" }; // Установите роли и контрящих героев позже
            }
        });
        console.log('Герои загружены:', heroes);
    } catch (error) {
        console.error('Ошибка при загрузке героев:', error);
    }
}

function getRole() {
    const roles = ["carry", "support", "offlane", "mid", "jungle"];
    let role;
    while (!roles.includes(role)) {
        role = prompt(`Выберите роль (carry, support, offlane, mid, jungle):`);
    }
    return role;
}

function getPicks(role) {
    const picks = [];
    let pick;
    while (true) {
        pick = prompt(`Введите имя героя для ${role} (или нажмите Cancel для завершения):`);
        if (!pick) break; // Завершаем ввод, если нажали Cancel
        if (heroes[pick] && heroes[pick].role === role) {
            picks.push(pick);
        } else {
            alert(`Герой не найден или не соответствует роли ${role}! Попробуйте снова.`);
        }
    }
    return picks;
}

function getBestPick(teammates, opponents) {
    const counters = {};
    
    opponents.forEach(opponent => {
        if (heroes[opponent]) {
            heroes[opponent].counter.forEach(counter => {
                counters[counter] = (counters[counter] || 0) + 1;
            });
        }
    });

    const availablePicks = Object.keys(heroes).filter(hero => !teammates.includes(hero));

    let bestPick = null;
    let maxCounter = -1;

    availablePicks.forEach(hero => {
        const count = counters[hero] || 0;
        if (count > maxCounter) {
            maxCounter = count;
            bestPick = hero;
        }
    });

    return bestPick || "Нет доступных героев для пика";
}

// Запускаем загрузку героев
fetchHeroes().then(() => {
    const teammateRole = getRole();
    const teammates = getPicks(teammateRole);
    
    const opponentRole = getRole();
    const opponents = getPicks(opponentRole);

    const bestHero = getBestPick(teammates, opponents);
    console.log(`Лучший герой для пика: ${bestHero}`);
});
