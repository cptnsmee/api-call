
async function fetchLeaderboardData() {
  const url = 'https://api.chess.com/pub/leaderboards';
  
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      displayLeaderboards(data);
    } else if (response.status === 301) {
      console.warn("Redirecting to the new URL...");
    } else if (response.status === 404) {
      console.error("Data not found (404).");
    } else if (response.status === 429) {
      console.warn("Rate limit reached, please try again later.");
    } else {
      console.error("An error occurred:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}



function displayLeaderboards(data) {
  const container = document.getElementById("leaderboards");

  for (const category in data) {
    const leaderboard = data[category];
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4";

    const title = document.createElement("h2");
    title.className = "text-xl font-semibold mb-4 capitalize";
    title.textContent = category.replace(/_/g, " ");

    const table = document.createElement("table");
    table.className = "min-w-full bg-white";

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th class="py-2 px-4 border-b">Rank</th>
        <th class="py-2 px-4 border-b">Username</th>
        <th class="py-2 px-4 border-b">Score</th>
      </tr>
    `;


    table.appendChild(thead);


    const tbody = document.createElement("tbody");
    leaderboard.slice(0, 10).forEach(player => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4 border-b text-center">${player.rank}</td>
        <td class="py-2 px-4 border-b text-center">
          <a href="${player.url}" target="_blank" class="text-blue-600 hover:underline">${player.username}</a>
        </td>
        <td class="py-2 px-4 border-b text-center">${player.score}</td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    card.appendChild(title);
    card.appendChild(table);
    container.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", fetchLeaderboardData);
