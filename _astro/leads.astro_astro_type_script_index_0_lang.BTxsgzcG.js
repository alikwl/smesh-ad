import{s as k,e as A}from"./supabase.CtD5h6j4.js";document.addEventListener("DOMContentLoaded",async()=>{const l=document.getElementById("tab-btn-leads"),r=document.getElementById("tab-btn-contacts"),x=document.getElementById("container-resource-leads"),g=document.getElementById("container-contact-submissions"),b=document.getElementById("leads-table-body"),m=document.getElementById("contacts-table-body"),a=document.getElementById("brief-modal"),v=document.getElementById("brief-modal-name"),y=document.getElementById("brief-modal-service"),f=document.getElementById("brief-modal-content"),E=document.getElementById("brief-modal-close"),h=document.getElementById("brief-modal-ok"),B=document.getElementById("export-csv-btn");let u=[],i=[],p="leads";l?.addEventListener("click",()=>{p="leads",l.classList.add("active","border-[#1D9E75]","text-[#1D9E75]"),l.classList.remove("border-transparent","text-slate-450"),r?.classList.remove("active","border-[#1D9E75]","text-[#1D9E75]"),r?.classList.add("border-transparent","text-slate-450"),x?.classList.remove("hidden"),g?.classList.add("hidden")}),r?.addEventListener("click",()=>{p="contacts",r.classList.add("active","border-[#1D9E75]","text-[#1D9E75]"),r.classList.remove("border-transparent","text-slate-450"),l?.classList.remove("active","border-[#1D9E75]","text-[#1D9E75]"),l?.classList.add("border-transparent","text-slate-450"),g?.classList.remove("hidden"),x?.classList.add("hidden")});const $=async()=>{if(!b||!m)return;const{data:o}=await k.from("resources").select("slug, title"),n={};(o||[]).forEach(t=>{n[t.slug]=t.title});const{leads:c,contacts:d}=await A();u=c||[],i=d||[],u.length===0?b.innerHTML=`
          <tr>
            <td colspan="3" class="px-6 py-12 text-center text-slate-400">No resource leads captured yet.</td>
          </tr>
        `:b.innerHTML=u.map(t=>{const e=t.unlocked_at?new Date(t.unlocked_at).toLocaleString():"N/A",s=n[t.slug]||t.slug;return`
            <tr class="hover:bg-slate-50/70 transition-colors">
              <td class="px-6 py-4 text-slate-900 font-bold select-text">${t.email}</td>
              <td class="px-6 py-4 text-slate-655 font-medium">${s}</td>
              <td class="px-6 py-4 text-right text-slate-450">${e}</td>
            </tr>
          `}).join(""),i.length===0?m.innerHTML=`
          <tr>
            <td colspan="6" class="px-6 py-12 text-center text-slate-400">No contact submissions captured yet.</td>
          </tr>
        `:m.innerHTML=i.map(t=>{const e=t.created_at?new Date(t.created_at).toLocaleString():"N/A",s=t.message||"",D=s.length>50?s.substring(0,47)+"...":s,I=s?`<button data-action="view-brief" data-name="${t.name||"Inquiry"}" data-service="${t.service||""}" class="text-[#1D9E75] hover:text-[#0F6E56] font-bold hover:underline transition cursor-pointer text-left">${D}</button>`:'<span class="text-slate-350 italic">None</span>';return`
            <tr class="hover:bg-slate-50/70 transition-colors">
              <td class="px-6 py-4 text-slate-900 font-bold select-text">${t.name||"Anonymous"}</td>
              <td class="px-6 py-4 text-slate-600 font-mono select-text">${t.whatsapp||"N/A"}</td>
              <td class="px-6 py-4 text-slate-655 font-semibold">${t.budget||"N/A"}</td>
              <td class="px-6 py-4 text-slate-500 font-medium">${t.service||"N/A"}</td>
              <td class="px-6 py-4">${I}</td>
              <td class="px-6 py-4 text-right text-slate-450">${e}</td>
            </tr>
          `}).join("")};m?.addEventListener("click",o=>{const n=o.target;if(n.getAttribute("data-action")==="view-brief"){const c=n.getAttribute("data-name")||"Inquiry",d=n.getAttribute("data-service")||"General",t=i.find(s=>s.name===c&&s.service===d),e=t?t.message:"Brief details missing.";a&&v&&y&&f&&(v.textContent=`Client Brief: ${c}`,y.textContent=`Service Category: ${d}`,f.textContent=e,a.classList.remove("hidden"),a.classList.add("flex"),setTimeout(()=>{a.classList.remove("opacity-0"),a.querySelector(".bg-white")?.classList.remove("scale-95")},10))}});const L=()=>{a&&(a.classList.add("opacity-0"),a.querySelector(".bg-white")?.classList.add("scale-95"),setTimeout(()=>{a.classList.remove("flex"),a.classList.add("hidden")},300))};E?.addEventListener("click",L),h?.addEventListener("click",L),B?.addEventListener("click",()=>{let o="",n="";p==="leads"?(o=`Email,Resource Slug,Unlocked At
`+u.map(e=>`"${e.email}","${e.slug}","${e.unlocked_at}"`).join(`
`),n="resource_leads_export.csv"):(o=`Name,WhatsApp,Budget,Service,Submitted At,Brief
`+i.map(e=>{const s=(e.message||"").replace(/"/g,'""');return`"${e.name||""}","${e.whatsapp||""}","${e.budget||""}","${e.service||""}","${e.created_at}","${s}"`}).join(`
`),n="contact_submissions_export.csv");const c=new Blob([o],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(c),t=document.createElement("a");t.setAttribute("href",d),t.setAttribute("download",n),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)}),await $()});
