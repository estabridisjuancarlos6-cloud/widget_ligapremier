    const API_KEY = '4774ef32f5a3b9a0872602de8498554e';
    const LEAGUE_ID = 39;
    const SEASON = 2023;

    async function cargarTabla() {
      try {
        const res = await fetch(`https://v3.football.api-sports.io/standings?league=${LEAGUE_ID}&season=${SEASON}`, {
          headers: { 'x-apisports-key': API_KEY }
        });
        const data = await res.json();
        if (!data.response || data.response.length === 0) throw new Error('No se encontró información.');

        const standings = data.response[0].league.standings[0].slice(0, 6);
        const tbody = document.querySelector('#standingsTable tbody');
        tbody.innerHTML = '';

        standings.forEach(team => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${team.rank}</td>
            <td class="team"><img src="${team.team.logo}" alt=""> ${team.team.name}</td>
            <td>${team.all.played}</td>
            <td>${team.all.win}</td>
            <td>${team.all.draw}</td>
            <td>${team.all.lose}</td>
            <td>${team.all.goals.for}</td>
            <td>${team.all.goals.against}</td>
            <td>${team.goalsDiff}</td>
            <td><b>${team.points}</b></td>
            <td><div class="last-results">${renderUltimos5(team.form)}</div></td>
          `;
          tbody.appendChild(tr);
        });
      } catch (error) {
        console.error(error);
        document.querySelector('#standingsTable tbody').innerHTML =
          `<tr><td colspan="11">Error al cargar datos</td></tr>`;
      }
    }

    function renderUltimos5(form) {
      if (!form) return '<span class="circle empty"></span>'.repeat(5);
      const formArray = form.slice(-5).split('');
      return formArray.map(r => {
        if (r === 'W') return '<span class="circle win"></span>';
        if (r === 'D') return '<span class="circle draw"></span>';
        if (r === 'L') return '<span class="circle lose"></span>';
        return '<span class="circle empty"></span>';
      }).join('');
    }

    cargarTabla();
