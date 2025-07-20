document.addEventListener("DOMContentLoaded", () => {
  // Select all cards (both syrup and mixes)
  const cards = document.querySelectorAll(".Card, .Card2, .Card3, .Card4, .Card5, .Card6, .Card7, .Card8, .Card9");

  cards.forEach(card => {
    const rows = card.querySelectorAll(".SyrupRow, .MixesRow, .MisRow, .MisRow2, .FryRow , .ShakesRow, .BevRow, .CaseRow, .ItemRow"); // Rows inside this card
    const submitBtn = card.querySelector(".submitBtn");
    const refreshBtn = card.querySelector(".refreshBtn");
    const updateBtn = card.querySelector(".updateBtn");
    const checklist = card.querySelector(".checklist");

    checklist.style.display = "none";

    // Setup quantity buttons and input behavior per row
    rows.forEach(row => {
      const decrementBtn = row.querySelector(".Quantity button:first-child");
      const incrementBtn = row.querySelector(".Quantity button:last-child");
      const quantityInput = row.querySelector(".Quantity input");

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

    // Submit button logic
    submitBtn.addEventListener("click", () => {
      checklist.innerHTML = ""; // Clear previous checklist items

      rows.forEach(row => {
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

      checklist.style.display = "block";

      rows.forEach(row => (row.style.display = "none"));
      submitBtn.style.display = "none";
      refreshBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
    });

    // Refresh button logic — clears inputs only inside this card
    refreshBtn.addEventListener("click", () => {
      rows.forEach(row => {
        const quantityInput = row.querySelector(".Quantity input");
        quantityInput.value = 0;
      });
    });

    // Update button logic — show inputs again
    updateBtn.addEventListener("click", () => {
      checklist.style.display = "none";
      rows.forEach(row => (row.style.display = "flex"));
      submitBtn.style.display = "inline-block";
      refreshBtn.style.display = "inline-block";
      updateBtn.style.display = "none";
    });

    // Checklist crossing out on checkbox toggle
    checklist.addEventListener("change", e => {
      if (e.target.type === "checkbox") {
        const label = e.target.parentElement;
        label.style.textDecoration = e.target.checked ? "line-through" : "none";
        label.style.color = e.target.checked ? "#888" : "#333";
      }
    });
  });
});

document.getElementById('masterSubmitBtn').addEventListener('click', () => {
  const allItems = [];

  const itemRows = document.querySelectorAll('[data-label]');

  itemRows.forEach(row => {
    const label = row.getAttribute('data-label');
    const quantityInput = row.querySelector('input[type="number"]');
    const quantity = parseInt(quantityInput.value) || 0;

    if (quantity > 0) {
      allItems.push({ label, quantity });
    }
  });

  localStorage.setItem('masterChecklist', JSON.stringify(allItems));

  // Navigate to second page
  window.location.href = "checklist.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const savedList = JSON.parse(localStorage.getItem("masterChecklist"));
  if (!savedList) return;

  savedList.forEach(item => {
    const row = document.querySelector(`[data-label="${item.label}"]`);
    if (row) {
      const quantityInput = row.querySelector('input[type="number"]');
      if (quantityInput) {
        quantityInput.value = item.quantity;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const allInputs = document.querySelectorAll('[data-label] input[type="number"]');

  allInputs.forEach(input => {
    input.addEventListener("input", () => {
      const updatedList = [];

      document.querySelectorAll('[data-label]').forEach(row => {
        const label = row.getAttribute("data-label");
        const quantity = parseInt(row.querySelector("input").value) || 0;
        if (quantity > 0) {
          updatedList.push({ label, quantity });
        }
      });

      localStorage.setItem("masterChecklist", JSON.stringify(updatedList));
    });
  });
});

document.getElementById("globalRefreshBtn").addEventListener("click", () => {
  const allQuantityInputs = document.querySelectorAll('[data-label] input[type="number"]');
  allQuantityInputs.forEach(input => {
    input.value = 0;
  });

  // Also clear localStorage if you want it to be a full reset:
  localStorage.removeItem("masterChecklist");
});






