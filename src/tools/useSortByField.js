function sortByField (list, field) {
    if (!list.length) return []
    return list.sort((prev, next) => {
        if ( prev[field].toString().toUpperCase() < next[field].toString().toUpperCase() ) return -1;
        if ( prev[field].toString().toUpperCase() < next[field].toString().toUpperCase() ) return 1;
    })
}

export {
    sortByField,
}
