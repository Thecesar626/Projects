// Select the main content area
const content = document.getElementById('content');
const form = document.getElementById('stock-form');
const stockInput = document.getElementById('searchedticker');

// Attach an event listener to the form
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    const stockTicker = stockInput.value.trim(); // Get user input and remove extra spaces

    if (!stockTicker) {
        content.innerHTML = '<p>Please enter a stock ticker.</p>';
        return;
    }

    // Fetch data for the entered ticker
    await fetchData(stockTicker);
});

// Function to fetch data from the API
async function fetchData(stockTicker) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockTicker}&outputsize=full&apikey=5Z1OIQ450N5EAPQL`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        content.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}


function renderData(data) {

    if (!data || Object.keys(data).length === 0) {
        content.innerHTML = '<p>No data available for this ticker.</p>';
        return;
    }

    let tableHTML = `
        <table>
            <tr>
                <th>Key</th>
                <th>Value</th>
            </tr>
    `;

    for (const [key, value] of Object.entries(data)) {
        tableHTML += `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>
        `;
    }

    tableHTML += `</table>`;

    // Insert the table into the content div
    content.innerHTML = tableHTML;
}

// Function to display the dashboard
async function showDashboard() {
    content.innerHTML = `
        <h2>Welcome to Rito's Stock Viewer</h2>
        <p>Enter a stock ticker in the search bar above to view its financial overview.</p>
    `;
}

// Load the default view
showDashboard();