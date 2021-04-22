import './Square.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value === -1 ? '' : props.value}
        </button>
    );
}

export default Square;