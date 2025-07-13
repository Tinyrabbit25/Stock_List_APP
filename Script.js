document.addEventListener("DOMContentLoaded", () => {
  const syrupRows = document.querySelectorAll(".SyrupRow");
  const submitBtn = document.getElementById("submitBtn");
  const updateBtn = document.getElementById("updateBtn");
  const refreshBtn = document.getElementById("refreshBtn"); // 🆕
  const checklist = document.getElementById("checklist");

  // Initialize checklist hidden
  checklist.style.display = "none";

  // ✅ Quantity logic
  syrupRows.forEach((row) => {
    const decrementBtn = row.querySelector(".Quantity button:first-child");
    const incrementBtn = row.querySelector(".Quantity button:last-child");
    const quantityDisplay = row.querySelector(".Quantity span");

    decrementBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityDisplay.textContent);
      if (quantity > 0) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });

    incrementBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityDisplay.textContent);
      quantity++;
      quantityDisplay.textContent = quantity;
    });
  });

  // ✅ Submit button logic
  submitBtn.addEventListener("click", () => {
    checklist.innerHTML = "";

    syrupRows.forEach((row) => {
      const labelText = row.dataset.label;
      const quantity = row.querySelector(".Quantity span").textContent;

      if (parseInt(quantity) > 0) {
        const li = document.createElement("li");
        li.innerHTML = `
          <label style="cursor:pointer;">
            <input type="checkbox" />
            ${labelText} — <strong>${quantity}</strong>
          </label>
        `;
        checklist.appendChild(li);
      }
    });

    // Show checklist, hide syrup inputs
    checklist.style.display = "block";
    syrupRows.forEach(row => row.style.display = "none");
    submitBtn.style.display = "none";
    updateBtn.style.display = "inline-block";

    // 🆕 Hide refresh when checklist is shown
    refreshBtn.style.display = "none";
  });

  // ✅ Update button logic
  updateBtn.addEventListener("click", () => {
    checklist.style.display = "none";
    syrupRows.forEach(row => row.style.display = "flex");
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";

    // 🆕 Show refresh button again
    refreshBtn.style.display = "inline-block";
  });

  // ✅ Checklist strike-through logic
  checklist.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const label = e.target.parentElement;
      label.style.textDecoration = e.target.checked ? "line-through" : "none";
      label.style.color = e.target.checked ? "#888" : "#333";
    }
  });

  // 🆕 Refresh button logic: reset all quantities to 0
  refreshBtn.addEventListener("click", () => {
    syrupRows.forEach((row) => {
      const quantityDisplay = row.querySelector(".Quantity span");
      quantityDisplay.textContent = "0";
    });
  });
});
