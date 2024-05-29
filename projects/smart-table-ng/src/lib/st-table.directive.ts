import {Directive, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {
    SortConfiguration,
    DisplayedItem,
    FilterConfiguration,
    SliceConfiguration,
    WorkingIndicator,
    SmartTableEvents as StEvents,
    DisplayChangeCallback,
    SortChangeCallback,
    FilterChangeCallback,
    PageChangeCallback,
    WorkingIndicatorChangeCallback
} from 'smart-table-core';

function handleSortChange<T>(this: StTableDirective<T>, state: SortConfiguration) {
    this.sort.emit(state);
}

function handleDisplayChange<T>(this: StTableDirective<T>, items: DisplayedItem<T>[]) {
    this.items = items;
    this.display.emit(items);
}

function handleFilterChange<T>(this: StTableDirective<T>, state: FilterConfiguration) {
    this.filter.emit(state);
}

function handleSliceChange<T>(this: StTableDirective<T>, state: SliceConfiguration) {
    this.slice.emit(state);
}

function handleExecChange<T>(this: StTableDirective<T>, state: WorkingIndicator) {
    this.busy = state.working;
    this.exec.emit(state);
}


@Directive({
    selector: '[stTable]',
    exportAs: 'stTable'
})
export class StTableDirective<T> implements OnInit, OnDestroy {
    items: DisplayedItem<T>[] = [];
    busy = false;
    private displayHandler: DisplayChangeCallback<T>;
    private sortHandler: SortChangeCallback;
    private filterHandler: FilterChangeCallback;
    private sliceHandler: PageChangeCallback;
    private execHandler: WorkingIndicatorChangeCallback;

    @Output() display = new EventEmitter<DisplayedItem<T>[]>();
    @Output() sort = new EventEmitter<SortConfiguration>();
    @Output() filter = new EventEmitter<FilterConfiguration>();
    @Output() slice = new EventEmitter<SliceConfiguration>();
    @Output() exec = new EventEmitter<WorkingIndicator>();

    constructor(private table: SmartTable<T>) {
    }

    ngOnInit() {
        this.displayHandler = handleDisplayChange.bind(this as any);
        this.sortHandler = handleSortChange.bind(this as any);
        this.filterHandler = handleFilterChange.bind(this as any);
        this.sliceHandler = handleSliceChange.bind(this as any);
        this.execHandler = handleExecChange.bind(this as any);
        this.table.onDisplayChange(this.displayHandler);
        this.table.on(StEvents.TOGGLE_SORT, this.sortHandler);
        this.table.on(StEvents.FILTER_CHANGED, this.filterHandler);
        this.table.on(StEvents.PAGE_CHANGED, this.sliceHandler);
        this.table.on(StEvents.EXEC_CHANGED, this.execHandler);
        this.table.init();
    }

    ngOnDestroy() {
        this.table.off(StEvents.DISPLAY_CHANGED, this.displayHandler);
        this.table.off(StEvents.TOGGLE_SORT, this.sortHandler);
        this.table.off(StEvents.FILTER_CHANGED, this.filterHandler);
        this.table.off(StEvents.PAGE_CHANGED, this.sliceHandler);
        this.table.off(StEvents.EXEC_CHANGED, this.execHandler);
    }
}
