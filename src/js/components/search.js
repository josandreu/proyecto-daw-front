class Search {
  static init() {
    const container = document.getElementById('searchInputContainer');
    const button = document.getElementById('searchButton');

    const showInputContainer = () => {
      if(container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        document.getElementById('default-tab').click();
      } else {
        container.classList.add('hidden');
      }
    }
    button.addEventListener('click', showInputContainer);
  }
}

export default Search;
