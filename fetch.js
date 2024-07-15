export function loadPartial(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('main-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading partial:', error));
}

export function fetchJSONFile(callback) {
    fetch('home.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
