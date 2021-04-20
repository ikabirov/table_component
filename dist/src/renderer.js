import { html, render } from 'uhtml';
import { TableModel } from './model';
const CELL_WIDTH = 150;
function Cell({ cell, rowIndex, columnIndex, isRowHeader, isColumnHeader, meta, }) {
    if (meta[rowIndex]?.[columnIndex]) {
        return [];
    }
    const colSpan = isRowHeader ? cell?.span : undefined;
    const rowSpan = isColumnHeader ? cell?.span : undefined;
    if (colSpan) {
        for (let i = 1; i < colSpan; ++i) {
            meta[rowIndex] = meta[rowIndex] || {};
            meta[rowIndex][columnIndex + i] = true;
        }
    }
    if (rowSpan) {
        for (let i = 1; i < rowSpan; ++i) {
            const row = rowIndex + i;
            meta[row] = meta[row] || {};
            meta[row][columnIndex] = true;
        }
    }
    const style = isRowHeader && rowIndex === 0
        ? `font-weight: bold; position: sticky; top: 0px; width: 150px; background: #efefef;z-index: ${isColumnHeader ? 2 : 1};left: ${isColumnHeader ? columnIndex * CELL_WIDTH + 'px' : 'unset'};`
        : `font-weight: bold; position: ${isColumnHeader ? 'sticky' : 'static'}; left: ${columnIndex * CELL_WIDTH}px; width: 150px; background: ${isRowHeader || isColumnHeader ? '#efefef' : '#fff'}`;
    return html `<td colspan=${colSpan} rowspan=${rowSpan} style=${style}>
    <div
      style="display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;overflow:hidden"
    >
      ${cell.value}
    </div>
  </td>`;
}
function Row({ key, row, rowIndex, isRowHeader, dataHeadColumnsCount, meta, }) {
    return html.for(key, rowIndex.toString()) `<tr
    data-rowIndex=${rowIndex}
  >
    ${row.flatMap((cell, columnIndex) => Cell({
        cell,
        rowIndex,
        columnIndex,
        isRowHeader,
        isColumnHeader: dataHeadColumnsCount > columnIndex,
        meta,
    }))}
  </tr>`;
}
function TableRenderer(key, start, { values: table, headRowsCount, dataHeadColumnsCount }) {
    const meta = {};
    return html `
    <table>
      ${table.map((row, index) => {
        const rowIndex = start + index;
        return Row({
            key,
            row,
            rowIndex,
            isRowHeader: headRowsCount > rowIndex,
            dataHeadColumnsCount,
            meta,
        });
    })}
    </table>
  `;
}
function TableContainer(content, headers, height, offset, onScroll, scroll) {
    return html `
    <div
      style="width: 100%; height: 900px; overflow: auto"
      ref=${(node) => {
        node.scroll(node.scrollLeft, scroll);
    }}
      onscroll=${(e) => {
        onScroll(e.target.scrollTop);
    }}
    >
      <div style=${`height: ${height}px;`}>
        <div style="position: sticky; top: 0; z-index: 1; margin-bottom: -1px">${headers}</div>
        <div style=${`transform: translateY(${offset}px)`}>${content}</div>
      </div>
    </div>
  `;
}
function Table({ table, target }) {
    const model = new TableModel(table, redraw, 40);
    function redraw() {
        const data = model.visibleTableData;
        const headers = TableRenderer(model, 0, {
            dataHeadColumnsCount: data.dataHeadColumnsCount,
            headRowsCount: data.headerRows.length,
            values: data.headerRows,
        });
        const content = TableRenderer(target, data.startRowIndex, data);
        render(target, TableContainer(content, headers, model.contentHeight, data.offset, model.setScrollPosition, model.scrollPosition));
        const [headerTable, contentTable] = target.querySelectorAll('table');
        function updateHeights(index, table) {
            const rowHeights = [...(table?.children || [])].map((row) => row.clientHeight);
            model.setRowHeights(index, rowHeights);
        }
        updateHeights(0, headerTable);
        updateHeights(data.startRowIndex, contentTable);
    }
    model.setAreaHeight(900, 300);
}
export { Table };
