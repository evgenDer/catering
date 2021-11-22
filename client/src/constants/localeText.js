export const LOCALE_TEXT = {
  // Root
  noRowsLabel: 'Таблица пустая',
  noResultsOverlayLabel: 'Результаты не найдены',
  errorOverlayDefaultLabel: 'Произошла ошибка',

  // Density selector toolbar button text
  toolbarDensity: 'Плотность',
  toolbarDensityLabel: 'Плотность',
  toolbarDensityCompact: 'Сжатый',
  toolbarDensityStandard: 'Стандартный',
  toolbarDensityComfortable: 'Удобный',

  // Columns selector toolbar button text
  toolbarColumns: 'Колонки',
  toolbarColumnsLabel: 'Выбрать колонки',

  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarFiltersTooltipHide: 'Спрятать фильтры',
  toolbarFiltersTooltipShow: 'Показать фильтры',
  toolbarFiltersTooltipActive: (count) => (count !== 1 ? `${count} активных фильтров` : `${count} active filter`),

  // Export selector toolbar button text
  toolbarExport: 'Скачать',
  toolbarExportLabel: 'Скачать',
  toolbarExportCSV: 'Скачать CSV',
  toolbarExportPrint: 'Печать',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Спрятать колонки',
  columnsPanelTextFieldPlaceholder: 'Спрятать заголовок',
  columnsPanelDragIconLabel: 'Перемешать колонки',
  columnsPanelShowAllButton: 'Показать все',
  columnsPanelHideAllButton: 'Спрятать все',

  // Filter panel text
  filterPanelAddFilter: 'Добавить фильтры',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelOperators: 'Операторы',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: '',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',

  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равно',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается с',
  filterOperatorIs: 'это',
  filterOperatorNot: 'это не',
  filterOperatorAfter: 'это после',
  filterOperatorOnOrAfter: 'включено или после',
  filterOperatorBefore: 'это до',
  filterOperatorOnOrBefore: 'включено или до',
  filterOperatorIsEmpty: 'пусто',
  filterOperatorIsNotEmpty: 'не пусто',

  // Filter values text
  filterValueAny: 'какой-нибудь',
  filterValueTrue: 'правда',
  filterValueFalse: 'ложь',

  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать колонки',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Спрятать',
  columnMenuUnsort: 'Несортированный',
  columnMenuSortAsc: 'Сортировать по алфавиту',
  columnMenuSortDesc: 'Сортировать по убыванию',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => (count !== 1 ? `${count} активные фильтры` : `${count} активный фильтр`),
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировать',

  // Rows selected footer text
  footerRowSelected: (count) => (count !== 1
    ? ''
    : ''),

  // Total rows footer text
  footerTotalRows: 'Общее количество:',

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Выбрать',

  // Boolean cell text
  booleanCellTrueLabel: 'правда',
  booleanCellFalseLabel: 'ложь',

  // Actions cell more text
  actionsCellMore: 'Больше',

  // Used core components translation keys
  MuiTablePagination: {},
};
