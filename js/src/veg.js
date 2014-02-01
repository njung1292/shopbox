var veggies = new Array()
    veggies["tomato"] = [
    "http://www.ishs.org/sites/default/files/news-images/tomato.jpg",
    "http://www.marlerblog.com/files/2013/02/5-May-and-tomato-0141.jpg",
    "http://upload.wikimedia.org/wikipedia/commons/b/b5/Cherry_tomatoes.jpg",
    "http://www.organicgardening.com/sites/default/files/images/tomato-tips-380-1.jpg"
    ];
    veggies["broccoli"] = [
    "http://upload.wikimedia.org/wikipedia/commons/f/fb/Broccoli_bunches.jpg",
    "http://www.hometownseeds.com/images/Broccoli%20Seeds,%20Packman%20Hybridp.jpg",
    "http://fc05.deviantart.net/fs71/i/2013/022/4/e/maybe_broccoli_likes_you_anyway__after_all__by_thehalfbloodpierrot-d5sc5mv.jpg",
    "http://growingveggies.com/wp-content/uploads/2013/09/broccoli_heads.jpg"
    ];
    veggies["carrot"] = [
    "http://addorganicgardening.com/wp-content/uploads/2012/09/Carrot.jpg",
    "http://iwannabfit.com/public/blogimage/1375084952Fresh-Carrot.jpg",
    "http://0.tqn.com/d/gardening/1/0/w/7/carrot_kaleidoscope.jpg",
    "http://4.bp.blogspot.com/_RPBr5pd2NgE/SiNIQ6XjjSI/AAAAAAAACI4/1sRGJbvLPhs/s1600/EADIM-Steff-Bomb-Carrot-4.jpg"
    ];
    veggies["burrito"] = [
    "http://app.cookingmatters.org/sites/default/files/sos-img/HeartyEggBurritos.jpg",
    "http://www.rubios.com/images/menu/MenuItems/FullSite/baja-grill-burrito-chicken.jpg",
    "http://blogdailyherald.com/wp-content/uploads/2013/05/burrito.jpg",
    "http://static2.wikia.nocookie.net/__cb20130819182130/adventuretimewithfinnandjake/images/thumb/7/74/2165BB66C54027C134AAF5_(1).jpg/185px-2165BB66C54027C134AAF5_(1).jpg"
    ];

var getVeggie = function(veggie) {
    var vegArray = veggies[veggie];
    var i = Math.floor(Math.random() * vegArray.length);
    return vegArray[i];
}