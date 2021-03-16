# To Play
1. `npm install && npm run build`
2. `npm run start`
3. `localhost:3456`

# Lore
>751 BCE

>The Dragon's Gate is a portal to a spiritual realm where deep wisdom and artifacts promising power and prestige await adventurers who can defeat its fearsome Guardians.

>The Emperor has sent an army of 100,000 to pierce the veil and recover the mysterious treasures beyond the Gate. However, the journey was beset by supernatural interventions--storms, droughts, disease, and attack by wild animals were unleashed upon the Emperor's forces by Heaven to dissuade and prevent their ambitious march. A year later, 7 soldiers remain. Today they took the steps that have finally brought the Gate within sight, and are determined to prove to their leader--and to Heaven itself--that they are worthy of their goal.

>A year earlier, when the campaign was being planned, a soldier named Yuma sought the Emperor's blessing to command a unit of 40 soldiers, as she had distinguished herself in nearly two decades of military service. As she was denied, the Emperor added insult to injury when he suggested that, "You are a fine warrior, perhaps your sons will make great Officers. This is what your Empire asks of you." She felt the pangs of this dishonor, but her heart sunk deeper still under the weight of the injustice, for justice's sake. She told the Emperor that she would die before he would possess the treasures beyond the Gate, and through her declaration, was forced to fight her way out of the capital to safety. In the months following, she was joined by a few others who had risen high in the Emperor's service, only to be shot out of the sky in similarly unjust fashions. These powerful enemies of the Empire were outlaws, who will prevent the Emperor from passing the Gate, or pass through it themselves to share its benefits with the downtrodden people of the Empire.

>The Gate is guarded by a Ryu, a 10,000-year-old dragon that can emit deadly beams of light from it's horns, as well as a Yokai, a supernatural goblin-like creature that come in various forms. This one's greatest joy is to thwart egotistic human ambitions. Finally, a Shinja, or devotee, of the Gate, stands guard as well. This devotee was once the greatest warrior in his kingdom, and with a head full of haughty presumption, he abandoned his wife and two children in order to pursue the famous treasure beyond the Gate. As he was about to be killed by the Ryu, he said, "I am glad to have traded my life for this chance." "Your reasoning," the Ryu replied, "Is flawed. You have taken joy in this journey, but have not traded only your meager life for this quest. You have traded the happiness of your family as well. This death, therefore, will not suffice as payment for your malfeasance. You must pay 3 additional lives as well." As punishment, the devotee of the Gate is required to guard it with all his strength, and die 3 additional times before he may rest in peace. Should he surrender to any challenger, he will not die by their blows. Because of his great skill, he has only died an honest death once in the previous four centuries, and patiently awaits the time when worthy opponents will take his remaining 2 lives.

## Factions & Win Conditions
### The Empire
- The Emperor's top soldiers are tasked with getting past the defenses of Dragon's Gate in order to learn forbidden knowledge and gain mythological weapons said to be hidden beyond it, for the benefit of the Empire.
- Win condition(s): Pass the gate (6 points), Eliminate Yuma's Protectors (2 points)
### Protectors
- This band of ronin, lead by Yuma, seek to prevent the Empire from passing through the gate, but want to liberate the holy relics for the good of the people.
- Win condition(s): Pass the gate (5 points), Prevent the Empire's soldiers from passing (3 points)
### Guardians
- They seek to shield the heavenly goods and forbidden knowledge from the humans... or do they shield the humans from it?
- Win conditions(s): Prevent all intruders from passing the gate (10 points)

# Play Cycle

The game requires 3 players. Every combination of players controlling each faction is played. Therefore there are 6 rounds, as follows, where `[1,2,3]` represents each player, and `[E,P,G]` represents each faction.  
```
1E 2P 3G
1E 2G 3P
1P 2E 3G
1P 2G 3E
1G 2E 3P
1G 2P 3E
```
The winner of the game is determined by the combined score of all rounds for each player.

# Faction Details
## The Empire
- The Empire's troops consist of 7 elite soldiers and 1 flag-bearer.
- Elite Soldiers' Ax and Ay are +2 while the Flag-Bearer is alive.
- Feeling the weight of responsibility grow as each comrade falls, these soldiers' stats increase by 1 point in each of the following categories for every two deceased Imperial units: R, S, A (x and y), and D (x and y).
---
## Yuma's Protectors
- This troupe consists of 3 fighters using special weapons, and Yuma.
### Yuma
- Can move again after attacking.
### Kusarigama (sickle, weight, and chain)
- Before attacking, roll `2d6` to immobilize the enemy. If the roll >= 8, double the result of the damage roll that follows. The unit that was immobilized will not be able to move next turn (but will be able to attack).
### Daisho (two swords)
- Can attack twice per turn.
### Shuriken
- Must choose between ranged and melee attack when fighting
- Can use ranged weapons on anyone up to 10cm away, but the number of die rolled for Ranged Damage is reduced by 1 for every 2cm in distance to the target.
- A ranged attack from Shuriken has a chance to leave the defender `POISONED`.
---
## Guardians
- These spirits consist of 1 Ryu (dragon), 1 Yokai (demon-like creature) and 1 human Shinja (devotee).
### Ryu
- Ryu has two attacks, a ranged attack and a melee attack. The stats for these correspond to the 1st and second stats (ranged and melee), respectively, for R and A.
- Ranged attack: Each piece on the board not belonging to the Guardians must be numbered from 1 to n. Each turn, generate a random number in this range, and the unit for this number will be the target of Ryu's ranged attack. The number generator can produce a 0, in which case no unit was targeted by Ryu's ranged attack this turn.
### Yokai
- Can move twice or attack twice.
- Melee attacks from the Yokai have a chance of leaving the defending unit `DAMNED`.
### Shinja (Devotee)
- Every turn while deceased, if S. has not already been revived twice, roll `d4` to revive the unit with full health at it's original starting point. A roll of 1 or 2 will revive S.

# Unit Actions
Unit statistics include: Health Points (H), Movement Speed (S), Attack Strength (A), Range (R), Armor Defense (D), and Health Regeneration (HR).
## Unit Statuses
#### `HEALTHY`
- Unit is not impaired and functions according to all normal rules. Does not mean the unit is not wounded or low on `HP`.
#### `POISONED`
- Unit will lose `1 HP` per turn after being poisoned.
#### `DAMNED`
- Unit will die on the 3rd turn after being `DAMNED`, regardless of `HP`.
## Movement
- Each unit can move once per turn, before attacking (unless otherwise specified).
## Combat
- Each unit can attack once per turn after moving (if moving).
- Units must be within range to attack.
- The damage done by an attack is equal to the roll result for the weapon minus the roll result for the defending unit's armor.
- Resulting HP is reduced by the final calculated damage.
## Health Regeneration
- Units regenerate health by their Health Regeneration value per turn if they are more than 2cm away from all enemy units, and within 2cm of any unit from their own faction.
- Guardians regenerate health every other turn, regardless of their proximity to other units.