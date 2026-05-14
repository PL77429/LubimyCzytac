 //  Konfiguracja połączenia z bazą Supabase
const supabaseUrl = 'https://weiynsvckehxobqydick.supabase.co';
const supabaseKey = 'sb_publishable_81u-_6ofRtmqaZr7k8da6w_ku-x2rEP';

//  Inicjalizacja klienta Supabase
const client = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log('Połączono z Supabase!');

// Funkcja do dodawania nowej książki do bazy
async function addBook() {
    // Pobieranie wartości z pól formularza
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;

     // Wysłanie danych do tabeli 'books' w Supabase
    const { data, error } = await client
        .from('books')
        .insert([
            {
                title: title,
                author: author,
                description: description
            }
        ]);

    if (error) {
        console.error('Błąd podczas dodawania książki:', error);
    } else {
        console.log('Książka została pomyślnie dodana!');
        // Wyczyszczenie pól po dodaniu
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('description').value = '';
        
        // Odświeżenie listy książek, aby pokazać nowo dodaną
        getBooks();
    }
}

// Funkcja do pobierania i wyświetlania książek z bazy
async function getBooks() {
    // Pobranie wszystkich rekordów z tabeli 'books'
    const { data, error } = await client
        .from('books')
        .select('*');

    if (error) {
        console.error('Błąd podczas pobierania danych:', error);
        return;
    }

    // Znalezienie listy w HTML
    const list = document.getElementById('books-list');
    list.innerHTML = ''; // Wyczyszczenie obecnej listy przed ponownym renderowaniem

    // Dodanie każdej książki do listy HTML
    data.forEach(book => {
        const listItem = document.createElement('li');
// Używamy innerHTML, aby dodać formatowanie tekstowe do listy
listItem.innerHTML = `
    <div style="margin-bottom: 5px;">
        <strong style="font-size: 18px; color: #1a1a1a;">${book.title}</strong>
    </div>
    <div style="font-size: 14px; color: #555; margin-bottom: 3px;">
        <strong>Autor:</strong> ${book.author}
    </div>
    <div style="font-size: 14px; color: #777;">
        <strong>Opis:</strong> ${book.description}
    </div>
`;
        list.appendChild(listItem);
    });
}

// Wywołanie funkcji przy starcie aplikacji, aby załadować książki
getBooks();
