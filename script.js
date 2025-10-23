// 從 translations.js 導入映射表
import translations from './translations.js';

// 當前語言（預設英文，可改 "zh" 為繁中）
const currentLang = "en";

// 合成規則數據 (從指南提取，包含所有組合)
const combos = [
    // Bleed 組
    { group: "Bleed", ballA: "Bleed", ballB: "Vampire", result: "Vampire Lord", note: "Also works with Dark instead of Bleed", description: "Each hit inflicts 3 stacks of bleed. Heals 1 health and consumes all stacks when hitting an enemy with at least 10 stacks of bleed" },
    { group: "Bleed", ballA: "Bleed", ballB: "Brood Mother", result: "Leech", note: "", description: "Attaches up to 1 leech onto enemies it hits, which adds 2 stacks of bleed per second (max 24 stacks)" },
    { group: "Bleed", ballA: "Bleed", ballB: "Poison", result: "Virus", note: "Also works with Cell and Ghost instead of Bleed", description: "Applies 1 stack of disease to units it hits (max 8 stacks). Disease lasts for 6 seconds. Each stack of disease deals 3-6 damage per second and diseased units have a 15% chance of passing a stack to undiseased nearby enemies each second." },
    { group: "Bleed", ballA: "Bleed", ballB: "Charm", result: "Berserk", note: "Also works with Burn instead of Bleed", description: "Each hit has a 30% chance of causing enemies to go berserk for 6 seconds. Berserk enemies deal 15-24 damage to adjacent enemies every second" },
    { group: "Bleed", ballA: "Bleed", ballB: "Dark", result: "Sacrifice", note: "", description: "Inflicts 4 stacks of bleed (max 15 stacks) and applies curse to hit enemies. Cursed enemies are dealt 50-100 after being hit 5 times." },
    { group: "Bleed", ballA: "Bleed", ballB: "Iron", result: "Hemorrhage", note: "", description: "Inflicts 3 stacks of bleed. When hitting an enemy with 12 stacks of bleed or more, consume all stacks of bleed to deal 20% of their current health" },
    // Brood Mother 組
    { group: "Brood Mother", ballA: "Brood Mother", ballB: "Bleed", result: "Leech", note: "", description: "Attaches up to 1 leech on to enemies it hits, which adds 2 stacks of bleed per second (max 24 stacks)" },
    { group: "Brood Mother", ballA: "Brood Mother", ballB: "Cell", result: "Maggot", note: "", description: "Infest enemies on hit with maggots. When they die, they explode into 1-2 baby balls" },
    { group: "Brood Mother", ballA: "Brood Mother", ballB: "Egg Sac", result: "Spider Queen", note: "", description: "Has a 25% chance of birthing an Egg Sac each time it hits an enemy" },
    { group: "Brood Mother", ballA: "Brood Mother", ballB: "Vampire", result: "Mosquito King", note: "", description: "Spawns a mosquito each time it hits an enemy. Mosquitos attack a random enemy, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health" },
    // Burn 組
    { group: "Burn", ballA: "Burn", ballB: "Iron", result: "Bomb", note: "", description: "Explodes when hitting an enemy, dealing 150-300 damage to nearby enemies. Has a 3 seconds cooldown before it can be shot again." },
    { group: "Burn", ballA: "Burn", ballB: "Earthquake", result: "Magma", note: "", description: "Emits lava blobs over time. Enemies who walk into lava blobs are dealt 15-30 damage and gain 1 stack of burn (max 3 stacks). Burn lasts for 3 seconds, dealing 3-8 damage per stack per second. This ball and its lava blobs also deal 6-12 damage to nearby units." },
    { group: "Burn", ballA: "Burn", ballB: "Wind", result: "Inferno", note: "", description: "Applies 1 stack of burn every second to all enemies within a 2 tile radius. Burn lasts for 6 seconds, dealing 3-7 damage per stack per second" },
    { group: "Burn", ballA: "Burn", ballB: "Charm", result: "Berserk", note: "", description: "Each hit has a 30% chance of causing enemies to go berserk for 6 seconds. Berserk enemies deal 15-24 damage to adjacent enemies every second." },
    { group: "Burn", ballA: "Burn", ballB: "Light", result: "Sun", note: "", description: "Blind all enemies in view and add 1 stack of burn every second (max 5 stacks). Burn lasts for 6 seconds and deals 6-12 damage per stack per second." },
    { group: "Burn", ballA: "Burn", ballB: "Freeze", result: "Frozen Flame", note: "", description: "Add 1 stack of frostburn on hit for 20 seconds (max 4 stacks). Frostburnt units are dealt 8-12 damage per stack per second and receive 25% more damage from other sources." },
    // Cell 組
    { group: "Cell", ballA: "Cell", ballB: "Brood Mother", result: "Maggot", note: "", description: "Infest enemies on hit with maggots. When they die, they explode into 1-2 baby balls" },
    { group: "Cell", ballA: "Cell", ballB: "Earthquake", result: "Overgrowth", note: "", description: "Applies 1 stack of overgrowth. Upon reaching 3, consume all stacks and deal 0-200 damage to all enemies in a 3x3 tile square" },
    { group: "Cell", ballA: "Cell", ballB: "Laser", result: "Radiation Beam", note: "Also works with Poison instead of Cell", description: "Emit a radiation beam on hit that deals 24-48 damage and applies 1 stack of radiation (max 5 stacks). Radiation lasts for 15 seconds and cause enemies to receive 10% more damage from all sources per stack" },
    { group: "Cell", ballA: "Cell", ballB: "Egg Sac", result: "Voluptuous Egg Sac", note: "", description: "Explodes into 2-3 egg sacs on hitting an enemy. Has a 3 second cooldown before it can be shot again" },
    { group: "Cell", ballA: "Cell", ballB: "Poison", result: "Virus", note: "Also works with Bleed and Ghost instead of Cell", description: "Applies 1 stack of disease to units it hits (max 8 stacks). Disease lasts for 6 seconds. Each stack of disease deals 3-6 damage per second and diseased units have a 15% chance of passing a stack to undiseased nearby enemies each second." },
    // Charm 組
    { group: "Charm", ballA: "Charm", ballB: "Vampire", result: "Succubus", note: "", description: "Each hit has a 4% chance of charming the enemy for 9 seconds. Heals 1 when hitting a charmed enemy" },
    { group: "Charm", ballA: "Charm", ballB: "Bleed", result: "Berserk", note: "Also works with Burn instead of Bleed", description: "Each hit has a 30% chance of causing enemies to go berserk for 6 seconds. Berserk enemies deal 15-24 damage to adjacent enemies every second" },
    { group: "Charm", ballA: "Charm", ballB: "Dark", result: "Incubus", note: "", description: "Each hit has a 4% chance of charming the enemy for 9 seconds. Charmed enemies curse nearby enemies. Cursed enemies are dealt 100-200 after being hit 5 times." },
    { group: "Charm", ballA: "Charm", ballB: "Lightning", result: "Lovestruck", note: "Also works with Light instead of Lightning", description: "Inflicts lovestruck on hit enemies for 20 seconds. Lovestruck units have a 50% chance of healing you for 5 health when they attack." },
    // Dark 組
    { group: "Dark", ballA: "Dark", ballB: "Bleed", result: "Sacrifice", note: "", description: "Inflicts 4 stacks of bleed (max 15 stacks) and applies curse on hit to enemies. Cursed enemies are dealt 50-100 after being hit 5 times." },
    { group: "Dark", ballA: "Dark", ballB: "Iron", result: "Assassin", note: "Also works with Ghost instead of Dark", description: "Passes through the front of enemies, but not the back. Backstabs deal 30% bonus damage." },
    { group: "Dark", ballA: "Dark", ballB: "Ghost", result: "Phantom", note: "", description: "Curse enemies on hit. Cursed enemies are dealt 100-200 damage after being hit 5 times." },
    { group: "Dark", ballA: "Dark", ballB: "Vampire", result: "Vampire Lord", note: "Also works with Bleed instead of Dark", description: "Each hit inflicts 3 stacks of bleed. Heals 1 health and consumes all stacks when hitting an enemy with at least 10 stacks of bleed." },
    { group: "Dark", ballA: "Dark", ballB: "Charm", result: "Incubus", note: "", description: "Each hit has a 4% chance of charming the enemy for 9 seconds. Charmed enemies curse nearby enemies. Cursed enemies are dealt 100-200 after being hit 5 times." },
    { group: "Dark", ballA: "Dark", ballB: "Sun", result: "Black Hole", note: "", description: "Instantly kills the first non-boss enemy that it hits, but destroyed itself afterwards. Has a 7 second cooldown before it can be shot again." },
    { group: "Dark", ballA: "Dark", ballB: "Wind", result: "Noxious", note: "Also works with Poison instead of Dark", description: "Passes through enemies and applies 3 stacks of poison to nearby enemies within a 2 tile radius. Poison lasts for 4 seconds and each stack deals 1-3 damage per second." },
    { group: "Dark", ballA: "Dark", ballB: "Light", result: "Flicker", note: "", description: "Deals 1-7 damage to every enemy on screen every 1.4 seconds" },
    // Earthquake 組
    { group: "Earthquake", ballA: "Earthquake", ballB: "Burn", result: "Magma", note: "", description: "Emits lava blobs over time. Enemies who walk into lava blobs are dealt 15-30 damage and gain 1 stack of burn (max 3 stacks). Burn lasts for 3 seconds, dealing 3-8 damage per stack per second. This ball and its lava blobs also deal 6-12 damage to nearby units." },
    { group: "Earthquake", ballA: "Earthquake", ballB: "Freeze", result: "Glacier", note: "", description: "Leaves behind ice patches over time. Enemies who walk into ice patches are dealt 15-30 damage and are slowed by 50% for 7 seconds. This ball and its ice patches also deal 6-12 damage to nearby units." },
    { group: "Earthquake", ballA: "Earthquake", ballB: "Poison", result: "Swamp", note: "", description: "Leaves behind tar blobs over time. Enemies who walk into tar blobs are dealt 15-30, are slowed by 50% for 7 seconds and gain 1 stack of poison (max 8 stacks). Each stack of poison deals 1-3 damage per second. This ball and its tar blobs also deal 6-12 damage to nearby units" },
    { group: "Earthquake", ballA: "Earthquake", ballB: "Wind", result: "Sandstorm", note: "", description: "Goes through enemies and is surrounded by a raging storm dealing 10-20 damage per second and blinding nearby enemies for 3 seconds" },
    { group: "Earthquake", ballA: "Earthquake", ballB: "Cell", result: "Overgrowth", note: "", description: "Applies 1 stack of overgrowth. Upon reaching 3, consume all stacks and deal 0-200 damage to all enemies in a 3x3 tile square" },
    // Egg Sac 組
    { group: "Egg Sac", ballA: "Egg Sac", ballB: "Brood Mother", result: "Spider Queen", note: "", description: "Has a 25% chance of birthing an Egg Sac each time it hits an enemy" },
    { group: "Egg Sac", ballA: "Egg Sac", ballB: "Iron", result: "Shotgun", note: "", description: "Explodes into 2-3 pellets on hitting an enemy. Has a 3 second cooldown before it can be shot again" },
    { group: "Egg Sac", ballA: "Egg Sac", ballB: "Vampire", result: "Mosquito Swarm", note: "", description: "Explode into 3-6 mosquitos. Mosquitos attack random enemies, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health" },
    { group: "Egg Sac", ballA: "Egg Sac", ballB: "Cell", result: "Voluptuous Egg Sac", note: "", description: "Explodes into 2-3 egg sacs on hitting an enemy. Has a 3 second cooldown before it can be shot again" },
    // Freeze 組
    { group: "Freeze", ballA: "Freeze", ballB: "Ghost", result: "Wraith", note: "", description: "Passes through enemies and inflicts a chilling aura, slowing enemies by 20% for 5 seconds within a 2 tile radius." },
    { group: "Freeze", ballA: "Freeze", ballB: "Laser", result: "Freeze Ray", note: "", description: "Emits a freezing beam on hit, dealing 20-40 damage and freezing enemies in a line for 2 seconds." },
    { group: "Freeze", ballB: "Wind", result: "Blizzard", note: "Also works with Lightning instead of Wind", description: "Freezes all enemies within a 2 tile radius for 0.8 seconds, dealing 1-50 damage." },
    { group: "Freeze", ballA: "Freeze", ballB: "Earthquake", result: "Glacier", note: "", description: "Leaves behind ice patches over time. Enemies who walk into ice patches are dealt 15-30 damage and are slowed by 50% for 7 seconds. This ball and its ice patches also deal 6-12 damage to nearby units." },
    { group: "Freeze", ballA: "Freeze", ballB: "Burn", result: "Frozen Flame", note: "", description: "Add 1 stack of frostburn on hit for 20 seconds (max 4 stacks). Frostburnt units are dealt 8-12 damage per stack per second and receive 25% more damage from other sources." },
    { group: "Freeze", ballA: "Freeze", ballB: "Lightning", result: "Blizzard", note: "", description: "Freezes all enemies within a 2 tile radius for 0.8 seconds, dealing 1-50 damage." },
    // Ghost 組
    { group: "Ghost", ballA: "Ghost", ballB: "Dark", result: "Phantom", note: "", description: "Curse enemies on hit. Cursed enemies are dealt 100-200 damage after being hit 5 times." },
    { group: "Ghost", ballA: "Ghost", ballB: "Freeze", result: "Wraith", note: "", description: "Passes through enemies and inflicts a chilling aura, slowing enemies by 20% for 5 seconds within a 2 tile radius." },
    { group: "Ghost", ballA: "Ghost", ballB: "Poison", result: "Virus", note: "Also works with Bleed and Cell instead of Ghost", description: "Applies 1 stack of disease to units it hits (max 8 stacks). Disease lasts for 6 seconds. Each stack of disease deals 3-6 damage per second and diseased units have a 15% chance of passing a stack to undiseased nearby enemies each second." },
    { group: "Ghost", ballA: "Ghost", ballB: "Vampire", result: "Soul Sucker", note: "", description: "Passes through enemies and saps them, with a 30% chance of stealing 1 health and reducing their attack damage by 20%. Lifesteal chance only applies once per enemy." },
    { group: "Ghost", ballA: "Ghost", ballB: "Iron", result: "Assassin", note: "", description: "Passes through the front of enemies, but not the back. Backstabs deal 30% bonus damage." },
    // Iron 組
    { group: "Iron", ballA: "Iron", ballB: "Lightning", result: "Lightning Rod", note: "", description: "Plants a lightning rod into enemies it hits. These enemies are struck by lightning every 3.0 seconds, dealing 1-30 damage to up to 8 nearby enemies" },
    { group: "Iron", ballA: "Iron", ballB: "Dark", result: "Assassin", note: "Also works with Ghost instead of Dark", description: "Passes through the front of enemies, but not the back. Backstabs deal 30% bonus damage." },
    { group: "Iron", ballA: "Iron", ballB: "Ghost", result: "Assassin", note: "", description: "Passes through the front of enemies, but not the back. Backstabs deal 30% bonus damage." },
    { group: "Iron", ballA: "Iron", ballB: "Burn", result: "Bomb", note: "", description: "Explodes when hitting an enemy, dealing 150-300 damage to nearby enemies. Has a 3 seconds cooldown before it can be shot again." },
    { group: "Iron", ballA: "Iron", ballB: "Bleed", result: "Hemorrhage", note: "", description: "Inflicts 3 stacks of bleed. When hitting an enemy with 12 stacks of bleed or more, consume all stacks of bleed to deal 20% of their current health" },
    { group: "Iron", ballA: "Iron", ballB: "Egg Sac", result: "Shotgun", note: "", description: "Explodes into 2-3 pellets on hitting an enemy. Has a 3 second cooldown before it can be shot again" },
    // Laser 組
    { group: "Laser", ballA: "Laser", ballB: "Laser", result: "Holy Laser", note: "", description: "Emits a powerful beam that deals 40-80 damage in a straight line, piercing through all enemies." },
    { group: "Laser", ballA: "Laser", ballB: "Freeze", result: "Freeze Ray", note: "", description: "Emits a freezing beam on hit, dealing 20-40 damage and freezing enemies in a line for 2 seconds." },
    { group: "Laser", ballA: "Laser", ballB: "Poison", result: "Radiation Beam", note: "Also works with Cell instead of Poison", description: "Emit a radiation beam on hit that deals 24-48 damage and applies 1 stack of radiation (max 5 stacks). Radiation lasts for 15 seconds and cause enemies to receive 10% more damage from all sources per stack" },
    { group: "Laser", ballA: "Laser", ballB: "Cell", result: "Radiation Beam", note: "", description: "Emit a radiation beam on hit that deals 24-48 damage and applies 1 stack of radiation (max 5 stacks). Radiation lasts for 15 seconds and cause enemies to receive 10% more damage from all sources per stack" },
    { group: "Laser", ballA: "Laser", ballB: "Light", result: "Laser Beam", note: "", description: "Emits a concentrated beam dealing 30-60 damage in a straight line, with a 10% chance to blind enemies for 1 second." },
    // Light 組
    { group: "Light", ballA: "Light", ballB: "Burn", result: "Sun", note: "", description: "Blind all enemies in view and add 1 stack of burn every second (max 5 stacks). Burn lasts for 6 seconds and deals 6-12 damage per stack per second." },
    { group: "Light", ballA: "Light", ballB: "Dark", result: "Flicker", note: "", description: "Deals 1-7 damage to every enemy on screen every 1.4 seconds" },
    { group: "Light", ballA: "Light", ballB: "Laser", result: "Laser Beam", note: "", description: "Emits a concentrated beam dealing 30-60 damage in a straight line, with a 10% chance to blind enemies for 1 second." },
    { group: "Light", ballA: "Light", ballB: "Charm", result: "Lovestruck", note: "Also works with Lightning instead of Light", description: "Inflicts lovestruck on hit enemies for 20 seconds. Lovestruck units have a 50% chance of healing you for 5 health when they attack." },
    // Lightning 組
    { group: "Lightning", ballA: "Lightning", ballB: "Iron", result: "Lightning Rod", note: "", description: "Plants a lightning rod into enemies it hits. These enemies are struck by lightning every 3.0 seconds, dealing 1-30 damage to up to 8 nearby enemies" },
    { group: "Lightning", ballB: "Wind", result: "Storm", note: "", description: "Emits lightning to strike nearby enemies every second, dealing 1-40 damage" },
    { group: "Lightning", ballA: "Lightning", ballB: "Freeze", result: "Blizzard", note: "Also works with Wind instead of Lightning", description: "Freezes all enemies within a 2 tile radius for 0.8 seconds, dealing 1-50 damage." },
    { group: "Lightning", ballA: "Lightning", ballB: "Light", result: "Flash", note: "", description: "Damage all enemies on screen for 1-3 damage after hitting an enemy and blind them for 2 seconds" },
    { group: "Lightning", ballA: "Lightning", ballB: "Charm", result: "Lovestruck", note: "", description: "Inflicts lovestruck on hit enemies for 20 seconds. Lovestruck units have a 50% chance of healing you for 5 health when they attack." },
    // Poison 組
    { group: "Poison", ballA: "Poison", ballB: "Laser", result: "Radiation Beam", note: "Also works with Cell instead of Poison", description: "Emit a radiation beam on hit that deals 24-48 damage and applies 1 stack of radiation (max 5 stacks). Radiation lasts for 15 seconds and cause enemies to receive 10% more damage from all sources per stack" },
    { group: "Poison", ballA: "Poison", ballB: "Earthquake", result: "Swamp", note: "", description: "Leaves behind tar blobs over time. Enemies who walk into tar blobs are dealt 15-30, are slowed by 50% for 7 seconds and gain 1 stack of poison (max 8 stacks). Each stack of poison deals 1-3 damage per second. This ball and its tar blobs also deal 6-12 damage to nearby units" },
    { group: "Poison", ballA: "Poison", ballB: "Wind", result: "Noxious", note: "Also works with Dark instead of Poison", description: "Passes through enemies and applies 3 stacks of poison to nearby enemies within a 2 tile radius. Poison lasts for 4 seconds and each stack deals 1-3 damage per second." },
    { group: "Poison", ballA: "Poison", ballB: "Bomb", result: "Nuclear Bomb", note: "", description: "Explodes when hitting an enemy, dealing 300-500 damage to nearby enemies and applying 1 stack of radiation to everyone present indefinitely (max 5 stacks). Each stack of radiation increases damage received by 10%. Has a 3 second cooldown" },
    { group: "Poison", ballA: "Poison", ballB: "Ghost", result: "Virus", note: "Also works with Bleed and Cell instead of Ghost", description: "Applies 1 stack of disease to units it hits (max 8 stacks). Disease lasts for 6 seconds. Each stack of disease deals 3-6 damage per second and diseased units have a 15% chance of passing a stack to undiseased nearby enemies each second." },
    // Vampire 組
    { group: "Vampire", ballA: "Vampire", ballB: "Bleed", result: "Vampire Lord", note: "Also works with Dark instead of Bleed", description: "Each hit inflicts 3 stacks of bleed. Heals 1 health and consumes all stacks when hitting an enemy with at least 10 stacks of bleed" },
    { group: "Vampire", ballA: "Vampire", ballB: "Brood Mother", result: "Mosquito King", note: "", description: "Spawns a mosquito each time it hits an enemy. Mosquitos attack a random enemy, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health" },
    { group: "Vampire", ballA: "Vampire", ballB: "Egg Sac", result: "Mosquito Swarm", note: "", description: "Explode into 3-6 mosquitos. Mosquitos attack random enemies, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health" },
    { group: "Vampire", ballA: "Vampire", ballB: "Ghost", result: "Soul Sucker", note: "", description: "Passes through enemies and saps them, with a 30% chance of stealing 1 health and reducing their attack damage by 20%. Lifesteal chance only applies once per enemy." },
    { group: "Vampire", ballA: "Vampire", ballB: "Dark", result: "Vampire Lord", note: "", description: "Each hit inflicts 3 stacks of bleed. Heals 1 health and consumes all stacks when hitting an enemy with at least 10 stacks of bleed" },
    { group: "Vampire", ballA: "Vampire", ballB: "Charm", result: "Succubus", note: "", description: "Each hit has a 4% chance of charming the enemy for 9 seconds. Heals 1 when hitting a charmed enemy" },
    // Wind 組
    { group: "Wind", ballA: "Wind", ballB: "Lightning", result: "Storm", note: "", description: "Emits lightning to strike nearby enemies every second, dealing 1-40 damage" },
    { group: "Wind", ballA: "Wind", ballB: "Earthquake", result: "Sandstorm", note: "", description: "Goes through enemies and is surrounded by a raging storm dealing 10-20 damage per second and blinding nearby enemies for 3 seconds" },
    { group: "Wind", ballA: "Wind", ballB: "Dark", result: "Noxious", note: "Also works with Poison instead of Dark", description: "Passes through enemies and applies 3 stacks of poison to nearby enemies within a 2 tile radius. Poison lasts for 4 seconds and each stack deals 1-3 damage per second." },
    { group: "Wind", ballA: "Wind", ballB: "Freeze", result: "Blizzard", note: "Also works with Lightning instead of Wind", description: "Freezes all enemies within a 2 tile radius for 0.8 seconds, dealing 1-50 damage." },
    { group: "Wind", ballA: "Wind", ballB: "Burn", result: "Inferno", note: "", description: "Applies 1 stack of burn every second to all enemies within a 2 tile radius. Burn lasts for 6 seconds, dealing 3-7 damage per stack per second" },
    { group: "Wind", ballA: "Wind", ballB: "Poison", result: "Noxious", note: "", description: "Passes through enemies and applies 3 stacks of poison to nearby enemies within a 2 tile radius. Poison lasts for 4 seconds and each stack deals 1-3 damage per second." },
    // Other 組
    { group: "Other", ballA: "Incubus", ballB: "Succubus", result: "Satan", note: "", description: "While active, add 1 stack of burn to all active enemies per second (max 5 stacks), dealing 10-20 damage per stack per second and make them go berserk, dealing 15-24 damage to adjacent enemies every second" },
    { group: "Other", ballA: "Vampire Lord", ballB: "Mosquito King", ballB2: "Spider Queen", result: "Nosferatu", note: "", description: "Spawns a vampire bat each bounce. Vampire bats fly towards a random enemy, dealing 132-176 damage on hit, turning into a Vampire Lord" }
];

