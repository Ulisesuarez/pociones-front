var arrayTesteo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];


function paginar(listaAPaginar, pageSize, page) {
    let paginado = {
        page: null,
        pageSize: null,
        pageCount: null,
        content: null
    };

    paginado.page = page;
    paginado.pageSize = pageSize;
    paginado.pageCount = Math.ceil(listaAPaginar.length / pageSize);

    let minimunElement = (pageSize * page);
    let maxElement = pageSize + (pageSize * page) ;

    paginado.content = listaAPaginar.slice(minimunElement, maxElement);

    return paginado;

}


console.log(paginar(arrayTesteo, 5, 1));