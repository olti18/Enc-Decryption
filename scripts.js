function getAlgorithm(algorithm) {
  switch (algorithm) {
    case "AES":
      return CryptoJS.AES;
    case "DES":
      return CryptoJS.DES;
    case "TripleDES":
      return CryptoJS.TripleDES;
    default:
      return CryptoJS.AES;
  }
}

function encryptText() {
  const text = document.getElementById("textInput").value;
  const key = document.getElementById("textKey").value;
  const algorithm = getAlgorithm(document.getElementById("algorithm").value);
  if (!text || !key) {
    alert("Please enter text and a key.");
    return;
  }
  const encrypted = algorithm.encrypt(text, key).toString();
  document.getElementById("textOutput").value = encrypted;
}

function decryptText() {
  const encryptedText = document.getElementById("textInput").value;
  const key = document.getElementById("textKey").value;
  const algorithm = getAlgorithm(document.getElementById("algorithm").value);
  if (!encryptedText || !key) {
    alert("Please enter encrypted text and a key.");
    return;
  }
  try {
    const bytes = algorithm.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById("textOutput").value = decrypted;
  } catch (error) {
    alert("Decryption failed. Check your key or input.");
  }
}

function encryptFile() {
  const fileInput = document.getElementById("fileInput").files[0];
  const key = document.getElementById("fileKey").value;
  if (!fileInput || !key) {
    alert("Please select a file and enter a key.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function () {
    const encrypted = CryptoJS.AES.encrypt(reader.result, key).toString();
    downloadFile(encrypted, "encrypted.txt");
  };
  reader.readAsText(fileInput);
}

function decryptFile() {
  const fileInput = document.getElementById("fileInput").files[0];
  const key = document.getElementById("fileKey").value;
  if (!fileInput || !key) {
    alert("Please select a file and enter a key.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const bytes = CryptoJS.AES.decrypt(reader.result, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      downloadFile(decrypted, "decrypted.txt");
    } catch (error) {
      alert("Decryption failed. Check your key or input.");
    }
  };
  reader.readAsText(fileInput);
}

function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.getElementById("downloadLink");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.display = "block";
  link.innerText = "Download " + filename;
}