// 被動合成數據
const passivesCombos = [
    { passiveA: "Rattle", passiveB: "War Horn", result: "Cornucopia", note: "", description: "Each time baby balls are created, spawn 0-1 additional baby balls" },
    { passiveA: "Spear", passiveB: "Bullseye Amulet", result: "Elegant Rapier", note: "", description: "Balls move 40% faster and you move 20% faster. You no longer are affected by environmental hazards on the ground." },
    { passiveA: "Onion", passiveB: "Breastplate", result: "Odiferous Shell", note: "", description: "When you touch enemies, they have a 50% chance of instantly dying" },
    { passiveA: "Ghost Girdle", passiveB: "Phantom Cloak", result: "Phantom Regalia", note: "", description: "Balls go through enemies until they hit the back wall. Balls deal 50% more damage when going through enemies" },
    { passiveA: "Bottomless Chalice", passiveB: "Vampire Sword", result: "Soul Reaver", note: "", description: "Each kill heals you by 1 and you can heal past your max health at 30% efficiency." },
    { passiveA: "Crown of Thorns", passiveB: "Spike Collar", result: "Tormenters Mask", note: "", description: "Enemies have a 10% chance of dying immediately the first time they detect you" },
    { passiveA: "Fleet Feet", passiveB: "Radiant Feathers", result: "Wings of the Anointed", note: "", description: "Balls move 40% faster and you move 20% faster. You no longer are affected by environmental hazards on the ground." },
    { passiveA: "Red Dagger", passiveB: "Blue Dagger", passiveB2: "Green Dagger", passiveB3: "Emerald Dagger", result: "Deadeye's Cross", note: "4把方向暴擊匕首", description: "Increase critical hit chance to 60%" },
    { passiveA: "Spear", passiveB: "Bullseye Amulet", result: "Gracious Impaler", note: "", description: "Critical hits have a 5% chance to instantly kill enemies" }
];

