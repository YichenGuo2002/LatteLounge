import http from "../http-common"

class CoffeeHouseDataService{
    getAll(page = 0){
        return http.get(`?page=${page}`)
    }

    get(id){
        return http.get(`/id/${id}`)
    }

    find(query, page = 0){
        if(query){
            let queryString = ""
            for (const property in query) {
                queryString += `${property}=${query[property]}&`;
            }
            console.log("Query String is", queryString)
            return http.get(`?${queryString}page=${page}`)
        }
        else{
            return http.get(`?page=${page}`)
        }
    }

    createReview(data){
        return http.post("/review", data)
    }

    updateReview(data){
        return http.put("/review", data)
    }

    deleteReview(id, userId){
        return http.delete(`/review?id=${id}`, {data:{user_id: userId}})
    }

    getPrice(id){
        return http.get(`/price`)
    }
}

export default new CoffeeHouseDataService