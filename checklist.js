     document.addEventListener("DOMContentLoaded", () => {
      const masterChecklist = JSON.parse(localStorage.getItem("masterChecklist"));
      const listContainer = document.getElementById("masterChecklist");

      if (!masterChecklist || masterChecklist.length === 0) {
        listContainer.innerHTML = "<li>No items in the checklist.</li>";
        return;
      }

      masterChecklist.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
          <label>
            <input type="checkbox" />
            ${item.label} — <strong>${item.quantity}</strong>
          </label>
        `;
        listContainer.appendChild(li);
        });

      // Optional: Cross out checked items
      listContainer.addEventListener("change", e => {
        if (e.target.type === "checkbox") {
          const label = e.target.parentElement;
          label.style.textDecoration = e.target.checked ? "line-through" : "none";
          label.style.color = e.target.checked ? "#888" : "#333";
        }
      });
    });

    document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html"; // or the correct filename of your main stock list page
});



