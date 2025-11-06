console.log("✅ script.js is connected and running!");

document.addEventListener("DOMContentLoaded", () => {
  const plantList = document.getElementById("plantList");
  const totalPlants = document.getElementById("totalPlants");
  const dueToday = document.getElementById("dueToday");
  const overdue = document.getElementById("overdue");

  const addPlantBtn = document.getElementById("addPlantBtn");
  const addPlantModal = document.getElementById("addPlantModal");
  const addPlantForm = document.getElementById("addPlantForm");
  const cancelAdd = document.getElementById("cancelAdd");

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  let plants = JSON.parse(localStorage.getItem("plants")) || [];

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };

  function showNotification(plantName, type) {
    if (!("Notification" in window)) return;
    let message = "";
    if (type === "overdue") {
      message = `🚨 Your plant "${plantName}" is overdue for watering!`;
    } else if (type === "dueToday") {
      message = `💧 Reminder: It's time to water "${plantName}" today!`;
    }
    if (Notification.permission === "granted") {
      new Notification("🌿 Smart Plant Reminder", {
        body: message,
        icon: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
      });
    }
  }

  function displayPlants() {
    plantList.innerHTML = "";
    const today = new Date().toISOString().split("T")[0];
    let dueCount = 0, overdueCount = 0;

    plants.forEach((plant, index) => {
      const lastWatered = new Date(plant.lastWatered);
      const nextDue = new Date(lastWatered);
      nextDue.setDate(lastWatered.getDate() + plant.interval);
      const nextDueStr = nextDue.toISOString().split("T")[0];

      let status = "✅ On Track";
      if (nextDueStr < today) {
        status = "⏰ Overdue";
        overdueCount++;
        showNotification(plant.name, "overdue");
        sendSNSReminder(plant, "overdue");
      } else if (nextDueStr === today) {
        status = "💧 Due Today";
        dueCount++;
        showNotification(plant.name, "dueToday");
        sendSNSReminder(plant, "dueToday");
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${plant.name}</td>
        <td>${plant.interval} days</td>
        <td>${formatDate(plant.lastWatered)}</td>
        <td>${formatDate(nextDue)}</td>
        <td>${status}</td>
        <td>${plant.email || "-"}</td>
        <td>${plant.phone || "-"}</td>
        <td>
          ${(status === "💧 Due Today" || status === "⏰ Overdue") ? 
            `<button class="watered-btn" onclick="markWatered(${index})">Watered Today</button>` : ""}
          <button class="delete-btn" onclick="deletePlant(${index})">🗑</button>
        </td>
      `;
      plantList.appendChild(row);
    });

    totalPlants.textContent = plants.length;
    dueToday.textContent = dueCount;
    overdue.textContent = overdueCount;
  }

  addPlantForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("plantName").value.trim();
    const interval = parseInt(document.getElementById("plantInterval").value);
    const email = document.getElementById("plantEmail").value.trim();
    const phone = document.getElementById("plantPhone").value.trim();
    const wateredToday = document.getElementById("plantWateredToday").value;
    const time = document.getElementById("plantTime").value;

    if (!name || !interval || !time) {
      alert("Please fill all required fields.");
      return;
    }

    const lastWatered = (wateredToday === "yes")
      ? new Date().toISOString().split("T")[0]
      : new Date(Date.now() - interval * 86400000).toISOString().split("T")[0];

    const newPlant = { name, interval, lastWatered, email, phone, time };
    plants.push(newPlant);
    localStorage.setItem("plants", JSON.stringify(plants));

    addPlantForm.reset();
    addPlantModal.close();
    displayPlants();
  });

  addPlantBtn.addEventListener("click", () => addPlantModal.showModal());
  cancelAdd.addEventListener("click", () => addPlantModal.close());

  displayPlants();
});

function markWatered(index) {
  let plants = JSON.parse(localStorage.getItem("plants")) || [];
  plants[index].lastWatered = new Date().toISOString().split("T")[0];
  localStorage.setItem("plants", JSON.stringify(plants));
  location.reload();
}

function deletePlant(index) {
  let plants = JSON.parse(localStorage.getItem("plants")) || [];
  if (confirm("Are you sure you want to delete this plant?")) {
    plants.splice(index, 1);
    localStorage.setItem("plants", JSON.stringify(plants));
    location.reload();
  }
}

async function sendSNSReminder(plant, type) {
  const message =
    type === "overdue"
      ? `⚠ Your plant "${plant.name}" is overdue for watering!`
      : `💧 Reminder: Your plant "${plant.name}" is due for watering today.`;
  try {
    await fetch("https://abc123.execute-api.ap-south-1.amazonaws.com/default/sendAlert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, email: plant.email, phone: plant.phone, time: plant.time }),
    });
  } catch (err) {
    console.error("❌ Failed to send SNS:", err);
  }
}