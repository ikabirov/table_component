import { TableModel, TVisibleTableData } from './model'
import { TTableData } from './types'

type TFixture = {
  name?: string
  data: TTableData
  minRowHeight: number
  areaHeight: number
  additionalAreaHeight: number
  scrollPosition: number
  stickyHeader?: boolean
  mergeCells?: boolean
  expected: Partial<TVisibleTableData>
}

type TUseCase = {
  name: string
  fixtures?: TFixture[]
  useCases?: TUseCase[]
}

type TTests = TUseCase[]

globalThis.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }

  disconnect() {}
}

const data: TTableData = {
  headRowsCount: 1,
  dataHeadColumnsCount: 2,
  columnsOrder: ['1', '2', '3'],
  values: [
    [{ value: 'Группа' }, { value: 'Район' }, { value: 'Сумма' }],
    [
      { value: 'Детскийсад', span: 2 },
      { value: 'Адмиралтейский', span: 1 },
      { value: '507 404 368.04' },
    ],
    [
      { value: 'Детскийсад', span: 2 },
      { value: 'Калининский', span: 1 },
      { value: '892 864 964.06' },
    ],
    [
      { value: 'Диспансер', span: 2 },
      { value: 'Адмиралтейский', span: 1 },
      { value: '131 825 404.12' },
    ],
    [
      { value: 'Диспансер', span: 2 },
      { value: 'Петроградский', span: 1 },
      { value: '451 555 164.49' },
    ],
    [
      { value: 'Школаобщеобразовательная', span: 2 },
      { value: 'Адмиралтейский', span: 1 },
      { value: '579 710 817.46' },
    ],
    [
      { value: 'Школаобщеобразовательная', span: 2 },
      { value: 'Калининский', span: 1 },
      { value: '1 230 838 233.39' },
    ],
  ],
}

const dataWithoutHeaderRows = {
  ...data,
  headRowsCount: 0,
}

const allTests: TTests = [
  {
    name: 'without header rows',
    fixtures: [
      {
        name: 'simple',
        data: dataWithoutHeaderRows,
        minRowHeight: 50,
        areaHeight: 120,
        additionalAreaHeight: 0,
        scrollPosition: 60,
        expected: {
          headRowsCount: 0,
          dataHeadColumnsCount: 2,
          offset: 50,
          startRowIndex: 1,
          headerRows: [],
          values: data.values.slice(1, 5),
          columnsOrder: dataWithoutHeaderRows.columnsOrder,
        },
      },
      {
        name: 'should consider first cell span',
        data: dataWithoutHeaderRows,
        minRowHeight: 50,
        areaHeight: 120,
        additionalAreaHeight: 0,
        scrollPosition: 110,
        expected: {
          headRowsCount: 0,
          dataHeadColumnsCount: 2,
          offset: 50,
          startRowIndex: 1,
          headerRows: [],
          values: data.values.slice(1, 5),
          columnsOrder: dataWithoutHeaderRows.columnsOrder,
        },
      },
    ],
    useCases: [
      {
        name: 'with additional area',
        fixtures: [
          {
            data: dataWithoutHeaderRows,
            minRowHeight: 50,
            areaHeight: 120,
            additionalAreaHeight: 25,
            scrollPosition: 60,
            expected: {
              headRowsCount: 0,
              dataHeadColumnsCount: 2,
              offset: 0,
              startRowIndex: 0,
              headerRows: [],
              values: data.values.slice(0, 5),
              columnsOrder: dataWithoutHeaderRows.columnsOrder,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'with header rows',
    fixtures: [
      {
        name: 'empty',
        data: {
          dataHeadColumnsCount: 0,
          headRowsCount: 0,
          values: [],
          columnsOrder: [],
        },
        minRowHeight: 50,
        areaHeight: 120,
        additionalAreaHeight: 0,
        scrollPosition: 0,
        expected: {
          headRowsCount: 0,
          dataHeadColumnsCount: 0,
          offset: 0,
          startRowIndex: 0,
          headerRows: [],
          values: [],
          columnsOrder: [],
        },
      },
      {
        name: 'simple',
        data,
        minRowHeight: 50,
        areaHeight: 120,
        additionalAreaHeight: 0,
        scrollPosition: 60,
        expected: {
          headRowsCount: 0,
          dataHeadColumnsCount: 2,
          offset: 0,
          startRowIndex: 1,
          headerRows: data.values.slice(0, 1),
          values: data.values.slice(1, 5),
          columnsOrder: data.columnsOrder,
        },
      },
      {
        name: 'empty cells',
        data,
        minRowHeight: 50,
        areaHeight: 120,
        additionalAreaHeight: 0,
        scrollPosition: 160,
        expected: {
          headRowsCount: 0,
          dataHeadColumnsCount: 2,
          offset: 100,
          startRowIndex: 3,
          headerRows: data.values.slice(0, 1),
          values: data.values.slice(3, 7),
          columnsOrder: data.columnsOrder,
        },
      },
    ],
  },
  {
    name: 'without sticky header',
    fixtures: [
      {
        name: 'simple',
        data,
        minRowHeight: 50,
        areaHeight: 140,
        additionalAreaHeight: 0,
        scrollPosition: 40,
        stickyHeader: false,
        expected: {
          headRowsCount: 1,
          dataHeadColumnsCount: 2,
          offset: 0,
          startRowIndex: 0,
          headerRows: null,
          values: data.values.slice(0, 5),
          columnsOrder: data.columnsOrder,
        },
      },
    ],
  },
  {
    name: 'without merge cells',
    fixtures: [
      {
        name: 'without sticky headers',
        data,
        minRowHeight: 50,
        areaHeight: 120,
        additionalAreaHeight: 0,
        scrollPosition: 60,
        stickyHeader: false,
        mergeCells: false,
        expected: {
          headRowsCount: 1,
          dataHeadColumnsCount: 2,
          offset: 50,
          startRowIndex: 1,
          headerRows: null,
          values: data.values.slice(1, 4),
          columnsOrder: data.columnsOrder,
        },
      },
    ],
  },
]

function runUseCase(useCase: TUseCase) {
  describe(useCase.name, () => {
    useCase.fixtures?.forEach((fixture, index) => {
      it(fixture.name || `test #${index + 1}`, () => {
        const model = new TableModel({
          data: fixture.data,
          onChange: () => {},
          minRowHeight: fixture.minRowHeight,
          stickyHeader: fixture.stickyHeader !== false,
          mergeCells: fixture.mergeCells !== false,
        })

        model.setAreaHeight(fixture.areaHeight, fixture.additionalAreaHeight)
        model.setScrollPosition(fixture.scrollPosition, 0)

        expect(model.visibleTableData).toMatchObject(fixture.expected)
      })
    })

    useCase.useCases?.forEach(runUseCase)
  })
}

allTests.forEach(runUseCase)