// 檢查已合成記錄
let synthesized = JSON.parse(localStorage.getItem("synthesized")) || {};

// 動態生成內容
const container = document.createElement('div');
document.getElementById('content').appendChild(container); // 使用 id="content" 容器

// 分組 Balls 合成
const groups = {};
combos.forEach(combo => {
    if (!groups[combo.group]) groups[combo.group] = [];
    groups[combo.group].push(combo);
});

for (const group in groups) {
    const groupDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = translations[currentLang].ballNames[group] || group; // 確保 group 存在於 translations 中
    groupDiv.appendChild(h2);

    const ul = document.createElement('ul');
    groups[group].forEach(combo => {
        if (!translations[currentLang].ballNames[combo.ballA] || !translations[currentLang].ballNames[combo.ballB] || !translations[currentLang].results[combo.result]) {
            console.error(`Missing translation for combo:`, combo);
            return; // 跳過無效項目
        }
        const li = document.createElement('li');
        let formula = `${translations[currentLang].ballNames[combo.ballA]} × ${translations[currentLang].ballNames[combo.ballB]} → ${translations[currentLang].results[combo.result]}`;
        if (combo.ballB2) formula += ` × ${translations[currentLang].ballNames[combo.ballB2]}`;
        if (combo.note) formula += ` (${combo.note})`;
        li.innerHTML = `${formula}<br>${combo.description}<br><input type="checkbox" data-result="${combo.result}" ${synthesized[combo.result] ? "checked" : ""}> 已合成`;
        ul.appendChild(li);

        li.querySelector('input').addEventListener('change', (e) => {
            synthesized[e.target.dataset.result] = e.target.checked;
            localStorage.setItem("synthesized", JSON.stringify(synthesized));
            if (e.target.checked) li.classList.add('synthesized');
            else li.classList.remove('synthesized');
        });
    });
    groupDiv.appendChild(ul);
    container.appendChild(groupDiv);
}

