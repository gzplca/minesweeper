import React, { useState } from 'react';

function OptionForm() {
    const [row, setRow] = useState(0);

    return (
        <div>
            <input onChange={event => setRow(event.target.value)}/>
        </div>
    );
}

export default OptionForm;