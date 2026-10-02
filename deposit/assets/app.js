(function(){
  const $ = s => document.querySelector(s);
  const money = n => '$' + (Math.round(n*100)/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  // shared
  document.querySelectorAll('.kit-link').forEach(a => a.href = window.KIT_URL);
  document.querySelectorAll('.kit-price').forEach(s => s.textContent = window.KIT_PRICE);
  document.querySelectorAll('.checked').forEach(s => s.textContent = window.LINKS_CHECKED);
  const gl = $('#general-links');
  if (gl) gl.innerHTML = window.GENERAL_LINKS.map(g => `<li><a href="${g.url}" rel="noopener" target="_blank">${g.label}</a></li>`).join('');

  // ---------- deadline calculator ----------
  const st = $('#state');
  if (st) {
    Object.entries(window.STATE_LINKS).forEach(([k,v]) => st.insertAdjacentHTML('beforeend', `<option value="${k}">${v.name}</option>`));
    st.addEventListener('change', () => {
      const v = window.STATE_LINKS[st.value], box = $('#state-links');
      if (!v) { box.style.display='none'; return; }
      let h = `<b>Official sources for ${v.name}</b><ul class="links">`;
      if (v.statute) h += `<li>Deposit statute: <a href="${v.statute.url}" target="_blank" rel="noopener">${v.statute.cite}</a> (state legislature site)</li>`;
      h += `<li><a href="${v.ag}" target="_blank" rel="noopener">${v.name} Attorney General</a>. Look for a landlord–tenant or renters' guide.</li>`;
      h += `<li><a href="${v.consumer}" target="_blank" rel="noopener">${v.name} consumer protection office</a></li>`;
      h += `<li>Statute text: search your state legislature's website for "security deposit".</li></ul>`;
      h += `<p class="note">Read the current text for: the number of days, calendar vs. business days, what starts the clock, how the statement must be delivered, and any city or county rules.</p>`;
      box.innerHTML = h; box.style.display='block';
    });
    const iso = d => d.toISOString().slice(0,10);
    const parse = s => { const [y,m,d] = s.split('-').map(Number); return new Date(Date.UTC(y,m-1,d)); };
    let due = null;
    function calc(){
      const s = $('#start').value, n = parseInt($('#days').value,10), type = $('#type').value, out = $('#dl-out');
      if (!s || !n || n < 1) { out.style.display='none'; $('#ics').style.display='none'; return; }
      const hol = new Set(($('#holidays').value||'').split(/[\s,;]+/).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)));
      let d = parse(s);
      if (type === 'calendar') d = new Date(d.getTime() + n*86400000);
      else { let c = 0; while (c < n) { d = new Date(d.getTime()+86400000); const w = d.getUTCDay(); if (w!==0 && w!==6 && !hol.has(iso(d))) c++; } }
      due = d;
      const today = new Date(); const t0 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const left = Math.round((d.getTime()-t0)/86400000);
      const nice = d.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric',timeZone:'UTC'});
      const wk = d.getUTCDay(); const wkNote = (wk===0||wk===6) ? '<p class="note">⚠ This lands on a weekend. Check whether your state extends the deadline, and plan to send it earlier.</p>' : '';
      out.innerHTML = `Statement &amp; refund due by<div class="big">${nice}</div>
        <p>${left>0 ? left+' days from today' : left===0 ? 'That is <b>today</b>.' : '<b>'+(-left)+' days ago.</b> Talk to a local attorney about your options.'}
        · ${n} ${type} days after ${parse(s).toLocaleDateString('en-US',{timeZone:'UTC'})}</p>${wkNote}
        <p class="note">Based only on the numbers you entered. Confirm against your statute.</p>`;
      out.style.display='block'; $('#ics').style.display='inline-block';
    }
    ['#start','#days','#type','#holidays'].forEach(s => $(s).addEventListener('input', calc));
    $('#ics').addEventListener('click', () => {
      if (!due) return;
      const f = d => iso(d).replace(/-/g,'');
      const rem = new Date(due.getTime() - 5*86400000), end = new Date(due.getTime()+86400000), stamp = new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
      const ev = (uid,d,title) => `BEGIN:VEVENT\r\nUID:${uid}-${f(d)}@move-out-kit\r\nDTSTAMP:${stamp}\r\nDTSTART;VALUE=DATE:${f(d)}\r\nDTEND;VALUE=DATE:${f(new Date(d.getTime()+86400000))}\r\nSUMMARY:${title}\r\nEND:VEVENT\r\n`;
      const ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Move-Out Kit Tools//EN\r\n' + ev('remind',rem,'Send deposit statement (due in 5 days)') + ev('due',due,'DEPOSIT STATEMENT & REFUND DUE') + 'END:VCALENDAR\r\n';
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics],{type:'text/calendar'})); a.download = 'deposit-deadline.ics'; a.click();
    });
  }

  // ---------- deduction calculator ----------
  const tb = $('#ded tbody');
  if (tb) {
    const row = (item='',cost='',life='',age='') => {
      tb.insertAdjacentHTML('beforeend', `<tr><td><input class="i" value="${item}" placeholder="e.g. Bedroom carpet burn"></td>
        <td><input class="c" type="number" min="0" step="0.01" value="${cost}"></td><td><input class="l" type="number" min="0" step="0.5" value="${life}" placeholder="optional"></td>
        <td><input class="a" type="number" min="0" step="0.5" value="${age}"></td><td class="out">$0.00</td><td><button class="btn secondary small rm" title="Remove">✕</button></td></tr>`);
      calc();
    };
    function calc(){
      let total = 0; const lines = [];
      tb.querySelectorAll('tr').forEach(tr => {
        const c = parseFloat(tr.querySelector('.c').value)||0, l = parseFloat(tr.querySelector('.l').value), a = parseFloat(tr.querySelector('.a').value)||0;
        const ch = (l>0) ? Math.max(0, c*(l-a)/l) : c;
        tr.querySelector('.out').textContent = money(ch); total += ch;
        const name = tr.querySelector('.i').value.trim(); if (c) lines.push(`${name||'Item'}: ${money(ch)}${l>0?` (prorated: ${money(c)} × ${Math.max(0,l-a)}/${l} yrs)`:''}`);
      });
      const dep = parseFloat($('#dep').value)||0, inte = parseFloat($('#int').value)||0;
      const refund = Math.max(0, dep+inte-total), owed = Math.max(0, total-dep-inte);
      $('#ded-out').innerHTML = `<div class="row"><div>Total deductions<div class="big">${money(total)}</div></div>
        <div>${owed>0 ? 'Tenant still owes' : 'Refund due to tenant'}<div class="big">${money(owed>0?owed:refund)}</div></div></div>
        <p class="note">Deposit ${money(dep)} + interest ${money(inte)} − deductions ${money(total)}.</p>`;
      $('#ded-out').dataset.summary = [...lines, `Total deductions: ${money(total)}`, `Deposit: ${money(dep)}  Interest: ${money(inte)}`, owed>0?`Balance owed by tenant: ${money(owed)}`:`Refund due: ${money(refund)}`].join('\n');
    }
    tb.addEventListener('input', calc); $('#dep').addEventListener('input', calc); $('#int').addEventListener('input', calc);
    tb.addEventListener('click', e => { if (e.target.classList.contains('rm')) { e.target.closest('tr').remove(); calc(); } });
    $('#add').addEventListener('click', () => row());
    $('#copy').addEventListener('click', () => { navigator.clipboard && navigator.clipboard.writeText($('#ded-out').dataset.summary||''); $('#copy').textContent='Copied ✓'; setTimeout(()=>$('#copy').textContent='Copy summary',1500); });
    row('Example: carpet (burn), 5 of 8 yrs used', 1200, 8, 5); row('Example: oven cleaning (receipt)', 85, '', ''); row();
  }
})();
