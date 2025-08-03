type DieProps = {
    id: string
    value: number
    isHeld: boolean
    hold: (id: string) => void
}
export default function Die(props: DieProps): React.JSX.Element {
    const styles: {backgroundColor: string} = {backgroundColor: props.isHeld? "#59E391" : "white" }
    return(
        <button 
            onClick={()=> (props.hold(props.id))} 
            style={styles} 
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}  
        >
                {props.value} 
        </button>
    )
}