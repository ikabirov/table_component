class TableModel {
    constructor(data, onChange, minRowHeight) {
        this.areaHeight = 0;
        this.additionalArea = 0;
        this.lastDataSnapshot = {
            dataHeadColumnsCount: 0,
            headRowsCount: 0,
            offset: 0,
            startRowIndex: 0,
            values: [],
            headerRows: [],
        };
        this.scrollPosition = 0;
        this.setScrollPosition = (value) => {
            if (this.scrollPosition !== value) {
                this.scrollPosition = value;
                this.commit();
            }
        };
        this.setAreaHeight = (height, additionalAreaHeight) => {
            this.areaHeight = height;
            this.additionalArea = additionalAreaHeight;
            this.commit();
        };
        this.data = data;
        this.rowHeights = new Array(data.values.length).fill(minRowHeight);
        this.onChange = onChange;
    }
    get contentHeight() {
        return this.rowHeights.reduce((acc, current) => acc + current, 0) + 1;
    }
    get visibleTableData() {
        return this.lastDataSnapshot;
    }
    getRowInfo(index) {
        const span = this.data.values[index][0].span || 1;
        const height = this.rowHeights.slice(index, index + span).reduce((acc, value) => acc + value, 0);
        return {
            span,
            height,
        };
    }
    commit() {
        let offset = 0;
        let start = this.data.headRowsCount;
        let height = 0;
        const visibleHeight = this.areaHeight -
            this.rowHeights.slice(0, this.data.headRowsCount).reduce((acc, value) => acc + value, 0);
        const top = Math.max(0, this.scrollPosition - this.additionalArea);
        const bottom = this.scrollPosition + visibleHeight + this.additionalArea;
        let rowInfo = this.getRowInfo(start);
        while (rowInfo.height + offset < top) {
            offset += rowInfo.height;
            start += rowInfo.span;
            rowInfo = this.getRowInfo(start);
        }
        let end = start + 1;
        while (height + offset + this.rowHeights[end] < bottom) {
            height += this.rowHeights[end];
            ++end;
        }
        if (this.lastDataSnapshot.startRowIndex !== start ||
            this.lastDataSnapshot.values.length + this.lastDataSnapshot.startRowIndex !== end) {
            this.lastDataSnapshot = {
                startRowIndex: start,
                offset,
                dataHeadColumnsCount: this.data.dataHeadColumnsCount,
                headRowsCount: 0,
                values: this.data.values.slice(start, end),
                headerRows: this.data.values.slice(0, this.data.headRowsCount),
            };
            this.onChange();
        }
    }
    setRowHeights(start, values) {
        this.rowHeights.splice(start, values.length, ...values);
    }
}
export { TableModel };
