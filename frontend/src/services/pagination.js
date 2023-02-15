import paginate from 'jw-paginate';

const paginateResult = (totalResults, page, pageSize = 20, maxPages = 3) => {
    const result = paginate(totalResults, page, pageSize, maxPages)
    return result.pages
}

export default paginate