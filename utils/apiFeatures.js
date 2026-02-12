class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString; //It is req.query
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        console.log(JSON.parse(queryStr));

        this.query.find(JSON.parse(queryStr));

        // let query = Tour.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            // console.log(sortBy);
            this.query = this.query.sort(sortBy);
            //sort(price ratingsAverage)
        } else {
            this.query = this.query.sort('-createdAt'); //so that newest wale tour top pe ho
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields); //inculde karna result mai
        } else {
            this.query = this.query.select('-__v'); // "-" means exclude karna result se
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        // if (req.query.page) {  //to handle if we have no documents futher
        //   const numTours = await Tour.countDocuments();
        //   if (skip >= numTours) throw new Error('This Page does not exist');
        // } commeneted becoz req a page with no result is not an error

        return this;
    }
}
module.exports = APIfeatures;