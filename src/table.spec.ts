import { TableModel, TVisibleTableData } from './model'
import { TTableData } from './types'

type TFixture = {
  data: TTableData
  minRowHeight: number
  areaHeight: number
  additionalAreaHeight: number
  scrollPosition: number
  expected: TVisibleTableData
}

const data: TTableData = {
  headRowsCount: 1,
  dataHeadColumnsCount: 2,
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

const fixtures: TFixture[] = [
  {
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
      stickyRows: expect.anything(),
      values: data.values.slice(1, 4),
    },
  },
  {
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
      stickyRows: expect.anything(),
      values: data.values.slice(1, 5),
    },
  },
]

fixtures.forEach((fixture, index) => {
  it(`fixture #${index + 1}`, () => {
    const model = new TableModel(fixture.data, () => {}, fixture.minRowHeight)

    model.setAreaHeight(fixture.areaHeight, fixture.additionalAreaHeight)
    model.setScrollPosition(fixture.scrollPosition)

    expect(model.visibleTableData).toEqual(fixture.expected)
  })
})
