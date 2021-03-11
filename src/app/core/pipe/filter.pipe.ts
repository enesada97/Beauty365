import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, filtertext?: any): any {

        if (!value) return null;
        if (!filtertext) return value;

        filtertext = filtertext.toLowerCase();

        return value.filter(function (item: any) {
            return JSON.stringify(item).toLowerCase().includes(filtertext);
        });
    }
}
