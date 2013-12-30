
var PAGES = [
    {
        'title': 'The Velveteen Rabbit',
        'page': 1,
        'pages': 2,
        'author': 'Margery Williams',
        'image': 'http://digital.library.upenn.edu/women/williams/rabbit/christmas.jpeg',
        'text':
         [
            "There was once a velveteen rabbit and in the beginning he was really splendid. He was fat and bunchy, as a rabbit should be; his coat was spotted brown and white, he had real thread whiskers, and his ears were lined with pink sateen. On Christmas morning, when he sat wedged in the top of the Boy's stocking, with a sprig of holly between his paws, the effect was charming.",
            "There were other things in the stocking, nuts and oranges and a toy engine, and chocolate almonds and a clockwork mouse, but the Rabbit was quite the best of all. For at least two hours the Boy loved him, and then Aunts and Uncles came to dinner, and there was a great rustling of tissue paper and unwrapping of parcels, and in the excitement of looking at all the new presents the Velveteen Rabbit was forgotten.",
            "For a long time he lived in the toy cupboard or on the nursery floor, and no one thought very much about him. He was naturally shy, and being only made of velveteen, some of the more expensive toys quite snubbed him. The mechanical toys were very superior, and looked down upon every one else; they were full of modern ideas, and pretended they were real. The model boat, who had lived through two seasons and lost most of his paint, caught the tone from them and never missed an opportunity of referring to his rigging in technical terms. The Rabbit could not claim to be a model of anything, for he didn't know that real rabbits existed; he thought they were all stuffed with sawdust like himself, and he understood that sawdust was quite out-of-date and should never be mentioned in modern circles. Even Timothy, the jointed wooden lion, who was made by the disabled soldiers, and should have had broader views, put on airs and pretended he was connected with Government. Between them all the poor little Rabbit was made to feel himself very insignificant and commonplace, and the only person who was kind to him at all was the Skin Horse."
        ],
    },
    {
        'title': 'The Velveteen Rabbit',
        'page': 2,
        'pages': 2,
        'author': 'Margery Williams',
        'image': 'http://digital.library.upenn.edu/women/williams/rabbit/horse.jpeg',
        'text':
        [
            'The Skin Horse had lived longer in the nursery than any of the others. He was so old that his brown coat was bald in patches and showed the seams underneath, and most of the hairs in his tail had been pulled out to string bead necklaces. He was wise, for he had seen a long succession of mechanical toys arrive to boast and swagger, and by-and-by break their mainsprings and pass away, and he knew that they were only toys, and would never turn into anything else. For nursery magic is very strange and wonderful, and only those playthings that are old and wise and experienced like the Skin Horse understand all about it.',
            '"What is REAL?" asked the Rabbit one day, when they were lying side by side near the nursery fender, before Nana came to tidy the room. "Does it mean having things that buzz inside you and a stick-out handle?"',
            '"Real isn\'t how you are made," said the Skin Horse. "It\'s a thing that happens to you. When a child loves you for a long, long time, not just to play with, but REALLY loves you, then you become Real."',
            '"Does it hurt?" asked the Rabbit.',
            '"Sometimes," said the Skin Horse, for he was always truthful. "When you are Real you don\'t mind being hurt."',
            '"Does it happen all at once, like being wound up," he asked, "or bit by bit?"',
            '"It doesn\'t happen all at once," said the Skin Horse. "You become. It takes a long time. That\'s why it doesn\'t happen often to people who break easily, or have sharp edges, or who have to be carefully kept. Generally, by the time you are Real, most of your hair has been loved off, and your eyes drop out and you get loose in the joints and very shabby. But these things don\'t matter at all, because once you are Real you can\'t be ugly, except to people who don\'t understand."',
            '"I suppose you are real?" said the Rabbit. And then he wished he had not said it, for he thought the Skin Horse might be sensitive. But the Skin Horse only smiled.'
        ],
    }
];

storytime.factory('storyAPI', function($http) {
    return {
        /*
        getPage: function(n) {
          return $http.get('http://localhost:5000/rest/lipsum/' + n)
                    .then(function(result) {
                      return result.data;
                    });
        },*/
        getPage: function(n) {
            return PAGES[n - 1];
        }
    }
});
