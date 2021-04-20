import React, { useEffect, useState } from 'react';
import { ReactTable } from '../src';
function App() {
    const [_, redraw] = useState(0);
    const [data, setData] = useState(null);
    useEffect(() => {
        const name = location.hash === '#invert' ? 'big_invert.json' : 'big.json';
        // const name = 'big.json'
        // const name = 'data.json'
        fetch(`./demo/${name}`)
            .then((response) => response.json())
            .then(setData);
    }, []);
    if (!data)
        return React.createElement("div", null, "loading...");
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: () => setData({ ...data }) }, "new data"),
        React.createElement("button", { onClick: () => {
                redraw(Math.random());
            } }, "redraw"),
        React.createElement(ReactTable, { table: data, seed: Math.random() })));
}
export default App;
