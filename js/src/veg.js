var veggies = {
    "tomato": ["http://www.ishs.org/sites/default/files/news-images/tomato.jpg", "http://www.marlerblog.com/files/2013/02/5-May-and-tomato-0141.jpg", "http://upload.wikimedia.org/wikipedia/commons/b/b5/Cherry_tomatoes.jpg", "http://www.organicgardening.com/sites/default/files/images/tomato-tips-380-1.jpg", "http://www.maplewiki.net/images/c/c7/Monster_Giant_Tomato.png", "http://th02.deviantart.net/fs70/PRE/i/2012/220/4/a/kawaii_tomato_by_chloeisabunny-d5acj0n.png"],
    "broccoli": ["http://upload.wikimedia.org/wikipedia/commons/f/fb/Broccoli_bunches.jpg", "http://th07.deviantart.net/fs71/PRE/i/2012/220/6/6/kawaii_broccoli_by_chloeisabunny-d5aci50.png", "http://www.hometownseeds.com/images/Broccoli%20Seeds,%20Packman%20Hybridp.jpg", "http://fc05.deviantart.net/fs71/i/2013/022/4/e/maybe_broccoli_likes_you_anyway__after_all__by_thehalfbloodpierrot-d5sc5mv.jpg", "http://growingveggies.com/wp-content/uploads/2013/09/broccoli_heads.jpg"],
    "carrot": ["http://addorganicgardening.com/wp-content/uploads/2012/09/Carrot.jpg", "http://iwannabfit.com/public/blogimage/1375084952Fresh-Carrot.jpg", "http://th00.deviantart.net/fs70/PRE/i/2012/220/9/9/kawaii_carrot_by_chloeisabunny-d5acihy.png", "http://0.tqn.com/d/gardening/1/0/w/7/carrot_kaleidoscope.jpg", "http://4.bp.blogspot.com/_RPBr5pd2NgE/SiNIQ6XjjSI/AAAAAAAACI4/1sRGJbvLPhs/s1600/EADIM-Steff-Bomb-Carrot-4.jpg"],
    "burrito": ["http://media.chick-fil-a.com/Media/Img/catalog/Food/XLarge/Sausage-Breakfast-Burrito.png", "http://app.cookingmatters.org/sites/default/files/sos-img/HeartyEggBurritos.jpg", "http://universityprimetime.com//files/images/uploads/events/burrito.png", "http://www.rubios.com/images/menu/MenuItems/FullSite/baja-grill-burrito-chicken.jpg"]
    };

getVeggie: function(veggie) {
    var vegArray = veggies.veggie;
    var i = Math.floor(Math.random() * vegArray.length);
    return vegArray[i];
}
