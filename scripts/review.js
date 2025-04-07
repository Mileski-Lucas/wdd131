// Add to the review counter
if (localStorage.getItem("reviewCount")) {
    localStorage.setItem("reviewCount", Number(localStorage.getItem("reviewCount")) + 1);
  } else {
    localStorage.setItem("reviewCount", 1);
  }

  // Display the current review count
  document.getElementById("reviewCount").textContent = localStorage.getItem("reviewCount");

  // Set footer information dynamically
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;