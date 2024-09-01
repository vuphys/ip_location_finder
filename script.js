document.getElementById('find-button').addEventListener('click', function() {
    const ipInput = document.getElementById('ip-input').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // clear previous results

    if (!ipInput) {
        resultDiv.innerHTML = 'Please enter a valid IP address.';
        resultDiv.style.display = 'block';
        return;
    }

    fetch(`http://ip-api.com/json/${ipInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'fail') {
                resultDiv.innerHTML = 'Error: ' + data.message;
            } else {
                resultDiv.innerHTML = `
                    <strong>IP:</strong> ${data.query}<br>
                    <strong>Location:</strong> ${data.city}, ${data.regionName}, ${data.country}<br>
                    <strong>ISP:</strong> ${data.isp}<br>
                    <strong>Latitude:</strong> ${data.lat}<br>
                    <strong>Longitude:</strong> ${data.lon}
                `;
            }
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            resultDiv.innerHTML = 'An error occurred: ' + error.message;
            resultDiv.style.display = 'block';
        });
});