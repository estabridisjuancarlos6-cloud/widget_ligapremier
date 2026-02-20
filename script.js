const API_KEY = '3d4da372dd6dc7ae7cfb6f879efaa7c08de90436d9883da2ca03684b1f9f1ae5';
  const LEAGUE_ID = 152; // Premier League hombres

  async function cargarTabla() {
    try {

      const res = await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Standings&APIkey=${API_KEY}&leagueId=${LEAGUE_ID}`
      );

      const data = await res.json();

      if (!data.result || !data.result.total) {
        throw new Error('No se encontró información.');
      }

      // Top 6 como en tu código original
      const standings = data.result.total.slice(0, 6);

      const tbody = document.querySelector('#standingsTable tbody');
      tbody.innerHTML = '';

      standings.forEach(team => {

        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${team.standing_place}</td>
          <td class="team">
            <img src="${team.team_logo || ''}" alt="">
            ${team.standing_team}
          </td>
          <td>${team.standing_P}</td>
          <td>${team.standing_W}</td>
          <td>${team.standing_D}</td>
          <td>${team.standing_L}</td>
          <td>${team.standing_F || '-'}</td>
          <td>${team.standing_A || '-'}</td>
          <td>${team.standing_GD}</td>
          <td><b>${team.standing_PTS}</b></td>
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