import React, { useEffect, useRef } from 'react';
import { Table } from './renderer';
const ReactTable = ({ table, seed }) => {
    console.log('ReactTable');
    const ref = useRef();
    useEffect(() => {
        Table({ table, target: ref.current });
    }, [table, seed]);
    return React.createElement("div", { ref: ref });
};
export { ReactTable };
