# Average Rating 

_Static methods, which are properties of the Schema can be used by the model while Instance methods can be used by the documents_

**For Rating create a Static Method as below**

```
tourSchema.statics.calcAverageRatings = async function(tourId){

	// the 'this' keyword points to the Model and not the document as this is a static method
	const stats = await this.aggregate([
		{
			$match: {tour : tourId}
		},
		{
			$group : {
				_id : '$tour',
				nRating : {$sum : 1},
				avgRating :{$avg : '$rating'}
			}
		}

		])


	if(stats.length>0){
	await Tour.findByIdAndUpdate(tourId,{
	ratingsQuantity : stats[0].nRating,
	ratingsAverage : stats[0].avgRating
	})
	}else{
	await Tour.findByIdAndUpdate(tourId,{
	ratingsQuantity : 0,
	ratingsAverage : 4.5
	})	
	}

}

```

**Call the static method in the pre-save middleware**

```

reviewSchema.pre('save',function(next){

	// the 'this' keyword points to the document as this is a document middleware
	// the usag of this.constructor below points to the Model as the model is declared only at the end so we cannot use Model.calcAverageRating (Review.calcAverageRating())

	this.constructor.calcAverageRating(this.tour)


next()

	})


```

_The above method works fine for a new object as it uses the pre-save middleware that only works when you create() or save()._
_However during update or delete where the save() or create() methods are not used we need to use the query middleware instead of the document middleware_
_The trick in this case is to find a way to reference the document and then the model via the query_


**Create a pre-query middleware to reference the document**

```

reviewSchema.pre(/^findOneAnd/, function(){

	this.r = await this.findOne();

	})


```

**Create a post-query middleware to ensure the current data is used in the calculation and then updated in the database**

```
reviewSchema.post(/^findOneAnd/, async function(){

	this.r.constructor.calcAverageRating(this.r.tour); // make sure there's no populate() query on tour



	})

```