// Generated by dts-bundle-generator v5.9.0

/// <reference types="prop-types" />
/// <reference types="react" />
/// <reference types="scheduler" />

export declare type TCellData = {
	span?: number;
	id?: string;
	isLink?: boolean;
	styles?: string[];
	value: string | number;
};
export declare type TTableData = {
	values: TCellData[][];
	headRowsCount: number;
	dataHeadColumnsCount: number;
};
export declare type TProps = {
	table: TTableData;
	className?: string;
};
export declare const ReactTable: React.FC<TProps>;

export {};
