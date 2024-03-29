const Pokedex = {
    variables: {
        app_container: document.getElementById('app'),
    },

    init: async function(url) {
        let pokedex_request = await fetch(url)
            .then(function(response) {
                return response.json();
            })
            .catch(error => {
                console.log(error);
            });
        this.view_list(pokedex_request);
    },

    view_list: function(pokedex_request) {
        let template = '<div id="pokedex_list_container"><div> <input type="text" name="" value="" placeholder="Search pokemon"> <ul id="pokedex_list"> </ul></div>';
        this.variables.app_container.insertAdjacentHTML('beforeend', template);
        pokedex_request.pokemon_entries.map(item => {
            this.template_list_html(item, "pokedex_list");
        });
        this.add_event_to_list_pokemon();
    },

    template_list_html: function(elements, elements_id) {
        let template = `<li data-id="${elements.entry_number}"> ${elements.entry_number}. ${elements.pokemon_species.name}  </li>`;
        document.getElementById(elements_id).insertAdjacentHTML('beforeend', template);
    },

    add_event_to_list_pokemon: function() {
        let list_pokemon = Array.from(document.body.querySelectorAll("#pokedex_list li"));
        list_pokemon.map(item => {
            item.addEventListener('click', function(event) {
                let id = this.getAttribute("data-id");
                Pokemon_detail.init_detail(`https://pokeapi.co/api/v2/pokemon/${id}`, `https://pokeapi.co/api/v2/pokemon-species/${id}`);
            });
        });
        Pokemon_detail.search();
    },
    capitalize_first_letter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};

const Pokemon_detail = Object.create(Pokedex);

export default Pokedex;
export {Pokemon_detail};
