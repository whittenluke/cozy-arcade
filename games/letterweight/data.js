/**
 * Letter Weight — category word lists.
 * Keys: category display name. Values: valid words (lowercase, no spaces).
 * Normalize player input the same way (lowercase, strip spaces) before lookup.
 */
const LETTERWEIGHT_DATA = {
  TREES: [
    "acacia", "alder", "apple", "apricot", "arborvitae", "ash", "aspen", "avocado", "balsa", "bamboo",
    "baobab", "beech", "birch", "blackwood", "boxwood", "butternut", "camphor", "carob", "catalpa",
    "cedar", "cherry", "chestnut", "chinaberry", "coffee", "cottonwood", "crabapple", "cypress", "dogwood",
    "douglasfir", "ebony", "elder", "elm", "eucalyptus", "fig", "fir", "frankincense", "ginkgo", "gum",
    "hackberry", "hawthorn", "hemlock", "hickory", "holly", "hornbeam", "horsechestnut", "ironwood",
    "jacaranda", "juniper", "kapok", "koa", "larch", "laurel", "lemon", "lime", "linden", "locust",
    "magnolia", "mahogany", "mango", "mangrove", "maple", "mimosa", "mulberry", "oak", "olive", "orange",
    "palm", "papaya", "peach", "pear", "pecan", "persimmon", "pine", "pistachio", "plane", "plum",
    "poplar", "quince", "redbud", "redwood", "rosewood", "rowan", "rubber", "sandalwood", "sassafras",
    "sequoia", "serviceberry", "spruce", "sycamore", "tamarind", "teak", "thuja", "tulip", "walnut",
    "weepingwillow", "willow", "wisteria", "yew", "ylangylang", "zelkova"
  ],
  FRUITS: [
    "apple", "apricot", "avocado", "banana", "blackberry", "blueberry", "boysenberry", "cantaloupe",
    "cashew", "cherry", "chestnut", "clementine", "coconut", "cranberry", "currant", "date", "dragonfruit",
    "durian", "elderberry", "fig", "grape", "grapefruit", "guava", "honeydew", "jackfruit", "kiwi",
    "kumquat", "lemon", "lime", "lingonberry", "lychee", "mandarin", "mango", "mangosteen", "melon",
    "mulberry", "nectarine", "olive", "orange", "papaya", "passionfruit", "peach", "pear", "persimmon",
    "pineapple", "plum", "pomegranate", "pomelo", "quince", "raisin", "raspberry", "starfruit",
    "strawberry", "tangerine", "ugli", "watermelon"
  ],
  ANIMALS: [
    "alligator", "ant", "anteater", "antelope", "ape", "armadillo", "baboon", "badger", "barracuda",
    "bat", "bear", "beaver", "bee", "bison", "boar", "buffalo", "bull", "butterfly", "camel", "canary",
    "capybara", "caribou", "cat", "caterpillar", "cheetah", "chicken", "chimpanzee", "chinchilla",
    "chough", "clam", "cobra", "cockroach", "cod", "cormorant", "coyote", "crab", "crane", "crocodile",
    "crow", "curlew", "deer", "dinosaur", "dog", "dolphin", "donkey", "dotterel", "dove", "dragonfly",
    "duck", "dugong", "dunlin", "eagle", "echidna", "eel", "egret", "elephant", "elk", "emu", "falcon",
    "ferret", "finch", "fish", "flamingo", "fly", "fox", "frog", "gaur", "gazelle", "gerbil", "giraffe",
    "gnat", "gnu", "goat", "goldfish", "goose", "gorilla", "grasshopper", "grouse", "guanaco", "gull",
    "hamster", "hare", "hawk", "hedgehog", "heron", "herring", "hippopotamus", "hornet", "horse",
    "human", "hummingbird", "hyena", "ibex", "ibis", "jackal", "jaguar", "jay", "jellyfish", "kangaroo",
    "kingfisher", "koala", "kookabura", "kouprey", "krill", "lapwing", "lar", "lemur", "leopard", "lion",
    "llama", "lobster", "locust", "loris", "louse", "lyrebird", "magpie", "mallard", "manatee", "mandrill",
    "mantis", "marten", "meerkat", "mink", "mole", "mongoose", "monkey", "moose", "mosquito", "mouse",
    "mule", "narwhal", "newt", "nightingale", "octopus", "okapi", "opossum", "oryx", "ostrich", "otter",
    "owl", "oyster", "panther", "parrot", "partridge", "peafowl", "pelican", "penguin", "pheasant", "pig",
    "pigeon", "pony", "porcupine", "porpoise", "quail", "quelea", "rabbit", "raccoon", "rail", "ram",
    "rat", "raven", "reindeer", "rhinoceros", "rook", "salmon", "sanddollar", "sandpiper", "sardine",
    "scorpion", "seahorse", "seal", "shark", "sheep", "shrew", "shrimp", "skunk", "snail", "snake",
    "sparrow", "spider", "spoonbill", "squid", "squirrel", "starling", "stingray", "stork", "swallow",
    "swan", "tapir", "tarsier", "termite", "tiger", "toad", "trout", "turkey", "turtle", "viper",
    "vulture", "wallaby", "walrus", "wasp", "weasel", "whale", "wildcat", "wolf", "wolverine", "wombat",
    "woodcock", "woodpecker", "worm", "yak", "zebra"
  ],
  COUNTRIES: [
    "afghanistan", "albania", "algeria", "andorra", "angola", "antigua", "argentina", "armenia",
    "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados", "belarus",
    "belgium", "belize", "benin", "bhutan", "bolivia", "bosnia", "botswana", "brazil", "brunei",
    "bulgaria", "burkina", "burundi", "cambodia", "cameroon", "canada", "capeverde", "chad", "chile",
    "china", "colombia", "comoros", "congo", "croatia", "cuba", "cyprus", "czechia", "denmark",
    "djibouti", "dominica", "ecuador", "egypt", "elsalvador", "equatorialguinea", "eritrea", "estonia",
    "eswatini", "ethiopia", "fiji", "finland", "france", "gabon", "gambia", "georgia", "germany", "ghana",
    "greece", "grenada", "guatemala", "guinea", "guyana", "haiti", "honduras", "hungary", "iceland",
    "india", "indonesia", "iran", "iraq", "ireland", "israel", "italy", "jamaica", "japan", "jordan",
    "kazakhstan", "kenya", "kiribati", "korea", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia",
    "lebanon", "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar",
    "malawi", "malaysia", "maldives", "mali", "malta", "marshallislands", "mauritania", "mauritius",
    "mexico", "micronesia", "moldova", "monaco", "mongolia", "montenegro", "morocco", "mozambique",
    "myanmar", "namibia", "nauru", "nepal", "netherlands", "newzealand", "nicaragua", "niger", "nigeria",
    "northmacedonia", "norway", "oman", "pakistan", "palau", "panama", "papuanewguinea", "paraguay",
    "peru", "philippines", "poland", "portugal", "qatar", "romania", "russia", "rwanda", "saintkitts",
    "saintlucia", "samoa", "sanmarino", "saotome", "saudiarabia", "senegal", "serbia", "seychelles",
    "sierraleone", "singapore", "slovakia", "slovenia", "solomonislands", "somalia", "southafrica",
    "spain", "srilanka", "sudan", "suriname", "sweden", "switzerland", "syria", "taiwan", "tajikistan",
    "tanzania", "thailand", "timorleste", "togo", "tonga", "trinidad", "tunisia", "turkey", "turkmenistan",
    "tuvalu", "uganda", "ukraine", "unitedarabemirates", "unitedkingdom", "unitedstates", "uruguay",
    "uzbekistan", "vanuatu", "vaticancity", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
  ],
  FLOWERS: [
    "amaryllis", "anemone", "aster", "azalea", "babybreath", "begonia", "bluebell", "bougainvillea",
    "buttercup", "cactus", "camellia", "carnation", "chrysanthemum", "clematis", "cosmos", "crocus",
    "daffodil", "dahlia", "daisy", "dandelion", "freesia", "fuchsia", "gardenia", "geranium", "gladiolus",
    "hibiscus", "hollyhock", "honeysuckle", "hyacinth", "hydrangea", "iris", "jasmine", "jonquil",
    "lavender", "lilac", "lily", "lotus", "magnolia", "marigold", "morningglory", "narcissus",
    "nasturtium", "orchid", "pansy", "peony", "petunia", "phlox", "poinsettia", "poppy", "primrose",
    "rhododendron", "rose", "snapdragon", "snowdrop", "sunflower", "sweetpea", "tulip", "violet",
    "waterlily", "zinnia"
  ],
  METALS: [
    "aluminum", "antimony", "barium", "beryllium", "bismuth", "brass", "bronze", "cadmium", "cesium",
    "chromium", "cobalt", "copper", "gold", "indium", "iridium", "iron", "lead", "lithium", "magnesium",
    "manganese", "mercury", "molybdenum", "nickel", "osmium", "palladium", "platinum", "potassium",
    "rhodium", "silver", "sodium", "steel", "tantalum", "tin", "titanium", "tungsten", "uranium",
    "vanadium", "zinc", "zirconium"
  ],
  BIRDS: [
    "albatross", "anhinga", "avocet", "bittern", "blackbird", "bluebird", "bluejay", "bobolink",
    "bunting", "cardinal", "cassowary", "chickadee", "chicken", "cockatoo", "condor", "coot", "cormorant",
    "crane", "crow", "cuckoo", "curlew", "dove", "duck", "eagle", "egret", "emu", "falcon", "finch",
    "flamingo", "frigatebird", "goose", "grackle", "grosbeak", "grouse", "gull", "hawk", "heron",
    "hummingbird", "ibis", "jacana", "jay", "kingfisher", "kiwi", "kookaburra", "lark", "loon", "macaw",
    "magpie", "mallard", "martin", "mockingbird", "nighthawk", "nightingale", "oriole", "osprey",
    "ostrich", "owl", "parakeet", "parrot", "partridge", "peacock", "pelican", "penguin", "pheasant",
    "pigeon", "puffin", "quail", "rail", "raven", "roadrunner", "robin", "sandpiper", "seagull",
    "shearwater", "sparrow", "starling", "stork", "swallow", "swan", "swift", "tern", "thrasher",
    "thrush", "toucan", "turkey", "vulture", "warbler", "whippoorwill", "woodpecker", "wren"
  ],
  VEGETABLES: [
    "artichoke", "arugula", "asparagus", "avocado", "bean", "beet", "broccoli", "brusselsprout",
    "cabbage", "carrot", "cauliflower", "celery", "chard", "chicory", "collard", "corn", "cucumber",
    "eggplant", "endive", "fennel", "garlic", "ginger", "kale", "leek", "lettuce", "mushroom", "okra",
    "olive", "onion", "parsnip", "pea", "pepper", "potato", "pumpkin", "radish", "rhubarb", "rutabaga",
    "scallion", "shallot", "spinach", "squash", "sweetpotato", "tomato", "turnip", "watercress", "yam",
    "zucchini"
  ],
  GEMSTONES: [
    "agate", "alexandrite", "amber", "amethyst", "aquamarine", "aventurine", "beryl", "bloodstone",
    "carnelian", "chalcedony", "chrysoberyl", "citrine", "coral", "diamond", "emerald", "fluorite",
    "garnet", "jade", "jasper", "kunzite", "lapislazuli", "malachite", "moonstone", "obsidian", "onyx",
    "opal", "pearl", "peridot", "quartz", "ruby", "sapphire", "sardonyx", "spinel", "sunstone",
    "tanzanite", "tigerseye", "topaz", "tourmaline", "turquoise", "zircon"
  ],
  CHEESE: [
    "american", "asiago", "blue", "brie", "burrata", "camembert", "cheddar", "cheshire", "colby",
    "cotija", "cream", "edam", "emmental", "feta", "fontina", "fromage", "goat", "gorgonzola", "gouda",
    "grana", "gruyere", "halloumi", "havarti", "jarlsberg", "limburger", "manchego", "mascarpone",
    "mozzarella", "munster", "neufchatel", "paneer", "parmesan", "pecorino", "pepperjack", "provolone",
    "queso", "ricotta", "romano", "roquefort", "stilton", "swiss"
  ]
};
