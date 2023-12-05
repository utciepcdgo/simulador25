// Purpose: Contains functions that are used in multiple files.

export function chunkArray(array: any[], chunkSize: number): any[][] {
    const chunkedArray: any[][] = [];
    while (array.length > 0) {
        chunkedArray.push(array.splice(0, chunkSize));
    }

    return chunkedArray;
}

export function getArrayFromObject(object: any): any[] {
    const array: any[] = [];
    for (const key in object) {
        array.push(object[key]);
    }

    return array;
}