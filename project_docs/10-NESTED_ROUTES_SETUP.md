# Nested Routes

_The need for nested routes is to keep the code and its end result clearer to
view and understand_

_One can send the id of resource via the req.body but that doesn't make it clear
while ready the URL about the purpose of the API. So having the URL have the
req.params makes the API easier to read and understand_

_So if one had an URL of tour/:id/review it would make it easier to understand
that the API was to get all reviews of a particular tour and if the URL was
tour/:id/review/:id then the API call was to get a particular review of a
particular tour_

**To achieve nested routes capability this is the initial method which is
counter-intutive as it's a review route but as it begins with /tour it is placed
in the tourRouter**

router.route("/:tourId/reviews").get(reviewController.getAllReviews)

router.route("/:tourId/reviews/:reviewId").get(reviewController.getOneReview)

**However the result is the same as the getAll Review and getOne Review router
in the review Router. So that can be achieved by this fix**

_In the tourRouter_

```
router.use('/:tourId/reviews', reviewRouter)

```

_In the reviewRouter_

```
router=express.Router({mergeParams:true})

```

_In the reviewController for POST requests_

```
exports.createOneReview = function(req,res,next){

	if(!req.body.tour) req.body.tour = req.params.tourId;
	if(!req.body.user) req.body.user = req.user.id; // sent from the protect middleware

	...
}

```


_In the reviewController for GET requests_

```
exports.getAllReviews = function(req,res,next){

	let filter = {};
	if(req.params.tourId) filter = {tour:req.params.tourId}

	const reviews = Review.find(filter)
}


```