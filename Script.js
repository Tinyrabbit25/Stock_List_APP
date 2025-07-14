document.addEventListener("DOMContentLoaded", () => {
  const syrupRows = document.querySelectorAll(".SyrupRow");
  const submitBtn = document.getElementById("submitBtn");
  const refreshBtn = document.getElementById("refreshBtn");  // 🆕 NEW button for refresh
  const updateBtn = document.getElementById("updateBtn");
  const checklist = document.getElementById("checklist");

  // Initialize checklist hidden and style it for visibility
  checklist.style.display = "none";

  // 🆕 NEW: Use input[type=number] instead of span, update quantity logic accordingly
  syrupRows.forEach((row) => {
    const decrementBtn = row.querySelector(".Quantity button:first-child");
    const incrementBtn = row.querySelector(".Quantity button:last-child");
    const quantityInput = row.querySelector(".Quantity input");

    // Ensure quantity input always stays >= 0
    quantityInput.addEventListener("input", () => {
      if (quantityInput.value === "" || parseInt(quantityInput.value) < 0) {
        quantityInput.value = 0;
      }
    });

    decrementBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 0) {
        quantity--;
        quantityInput.value = quantity;
      }
    });

    incrementBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      quantity++;
      quantityInput.value = quantity;
    });
  }); 

  // Submit button logic (no change here, just now reads from input.value)
  submitBtn.addEventListener("click", () => {
    checklist.innerHTML = ""; // Clear previous checklist items

    syrupRows.forEach((row) => {
      const labelText = row.dataset.label;
      const quantityInput = row.querySelector(".Quantity input");
      const quantity = quantityInput.value;

      if (parseInt(quantity) > 0) {
        const li = document.createElement("li");
        li.style.marginBottom = "8px";
        li.innerHTML = `
          <label style="cursor:pointer; user-select:none; color: #333;">
            <input type="checkbox" style="margin-right:8px; cursor:pointer;"/>
            ${labelText} — <strong>${quantity}</strong>
          </label>
        `;
        checklist.appendChild(li);
      }
    });

    // Show checklist inside the same card
    checklist.style.display = "block";

    // Hide syrup rows and submit & refresh buttons
    syrupRows.forEach(row => row.style.display = "none");
    submitBtn.style.display = "none";
    refreshBtn.style.display = "none";  // 🆕 NEW hides refresh on submit

    // Show update button inside the same card
    updateBtn.style.display = "inline-block";
  });

  // Refresh button logic - clears all inputs to 0
  refreshBtn.addEventListener("click", () => {
    syrupRows.forEach((row) => {
      const quantityInput = row.querySelector(".Quantity input");
      quantityInput.value = 0;
    });
  });

  // Update button logic (bring user back to form to edit)
  updateBtn.addEventListener("click", () => {
    checklist.style.display = "none";
    syrupRows.forEach(row => row.style.display = "flex");
    submitBtn.style.display = "inline-block";
    refreshBtn.style.display = "inline-block";  // 🆕 show refresh button again
    updateBtn.style.display = "none";
  });

  // Checklist crossing out on checkbox toggle
  checklist.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const label = e.target.parentElement;
      label.style.textDecoration = e.target.checked ? "line-through" : "none";
      label.style.color = e.target.checked ? "#888" : "#333";
    }
  });
});
