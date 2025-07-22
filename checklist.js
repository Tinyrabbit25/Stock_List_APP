     let masterChecklist = [];
     
   document.addEventListener("DOMContentLoaded", () => {
    masterChecklist = JSON.parse(localStorage.getItem("masterChecklist")) || [];
    const checkedState = JSON.parse(localStorage.getItem("checkedState")) || {};
    const listContainer = document.getElementById("masterChecklist");

      if (!masterChecklist || masterChecklist.length === 0) {
        listContainer.innerHTML = "<li>No items in the checklist.</li>";
        return;
      }

      masterChecklist.forEach((item, idx) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <label>
          <input type="checkbox" ${checkedState[item.label] ? "checked" : ""} />
        ${item.label} — <strong>${item.quantity}</strong>
        </label>
      `;
     listContainer.appendChild(li);
      

    // Cross out checked items on load
    const checkbox = li.querySelector("input[type='checkbox']");
    const label = checkbox.parentElement;
    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
      label.style.color = "#888";
    }
  });

   // Save checked state on change
  listContainer.addEventListener("change", e => {
    if (e.target.type === "checkbox") {
      const label = e.target.parentElement;
      label.style.textDecoration = e.target.checked ? "line-through" : "none";
      label.style.color = e.target.checked ? "#888" : "#333";

      // Save checked state 
      const checkboxes = listContainer.querySelectorAll("input[type='checkbox']");
      const checkedState = {};
      masterChecklist.forEach((item, idx) => {
        checkedState[item.label] = checkboxes[idx].checked;
      });
      localStorage.setItem("checkedState", JSON.stringify(checkedState));
    }
  });
});

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});


