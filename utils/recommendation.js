



export const RecommenderAlgorithm = (locations)=>locations.sort((l1,l2)=>{
        const aRatings = l1.Reviews.map(r=>r.ratings);
        const bRatings = l2.Reviews.map(r=>r.ratings);

        const aAverageRatings = aRatings.reduce((sum,rate)=>sum + rate,0)/aRatings.length;

        const bAverageRatings = bRatings.reduce((sum,rate)=>sum + rate,0)/bRatings.length;

        return bAverageRatings - aAverageRatings;
    })