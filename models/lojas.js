
const init = (connection) => {

    const findAll = async (params) => {
        const currentPage = params.currentPage 
        const pageSize = params.pageSize
        let next = false

        const results = await connection('loja')
            .select('*')
            .offset(currentPage * pageSize)
            .limit(pageSize)
            .orderBy('id', 'asc')

        if(results.length>0){
            const lastResult = results[results.length-1]
            const nextResult = await connection('loja')
                .select('*')
                .where(function () {
                    this.where('id', '>', lastResult.id)
                })
                .limit(1)
                .orderBy('id', 'asc')
            
            if (nextResult.length==1) {
                next=true
            }
        }

        return {
            data: results,
            pagination: {
                pageSize,
                currentPage,
                next
            }
        }
    }

    return {
        findAll
    }
}

module.exports = init