var app = new Vue({
    el: '#app',
    data () {
        return {
            message: 'Some charming words ex-president Trump had to say about',
            adpi: true,
            baseurl: null,
            quote: null,
            tag: null,
            tags: null,
            name: null,
            intro: null
        }
    },
    created () {
        this.baseurl = this.adpi ? 'http://127.0.0.1:8000/api' : 'https://www.tronalddump.io';
    },
    mounted () {
        axios
            .get(this.baseurl + (this.adpi ? '/tronaldtags' : '/tag'))
            .then(response => (this.tags = response.data._embedded.tag))
        axios
            .get(this.baseurl + (this.adpi ? '/tronaldquote' : '/random/quote'))
            .then(response => {
                this.quote = response.data.value
                this.tag = response.data.tags[0]
                this.intro = this.message
            })
    },
    methods: {
        getRandomQuote: function () {
            axios
                .get(this.baseurl + (this.adpi ? '/tronaldquote' : '/random/quote'))
                .then(response => {
                    this.quote = response.data.value
                    this.tag = response.data.tags[0]
                    this.intro = this.message
                })
        },
        getQuoteByTag: function () {
            axios
                .get(this.baseurl + (this.adpi ? '/tronaldquotebytag/' : '/search/quote?tag=') + encodeURIComponent(this.name))
                .then(response => {
                    var pick = Math.floor(Math.random() * response.data.count)
                    this.quote = response.data._embedded.quotes[pick].value
                    this.tag = response.data._embedded.quotes[pick].tags[0]
                    this.intro = this.message
                })

        }
    }
})