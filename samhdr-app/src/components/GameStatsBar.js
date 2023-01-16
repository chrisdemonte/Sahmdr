import '../App.css'
import sword_sym from '../assets/sword_symbol.png'
import arrow_sym from '../assets/arrow_symbol.png'
import magic_sym from '../assets/magic_symbol.png'
import healing_sym from '../assets/healing_symbol.png'
import defense_sym from '../assets/defense_symbol.png'
import resist_sym from '../assets/resistance_symbol.png'

function GameStatsBar(props){

    const [stats, setStats] = props.stats

    return (
        <div className="game--stats-bar">
            <h2 className="game--stat">Health: {stats[0]}</h2>
            <img src={sword_sym} alt="Swords: " className="game--stat-img"/>
            <h2 className="game--stat">: {stats[1]}</h2>
            <img src={arrow_sym} alt="Arrows: " className="game--stat-img"/>
            <h2 className="game--stat">: {stats[2]}</h2>
            <img src={magic_sym} alt="Magic: " className="game--stat-img"/>
            <h2 className="game--stat">: {stats[3]}</h2>
            <img src={healing_sym} alt="Healing: " className="game--stat-img"/>
            <h2 className="game--stat">: {stats[4]}</h2>
            <img src={defense_sym} alt="Defense: " className="game--stat-img"/>
            <h2 className="game--stat">: {stats[5]}</h2>
            <img src={resist_sym} alt="Resistance: " className="game--stat-img"/>
            <h2 className="game--stat">: {stats[6]}</h2>
        </div>
    )
}
export default GameStatsBar