// 被動合成部分
const passivesDiv = document.createElement('div');
const passivesH2 = document.createElement('h2');
passivesH2.textContent = currentLang === "zh" ? "被動合成" : "Passives";
passivesDiv.appendChild(passivesH2);

const passivesUl = document.createElement('ul');
passivesCombos.forEach(pcombo => {
    if (!translations[currentLang].passiveNames[pcombo.passiveA] || !translations[currentLang].passiveNames[pcombo.passiveB] || !translations[currentLang].passiveResults[pcombo.result]) {
        console.error(`Missing translation for passive combo:`, pcombo);
        return;
    }
    const li = document.createElement('li');
    let formula = `${translations[currentLang].passiveNames[pcombo.passiveA]} × ${translations[currentLang].passiveNames[pcombo.passiveB]} → ${translations[currentLang].passiveResults[pcombo.result]}`;
    if (pcombo.passiveB2) formula += ` × ${translations[currentLang].passiveNames[pcombo.passiveB2]}`;
    if (pcombo.passiveB3) formula += ` × ${translations[currentLang].passiveNames[pcombo.passiveB3]}`;
    if (pcombo.note) formula += ` (${pcombo.note})`;
    li.innerHTML = `${formula}<br>${pcombo.description}<br><input type="checkbox" data-result="${pcombo.result}" ${synthesized[pcombo.result] ? "checked" : ""}> 已合成`;
    passivesUl.appendChild(li);

    li.querySelector('input').addEventListener('change', (e) => {
        synthesized[e.target.dataset.result] = e.target.checked;
        localStorage.setItem("synthesized", JSON.stringify(synthesized));
        if (e.target.checked) li.classList.add('synthesized');
        else li.classList.remove('synthesized');
    });
});
passivesDiv.appendChild(passivesUl);
container.appendChild(passivesDiv);