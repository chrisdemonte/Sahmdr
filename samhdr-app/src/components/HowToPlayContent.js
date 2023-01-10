import "../App.css"

export default function HowToPlayContent(){
    const rules = [
        "1. How to play:",

        "Samhdr is a turn based card game where the goal is to be the player with the most health by the end of the game. "+
        "The game ends when both players run out of usable cards, or one player reaches zero health. " +
        "Before each game, players create a deck by selecting three of the six suits. "+
        "Each suit has 13 cards (1-10, Jack, Queen, and King) for a deck with 39 cards total. "+
        "In round one, player 1 attacks first and player 2 defends against them. "+
        "In round two, player 2 attacks and player 1 defends against them, and so on. ",

        "2. Offensive Moves: ",
        
        "PLAY: use a card's primary effect.",
        "PLAY FACE DOWN: use a card's secondary effect. ",
        "STACK: combine the card with another card of the same suit to add their values together. ",
        "WILDCARD: going forawrd any card with same value as the wildcard has a value of 13. ",

        "3. Densive Moves:",

        "PLAY: counter your opponent's card if they used PLAY or PLAY FACE DOWN. You cannot counter STACK or WILDCARD.",

        "4. The Suits:",

        "Swords: ",
        "Primary Effect: Damage opponent for an amount equal to the card's value. " ,
        "Secondary Effect: One damage to opponent each turn for a number of turns equal to the card's value. ",
        "Countered by: Swords, Defense.",

        "Arrows: ",
        "Primary Effect: Damage opponent for an amount equal to the card's value. ",
        "Secondary Effect: One damage to opponent each turn for a number of turns equal to the card's value. ",
        "Countered by: Arrows, Defense.",

        "Magic:",
        "Primary Effect: Damage opponent for an amount equal to the card's value. ",
        "Secondary Effect: One damage to opponent each turn for a number of turns equal to the card's value. ",
        "Countered by: Magic, Resistance.",

        "Healing:", 
        "Primary Effect: Heal self for an amount equal to the card's value. ",
        "Secondary Effect: Heal self for one health point each turn for a number of turns equal to the card's value. ",
        "Countered by: Healing, Resistance",

        "Defense:",
        "Primary Effect: Damage opponent for an amount equal to the card's value. " ,
        "Secondary Effect: Heal self for one health point each turn for a number of turns equal to the card's value. ",
        "Countered by: Magic, Healing, Defense",

        "Resistance:",
        "Primary Effect: Damage opponent for an amount equal to the card's value. ",
        "Secondary Effect: Heal self for one health point each turn for a number of turns equal to the card's value. ",
        "Countered by: Swords, Arrows, Resistance"
    ]

    return (
        <div className="main--content">
            <h1>{rules[0]}</h1>
            <h3>{rules[1]}</h3>
            <h1>{rules[2]}</h1>
            <h3><ul>
                <li>{rules[3]}</li>
                <li>{rules[4]}</li>
                <li>{rules[5]}</li>
                <li>{rules[6]}</li>
            </ul></h3>
            <h1>{rules[7]}</h1>
            <h3><ul>
                <li>{rules[8]}</li>
            </ul></h3>
            <h1>{rules[9]}</h1>
            <h3><ul>
                <li>{rules[10]}</li>
                <ul>
                    <li>{rules[11]}</li>
                    <li>{rules[12]}</li>
                    <li>{rules[13]}</li>
                </ul>
                <li>{rules[14]}</li>
                <ul>
                    <li>{rules[15]}</li>
                    <li>{rules[16]}</li>
                    <li>{rules[17]}</li>
                </ul>
                <li>{rules[18]}</li>
                <ul>
                    <li>{rules[19]}</li>
                    <li>{rules[20]}</li>
                    <li>{rules[21]}</li>
                </ul>
                <li>{rules[22]}</li>
                <ul>
                    <li>{rules[23]}</li>
                    <li>{rules[24]}</li>
                    <li>{rules[25]}</li>
                </ul>
                <li>{rules[26]}</li>
                <ul>
                    <li>{rules[27]}</li>
                    <li>{rules[28]}</li>
                    <li>{rules[29]}</li>
                </ul>
                <li>{rules[30]}</li>
                <ul>
                    <li>{rules[31]}</li>
                    <li>{rules[32]}</li>
                    <li>{rules[33]}</li>
                </ul>
 
            </ul></h3>
        </div>
    )
}