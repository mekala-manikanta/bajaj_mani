let expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const input = document.getElementById('apiInput').value;
    try {
        const data = JSON.parse(input);
        // Here you would normally send this data to your API
        // For this example, we'll just process it directly
        const numbers = data.data.filter(item => !isNaN(item));
        const alphabets = data.data.filter(item => isNaN(item));
        const highestLowercase = alphabets
            .filter(char => char.length === 1 && char.toLowerCase() === char)
            .sort((a, b) => b.localeCompare(a))[0] || [];

        updateFilteredResponse({numbers, alphabets, highestLowercase});
    } catch (error) {
        alert('Invalid JSON input');
    }
});

function updateFilteredResponse(data) {
    const responseDiv = document.getElementById('filteredResponse');
    let response = '';

    if (document.getElementById('numbers').checked) {
        response += `Numbers: ${data.numbers.join(',')}\n`;
    }
    if (document.getElementById('alphabets').checked) {
        response += `Alphabets: ${data.alphabets.join(',')}\n`;
    }
    if (document.getElementById('highest').checked) {
        response += `Highest lowercase alphabet: ${data.highestLowercase}\n`;
    }

    responseDiv.textContent = response || 'No filters selected';
}

// Update response when checkboxes change
document.querySelectorAll('#checkboxes input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const input = document.getElementById('apiInput').value;
        try {
            const data = JSON.parse(input);
            const numbers = data.data.filter(item => !isNaN(item));
            const alphabets = data.data.filter(item => isNaN(item));
            const highestLowercase = alphabets
                .filter(char => char.length === 1 && char.toLowerCase() === char)
                .sort((a, b) => b.localeCompare(a))[0] || [];

            updateFilteredResponse({numbers, alphabets, highestLowercase});
        } catch (error) {
            // If there's no valid input yet, do nothing
        }
    });
});