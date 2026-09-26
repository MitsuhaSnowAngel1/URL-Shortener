const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const resultDiv = document.getElementById('result');
const shortLink = document.getElementById('shortLink');
const copyBtn = document.getElementById('copyBtn');
const errorDiv = document.getElementById('error');

shortenBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();

  resultDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');

  if (!url) {
    errorDiv.textContent = 'Please enter a URL.';
    errorDiv.classList.remove('hidden');
    return;
  }

  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorDiv.textContent = data.error || 'Something went wrong.';
      errorDiv.classList.remove('hidden');
      return;
    }

    shortLink.href = data.short_url;
    shortLink.textContent = data.short_url;
    resultDiv.classList.remove('hidden');
  } catch (err) {
    errorDiv.textContent = 'Request failed. Is the server running?';
    errorDiv.classList.remove('hidden');
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(shortLink.href).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
  });
});
